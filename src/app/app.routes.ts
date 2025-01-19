import { Routes } from '@angular/router';
import { WordlistsComponent } from './features/wordlists/wordlists.component';

export const routes: Routes = [
    {
        path: '',
        component:WordlistsComponent
       // loadComponent: () => import('./features/wordlists/wordlists.component'),
      }
];
