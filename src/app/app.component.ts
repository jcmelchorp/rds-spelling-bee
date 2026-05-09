import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PWAService } from './core/services/pwa.service';
import { AsyncPipe, NgClass } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from './store/states/app.state';
import { Observable } from 'rxjs';
import * as configSelectors from './store/selectors/config.selectors';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule, ReactiveFormsModule,    NgxSpinnerModule,    NgClass,    AsyncPipe,
  
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Spelling Bee RDS 2026';
  isDarkTheme!: Observable<boolean>;
  constructor(private pwa: PWAService, private store: Store<AppState> ) { }
  ngOnInit(): void {
        this.isDarkTheme = this.store.select(configSelectors.isDarkMode);
    this.pwa.titleInit();
    this.pwa.generateTags({
      title: this.title,
      description:
        'RDS Spelling Bee es una aplicación web diseñada como una plataforma de gestión para los concursos de Spelling Bee organizados por la Escuela Rafael Díaz Serdán. La aplicación permite a los administradores gestionar participantes, palabras y resultados, mientras que los usuarios pueden practicar y participar en los concursos de manera interactiva.',
      image: 'screenshot01.png',
    });
  }
}
