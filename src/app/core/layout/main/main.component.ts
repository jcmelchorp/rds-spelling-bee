import { Component, Input, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-component',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  @Input()
  isOnline!: boolean;
  loadingText: string = 'Cargando...';
  constructor() {}

  ngOnInit(): void {}
}
