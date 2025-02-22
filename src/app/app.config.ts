import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
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
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideEntityData, withEffects } from '@ngrx/data';
import { provideRouterStore } from '@ngrx/router-store';
import { provideToastr } from 'ngx-toastr';
import * as fromEntity from './entity-metadata';
import * as fromRoot from './store/states/app.state';
import * as fromConfig  from './store/config/store-config';
import { registeredEffects } from './store/config/registered-effects';
import { provideHttpClient } from '@angular/common/http';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions()),
    importProvidersFrom([BrowserAnimationsModule, FlexLayoutModule]),
    provideAnimations(),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(environment.firebaseOptions)),
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseOptions },
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    //provideAuth(() => getAuth()), 
    //provideAnalytics(() => getAnalytics()), 
    //ScreenTrackingService, UserTrackingService, 
    provideStore(fromRoot.reducers, fromConfig.storeConfig),
    provideStoreDevtools({
    maxAge: 25, // Retains last 25 states
    logOnly: !isDevMode(), // Restrict extension to log-only mode
    autoPause: false, // Pauses recording actions and state changes when the extension window is not open
    trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
    traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    connectInZone: true // If set to true, the connection is established within the Angular zone
    }),
   provideEffects(registeredEffects),
    provideEntityData(fromEntity.entityConfig, withEffects()),
    provideRouterStore(),
    provideToastr({
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'decreasing',
        closeButton: true
    }),
]
};
