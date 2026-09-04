import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
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
import { Collection } from '../../data/collection';
import { CollectionService } from '../../service/collection.service';

@Component({
  selector: 'app-create-collection-dialog',
  templateUrl: './create-collection-dialog.html',
  styleUrl: './create-collection-dialog.scss',
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
    MatButton,
    MatProgressSpinner
  ]
})
export class CreateCollectionDialog {
  private dialogRef = inject(MatDialogRef<CreateCollectionDialog>);
  private fb = inject(FormBuilder);
  private collectionService = inject(CollectionService);

  public form = this.fb.nonNullable.group({
    name: ['', Validators.required]
  });

  public isSaving = signal(false);
  public errorMessage = signal('');

  public submit(): void {
    if (this.form.invalid || this.isSaving()) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSaving.set(true);
    this.errorMessage.set('');

    this.collectionService.create(this.form.getRawValue().name).subscribe({
      next: (collection: Collection) => {
        this.isSaving.set(false);
        this.dialogRef.close(collection);
      },
      error: () => {
        this.isSaving.set(false);
        this.errorMessage.set('Die Sammlung konnte nicht erstellt werden. Bitte versuche es erneut.');
      }
    });
  }
}
