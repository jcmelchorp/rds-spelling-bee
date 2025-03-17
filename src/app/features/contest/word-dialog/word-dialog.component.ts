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
import { ShowWordComponent } from "../show-word/show-word.component";

@Component({
  selector: 'app-word-dialog',
  standalone: true,
  imports: [
    WordComponent,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule,
    ShowWordComponent
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
  example!: string;
  definition!: string;
  constructor() {
    this.example = this.data.input.split('|')[3];
    this.definition = this.data.input.split('|')[2];
    this.label = this.data.input.split('|')[1];
    this.id = Number(this.data.input.split('|')[0]).toLocaleString();
  }
  repeatWord() {
    this._speech.speechText("I'll repeat:  " + " number "+ this.id + "..." + this.label);
  }

  useInSentence() {
    this._speech.speechText("Example:  " + this.example);
  }
  defineWord() {
    this._speech.speechText("Definition:  " + this.definition);
  }
}
