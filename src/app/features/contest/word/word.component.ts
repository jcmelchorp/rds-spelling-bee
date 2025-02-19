import { NgForOf } from '@angular/common';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-word',
  standalone:true,
  imports:[NgForOf],
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class WordComponent implements OnInit {
  @Input() word!: string;
  uttr: SpeechSynthesisUtterance;

  get wordArray(): string[] {
    return this.word.split('');
  }
  constructor() {
    const voicesList:SpeechSynthesisVoice[] = speechSynthesis.getVoices()
    this.uttr = new SpeechSynthesisUtterance();
    let lang = 'en-US';
    this.uttr.rate=0.75;
    this.uttr.pitch=0.9;
    this.uttr.voice = voicesList.filter((voice) => voice.lang === lang).pop()!;
    this.uttr.lang = lang;
  }
  ngOnInit(): void {
    this.uttr.text = this.word;
    window.speechSynthesis.speak(this.uttr);
    }
}