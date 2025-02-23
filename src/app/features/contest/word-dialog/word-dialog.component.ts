import {
  Component,
  inject,
  model,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { WordComponent } from '../word/word.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-word-dialog',
  standalone: true,
  imports: [WordComponent, MatIconModule, MatButtonModule, MatDialogModule,MatTooltipModule],
  templateUrl: './word-dialog.component.html',
  styleUrls: ['./word-dialog.component.scss'],
})
export class WordDialogComponent {
  readonly dialogRef = inject(MatDialogRef<WordDialogComponent>);
  readonly data = inject<{ input: string; output: string }>(MAT_DIALOG_DATA);
  readonly output = model(this.data.output);
  synth!: SpeechSynthesis;
  voices!: any[];
  uttr!: SpeechSynthesisUtterance;
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
    this.synth = window.speechSynthesis;
    this.label = this.data.input.split(',')[1];
    this.id = this.data.input.split(',')[0];
    console.log(this.id);
  }
  repeatWord() {
    this.uttr = new SpeechSynthesisUtterance();
    this.voices = this.synth.getVoices();
    this.uttr.rate = 0.75;
    this.uttr.pitch = 0.9;
    this.uttr.volume = 1;
    const lang = 'en-US';
    this.uttr.lang = lang;
    if (this.uttr.voice==null)this.uttr.voice = this.voices.find((voice) => voice.lang == lang)!;
    this.uttr.text = this.label;
    console.log(this.uttr);
    this.synth.speak(this.uttr);
  }

  useInSentence() {}
  defineWord() {}
}
