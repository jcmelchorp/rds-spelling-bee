import { Component, inject, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

  export interface ConfirmDialogData {
    title: string;
    content: string;
  }
  
  export type ConfirmDialogResult = boolean;
  
  @Component({
    selector: 'confirm-dialog',
    template: `<h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content>
      <p>{{ data.content }}</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false" cdkFocusInitial>No</button>
      <button mat-button [mat-dialog-close]="true">Yes</button>
    </mat-dialog-actions>
    `,
    standalone: true,
    imports: [
      MatButtonModule,
      MatDialogTitle,
      MatDialogContent,
      MatDialogActions,
      MatDialogClose,
    ],
  })
  export class ConfirmDialogComponent {
    readonly data = inject<ConfirmDialogData>(MAT_DIALOG_DATA);
  }