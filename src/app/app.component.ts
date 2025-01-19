import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WordlistsComponent } from './features/wordlists/wordlists.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,WordlistsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'rds-spelling-bee';
}
