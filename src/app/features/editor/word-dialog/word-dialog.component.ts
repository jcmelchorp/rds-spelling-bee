import { ChangeDetectionStrategy, Component, inject, Inject, model } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ShowWordComponent } from '../../presentation/show-word/show-word.component';
import { WordComponent } from '../../contest/word/word.component';

@Component({
  
  selector: 'app-word-dialog',
      standalone: true,
      imports: [WordComponent, MatIconModule, MatDialogModule, ShowWordComponent],
      templateUrl: './word-dialog.component.html',
  styleUrls: ['./word-dialog.component.scss'],

})
export class WordDialogComponent {
  readonly dialogRef = inject(MatDialogRef<WordDialogComponent>);
  readonly data = inject<{input:string,output:string}>(MAT_DIALOG_DATA);
  readonly output = model(this.data.output);
  uttr!: SpeechSynthesisUtterance;
  hueBtnState = false;

  constructor() {
this.uttr = new SpeechSynthesisUtterance()
    this.uttr.lang = 'en-US'
  }
  repeatWord() {
    this.uttr.text = this.data.input;
    window.speechSynthesis.speak(this.uttr);  } 

  useInSentence(){

  }
  defineWord() {}
  
}