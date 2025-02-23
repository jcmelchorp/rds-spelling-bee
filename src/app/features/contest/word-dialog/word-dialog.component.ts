import { Component, inject, model } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { WordComponent } from '../word/word.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SpeechService } from '../../../core/services/speech.service';

@Component({
  selector: 'app-word-dialog',
  standalone: true,
  imports: [
    WordComponent,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule,
  ],
  templateUrl: './word-dialog.component.html',
  styleUrls: ['./word-dialog.component.scss'],
})
export class WordDialogComponent {
  readonly dialogRef = inject(MatDialogRef<WordDialogComponent>);
  readonly _speech: SpeechService = inject(SpeechService);
  readonly data = inject<{ input: string; output: string }>(MAT_DIALOG_DATA);
  readonly output = model(this.data.output);
  animationState = false;
  animationWithState = false;
  hueBtnState = false;
  label!: string;
  id!: string;
  constructor() {
    // const voicesList: SpeechSynthesisVoice[] = speechSynthesis.getVoices();
    // this.uttr = new SpeechSynthesisUtterance();
    // let lang = 'en-US';
    // this.uttr.rate = 0.75;
    // this.uttr.pitch = 0.9;
    // this.uttr.voice = voicesList.filter((voice) => voice.lang === lang).pop()!;
    // this.uttr.lang = lang;

    this.label = this.data.input.split(',')[1];
    this.id = this.data.input.split(',')[0];
    console.log(this.id);
  }
  repeatWord() {
    this._speech.speechText(this.label);
  }

  useInSentence() {}
  defineWord() {}
}
