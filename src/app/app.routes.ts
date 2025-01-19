import { Routes } from '@angular/router';
import { WordlistsComponent } from './features/editor/wordlists/wordlists.component';

export const routes: Routes = [
    {
        path: '',
        component:WordlistsComponent
       // loadComponent: () => import('./features/wordlists/wordlists.component'),
      }
];
