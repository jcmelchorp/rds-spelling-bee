import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-word',
  standalone:true,
  imports:[],
  templateUrl: './show-word.component.html',
  styleUrls: ['./show-word.component.scss']
})
export class ShowWordComponent implements OnInit {
@Input() word!: string;
  constructor() { }

  ngOnInit() {
  }

}
