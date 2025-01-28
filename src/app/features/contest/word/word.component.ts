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
    this.uttr = new SpeechSynthesisUtterance()
    this.uttr.lang = 'en-US'

  }
  ngOnInit(): void {
    this.uttr.rate=0.75;
    this.uttr.pitch=0.9;
    this.uttr.text = this.word;
    window.speechSynthesis.speak(this.uttr);
    }
}