import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as fromAuthActions from '../actions/auth.actions';

import { tap } from 'rxjs/operators';

@Injectable()
export class DialogEffects {
  hideDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          fromAuthActions.signInByGoogle,fromAuthActions.signInByEmail
        ),
        tap(() => this.dialog.closeAll())
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private dialog: MatDialog) { }
}
