import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpeechService {
  private defaultVoiceName = 'Google US English';
  private language = 'en-US';
  synth!: SpeechSynthesis;
  voices!: SpeechSynthesisVoice[];
  uttr!: SpeechSynthesisUtterance;
  ascenso = new Audio("/assets/media/ascenso.mp3");

  constructor() {
    this.ascenso.volume=1.0
    this.ascenso.load();
    this.synth = window.speechSynthesis;
  }

  playSound(): void {
    this.ascenso.onended = () => {
      return;
    };
    this.ascenso.play();
  } 

  speechText(text: string) {
    this.voices = this.synth.getVoices();
    this.uttr = new SpeechSynthesisUtterance();
    this.uttr.rate = 0.75;
    this.uttr.pitch = 0.9;
    this.uttr.volume = 1;
    this.uttr.lang = this.language;
    this.uttr.voice = this.voices
      .filter((voice) => voice.lang == this.language)
      .pop()!;
    this.uttr.text = text;
    this.synth.speak(this.uttr);
    console.log(this.uttr);
    this.waitUntil(() => !this.synth.speaking, 100)
    this.uttr.onend = () => {
      return;
    };
  }

  async waitUntil(check: () => boolean, intervalPeriodMs = 300): Promise<void> {
    if (check()) {
        return
    }
    return new Promise((resolve, reject) => {
        const wait = setInterval(() => {
            try {
                if (check()) {
                    clearInterval(wait)
                    resolve()
                }
            } catch (err) {
                clearInterval(wait)
                reject(err)
            }
        }, intervalPeriodMs)
    })
}

}
