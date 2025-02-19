import { ChangeDetectionStrategy, Component, inject, Inject, model } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ShowWordComponent } from '../../presentation/show-word/show-word.component';
import { WordComponent } from '../../contest/word/word.component';
import { hueRotateAnimation } from 'angular-animations';

@Component({
  
  selector: 'app-word-dialog',
      standalone: true,
      imports: [WordComponent, MatIconModule, MatDialogModule, ShowWordComponent],
      animations:[ hueRotateAnimation({ anchor: 'hueButton', duration: 20000 })
      ],
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
    const voicesList:SpeechSynthesisVoice[] = speechSynthesis.getVoices()
    this.uttr = new SpeechSynthesisUtterance();
    let lang = 'en-US';
    this.uttr.rate=0.75;
    this.uttr.pitch=0.9;
    this.uttr.voice = voicesList.filter((voice) => voice.lang === lang).pop()!;
    this.uttr.lang = lang;
  }
  repeatWord() {
    this.uttr.text = this.data.input;
    window.speechSynthesis.speak(this.uttr);  } 

  useInSentence(){

  }
  defineWord() {}
  
}