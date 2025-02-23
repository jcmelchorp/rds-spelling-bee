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

  get wordArray(): string[] {
    return this.word.split('');
  }
  constructor() {
   
  }
  ngOnInit(): void {
   
    }
}