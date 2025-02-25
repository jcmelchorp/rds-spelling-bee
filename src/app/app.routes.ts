import { Routes } from '@angular/router';
import { WordlistsComponent } from './features/contest/wordlists/wordlists.component';
import { NavigationComponent } from './core/layout/navigation/navigation.component';
import { HomeComponent } from './core/layout/home/home.component';
import { ContestComponent } from './features/contest/contest/contest.component';
import { animation } from '@angular/animations';
import { slideInUpOnEnterAnimation } from 'angular-animations';

export const routes: Routes = [
    {
        path: '',
        component: NavigationComponent,
        children: [
            { 
                path: '', component: HomeComponent 
            },
            { 
                path: 'editor', component: WordlistsComponent 
            },
            {
                path: 'contest', component: ContestComponent,
            }
        ]
        // loadComponent: () => import('./features/wordlists/wordlists.component'),
    },
    { path: '**', redirectTo: '/', pathMatch: 'full' }
];
