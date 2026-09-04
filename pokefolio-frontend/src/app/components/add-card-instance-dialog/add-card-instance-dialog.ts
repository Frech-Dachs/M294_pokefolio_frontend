import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSelect } from '@angular/material/select';
import { Card } from '../../data/card';
import { CardInstance } from '../../data/card-instance';
import { CardService } from '../../service/card.service';
import { CardInstanceService } from '../../service/card-instance.service';

export interface AddCardInstanceDialogData {
  collectionId: number;
}

@Component({
  selector: 'app-add-card-instance-dialog',
  templateUrl: './add-card-instance-dialog.html',
  styleUrl: './add-card-instance-dialog.scss',
  imports: [
    ReactiveFormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatFormField,
    MatLabel,
    MatInput,
    MatSelect,
    MatOption,
    MatButton,
    MatProgressSpinner
  ]
})
export class AddCardInstanceDialog implements OnInit {
  private dialogRef = inject(MatDialogRef<AddCardInstanceDialog>);
  private data = inject<AddCardInstanceDialogData>(MAT_DIALOG_DATA);
  private fb = inject(FormBuilder);
  private cardService = inject(CardService);
  private cardInstanceService = inject(CardInstanceService);

  public templates: Card[] = [];
  public isLoadingTemplates = true;

  public form = this.fb.nonNullable.group({
    cardId: [0, Validators.required],
    condition: [''],
    quantity: [1, [Validators.required, Validators.min(1)]]
  });

  public isSaving = false;
  public errorMessage = '';

  ngOnInit(): void {
    this.cardService.getAll().subscribe({
      next: cards => {
        this.templates = cards;
        this.isLoadingTemplates = false;
        if (cards.length) {
          this.form.controls.cardId.setValue(cards[0].id);
        }
      },
      error: () => {
        this.isLoadingTemplates = false;
        this.errorMessage = 'Die Karten-Templates konnten nicht geladen werden.';
      }
    });
  }

  public submit(): void {
    if (this.form.invalid || this.isSaving) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSaving = true;
    this.errorMessage = '';

    const { cardId, condition, quantity } = this.form.getRawValue();

    this.cardInstanceService
      .addToCollection(this.data.collectionId, cardId, {
        condition: condition || undefined,
        quantity
      })
      .subscribe({
        next: (instance: CardInstance) => {
          this.isSaving = false;
          this.dialogRef.close(instance);
        },
        error: err => {
          this.isSaving = false;
          this.errorMessage =
            err?.status === 403
              ? 'Das ist nicht deine Sammlung.'
              : 'Die Karte konnte nicht hinzugefügt werden. Bitte versuche es erneut.';
        }
      });
  }
}
