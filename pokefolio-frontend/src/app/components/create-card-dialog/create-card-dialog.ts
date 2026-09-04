import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSelect } from '@angular/material/select';
import { CardType } from '../../data/card-type';
import { Card } from '../../data/card';
import { CardService } from '../../service/card.service';

@Component({
  selector: 'app-create-card-dialog',
  templateUrl: './create-card-dialog.html',
  styleUrl: './create-card-dialog.scss',
  imports: [
    ReactiveFormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatFormField,
    MatLabel,
    MatError,
    MatInput,
    MatSelect,
    MatOption,
    MatButton,
    MatProgressSpinner
  ]
})
export class CreateCardDialog {
  private dialogRef = inject(MatDialogRef<CreateCardDialog>);
  private fb = inject(FormBuilder);
  private cardService = inject(CardService);

  public readonly cardTypes = Object.values(CardType);

  public form = this.fb.nonNullable.group({
    cardType: [CardType.POKEMON, Validators.required],
    name: ['', Validators.required],
    type: ['', Validators.required],
    hp: [60, [Validators.required, Validators.min(0)]],
    rarity: ['', Validators.required],
    setName: ['', Validators.required],
    cardNumber: ['', Validators.required],
    imageUrl: ['', Validators.required]
  });

  public isSaving = false;
  public errorMessage = '';

  public submit(): void {
    if (this.form.invalid || this.isSaving) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSaving = true;
    this.errorMessage = '';

    this.cardService.create(this.form.getRawValue()).subscribe({
      next: (card: Card) => {
        this.isSaving = false;
        this.dialogRef.close(card);
      },
      error: err => {
        this.isSaving = false;
        this.errorMessage =
          err?.status === 403
            ? 'Du hast keine Berechtigung, neue Karten-Templates zu erstellen.'
            : 'Das Karten-Template konnte nicht erstellt werden. Bitte versuche es erneut.';
      }
    });
  }
}
