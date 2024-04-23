import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialog',
  template: `
    <h1 mat-dialog-title>Error</h1>
    <div mat-dialog-content>{{ errorMessage }}</div>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="true" cdkFocusInitial>Close</button>
    </div>
  `
})
export class ErrorDialogComponent {
  errorMessage: string;

  constructor(
    public dialogRef: MatDialogRef<ErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.errorMessage = data.message || 'An error occurred.';
  }
}
