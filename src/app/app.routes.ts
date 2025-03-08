import { Routes } from '@angular/router';
import { WordlistsComponent } from './features/contest/wordlists/wordlists.component';
import { NavigationComponent } from './core/layout/navigation/navigation.component';
import { HomeComponent } from './core/layout/home/home.component';
import { ContestComponent } from './features/contest/contest/contest.component';
import { animation } from '@angular/animations';
import { slideInUpOnEnterAnimation } from 'angular-animations';
import { LoginComponent } from './core/auth/login/login.component';
import { authGuard, publicGuard } from './core/auth/guards/auth.guard';
import { RegisterComponent } from './core/auth/register/register.component';
import { TermsComponent } from './core/auth/terms/terms.component';
import { PrivacyPolicyComponent } from './core/auth/privacy-policy/privacy-policy.component';
import { LandingComponent } from './core/layout/landing/landing.component';

export const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    children: [
      {
        path: '',
        component: LandingComponent,
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'terms',
        component: TermsComponent,
      },
      {
        path: 'policy',
        component: PrivacyPolicyComponent,
      },
      {
        path: 'editor',
        canActivate: [authGuard],
        component: WordlistsComponent,
      },
      {
        path: 'login',
        canActivate: [publicGuard],
        component: LoginComponent,
      },
      {
        path: 'register',
        canActivate: [publicGuard],
        component: RegisterComponent,
      },
      {
        path: 'contest',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/contest/contest/contest.component').then(
            (m) => m.ContestComponent
          ),
      },
    ],
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];
