import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom([BrowserAnimationsModule]),
    provideRouter(routes), 
    importProvidersFrom(NgxSpinnerModule.forRoot(/*config*/)),
    provideAnimations(),
    provideFirebaseApp(() => initializeApp(environment.firebaseOptions)),
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseOptions }, provideAnimationsAsync(),
    //provideAuth(() => getAuth()), 
    //provideAnalytics(() => getAnalytics()), 
    //ScreenTrackingService, UserTrackingService, 
  ]
};
