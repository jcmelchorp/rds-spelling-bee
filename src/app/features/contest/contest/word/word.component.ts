import { NgForOf } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-word',
  standalone:true,
  imports:[NgForOf],
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class WordComponent {
  @Input() word!: string;
  get wordArray(): string[] {
    return this.word.split('');
  }
}