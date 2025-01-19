import { Routes } from '@angular/router';
import { WordlistsComponent } from './features/editor/wordlists/wordlists.component';
import { NavigationComponent } from './core/layout/navigation/navigation.component';
import { HomeComponent } from './core/layout/home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: NavigationComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'editor', component: WordlistsComponent }
        ]
        // loadComponent: () => import('./features/wordlists/wordlists.component'),
    },

];
