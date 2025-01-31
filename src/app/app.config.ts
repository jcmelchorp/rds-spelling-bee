import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { FlexLayoutModule } from 'ngx-flexible-layout';
import { NgxSpinnerModule } from "ngx-spinner";


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes,withViewTransitions()),
    importProvidersFrom([BrowserAnimationsModule,FlexLayoutModule]),
    provideAnimations(),
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp(environment.firebaseOptions)),
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseOptions },
    provideFirestore(() => getFirestore(getApp())),
    provideDatabase(() =>  getDatabase(getApp())),
    //provideAuth(() => getAuth()), 
    //provideAnalytics(() => getAnalytics()), 
    //ScreenTrackingService, UserTrackingService, 
  ]
};
