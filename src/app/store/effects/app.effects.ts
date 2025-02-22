import { Injectable } from '@angular/core';

import {
  Actions,
  createEffect,
  ofType,
  ROOT_EFFECTS_INIT,
} from '@ngrx/effects';

import { defer, from, Observable, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { loadApp, loadAppFail, loadAppSuccess } from '../actions/app.actions';

@Injectable()
export class AppEffects {
  loadApp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadApp, ROOT_EFFECTS_INIT),
      switchMap(() =>
        of().pipe(
          switchMap(() => of(loadAppSuccess()))
        )
      ),
      catchError((err) => of(loadAppFail(err)))
    )
  );
  /*  localStoreUser$ = createEffect(
     () =>
       this.actions$.pipe(
         ofType(localStoreUser),
         tap((action) =>
           localStorage.setItem('user', JSON.stringify(action.user))
         )
       ),
     { dispatch: false }
   );
   removeUser$ = createEffect(
     () =>
       this.actions$.pipe(
         ofType(signOutCompleted),
         tap(() =>
           localStorage.removeItem('user')
         )
       ),
     { dispatch: false }
   ); */
  /* init$: Observable<any> = createEffect(() =>
    defer(() => {
      return of(getUser());
    })
  ); */
  constructor(private actions$: Actions) { }
}
