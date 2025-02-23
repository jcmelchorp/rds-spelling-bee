import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpeechService {
  synth!: SpeechSynthesis;
  voices!: SpeechSynthesisVoice[];
  uttr!: SpeechSynthesisUtterance;
  constructor() {
    this.synth = window.speechSynthesis;
    console.log(this.synth.speaking);
  }

  speechText(text: string) {
    this.voices = this.synth.getVoices();
    this.uttr = new SpeechSynthesisUtterance();
    this.uttr.rate = 0.75;
    this.uttr.pitch = 0.9;
    this.uttr.volume = 1;
    const lang = 'en-US';
    this.uttr.lang = lang;
    this.uttr.voice = this.voices.filter((voice) => voice.lang == lang).pop()!;
    this.uttr.text = text;
    console.log(this.uttr);
    this.synth.speak(this.uttr);
  }
}
