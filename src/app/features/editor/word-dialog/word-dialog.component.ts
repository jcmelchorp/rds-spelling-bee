import { ChangeDetectionStrategy, Component, inject, Inject, model } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ShowWordComponent } from '../../presentation/show-word/show-word.component';

@Component({
  
  selector: 'app-word-dialog',
      standalone: true,
      imports: [ShowWordComponent,MatIconModule,MatDialogModule],
      templateUrl: './word-dialog.component.html',
  styleUrls: ['./word-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class WordDialogComponent {
  readonly dialogRef = inject(MatDialogRef<WordDialogComponent>);
  readonly data = inject<{input:string,output:string}>(MAT_DIALOG_DATA);
  readonly output = model(this.data.output);

  repeatWord() {
this.data.input = this.data.input;
  } 

  closeDialog() {
    this.dialogRef.close(this.output());
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }
}