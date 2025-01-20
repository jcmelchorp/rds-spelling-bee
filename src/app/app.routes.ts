import { Routes } from '@angular/router';
import { WordlistsComponent } from './features/editor/wordlists/wordlists.component';
import { NavigationComponent } from './core/layout/navigation/navigation.component';
import { HomeComponent } from './core/layout/home/home.component';
import { PresentationComponent } from './features/contests/presentation/presentation.component';
import { WordListComponent } from './features/contests/word-list/word-list.component';

export const routes: Routes = [
    {
        path: '',
        component: NavigationComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'editor', component: WordlistsComponent },
            {
                path: 'contest', component: PresentationComponent,
                children: [
                    { path: ':id', component: WordListComponent },]
            }
        ]
        // loadComponent: () => import('./features/wordlists/wordlists.component'),
    },

];
