import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { of, Observable, defer, from, switchMap, map, catchError, tap } from 'rxjs';
import * as authAction from '../actions/auth.actions';

import { Action, INIT } from '@ngrx/store';
import { Auth, authState, GoogleAuthProvider, signInWithPopup, User as FireUser } from '@angular/fire/auth';
import { AuthService } from '../../core/auth/services/auth.service';
import { User } from '../../core/auth/models/user.model';
@Injectable()
export class AuthEffects implements OnInitEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private auth: Auth
  ) { }
  ngrxOnInitEffects(): Action {
    return { type: authAction.getUser.type };
  }
  /*  init$: Observable<any> = defer(() => {
     return of(authAction.getUser());
   }); */
  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authAction.getUser),
      switchMap(() => authState(this.auth)
        .pipe(
          map((fireUser: FireUser|null)=> {
            if (fireUser) {
              return {
                id: fireUser.providerData[0].uid,
                primaryEmail: fireUser.email,
                photoUrl: fireUser.photoURL,
                authPhotoUrl: fireUser.providerData[0].photoURL,
                displayName: fireUser.displayName,
                isVerified: fireUser.emailVerified,
                creationTime: fireUser.metadata.creationTime,
                lastLoginTime: fireUser.metadata.lastSignInTime,
                uid: fireUser.uid,
              } as User;
            } else {
              return null
            }
          }),
          map((user) => {
            if (user != null) {
              return authAction.signInSuccess({ user });
            } else {
              return authAction.signInFail();
            }
          }),
          catchError((error) => of(authAction.notAuthenticated({ error })))
        )
      ),
      catchError((error) => of(authAction.notAuthenticated({ error })))
    )
  );

  signInByGoogle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authAction.signInByGoogle),
      switchMap(() =>
          this.authService.byGoogle().pipe(
          map((res: any) => {
            // console.log(res)
            return {
              id: res!.providerData[0].uid,
              primaryEmail: res!.email,
              photoUrl: res!.providerData[0].photoURL,
              authPhotoUrl: res!.photoURL,
              displayName: res!.displayName,
              isVerified: res!.emailVerified,
              creationTime: res!.metadata.creationTime,
              lastLoginTime: res!.metadata.lastSignInTime,
              uid: res!.uid,
            };
          }),
          switchMap((user:any) => {
            return [
              authAction.saveUser({ user }),
              authAction.signInSuccess({ user })
            ];
          }),
          catchError((error) => of(authAction.notAuthenticated({ error })))
        )
      )
    )
  );

  signInByEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authAction.signInByEmail),
      switchMap(c =>
          this.authService.login(c.credential).pipe(
          map((res: any) => {
            // console.log(res)
            return {
              id: res!.providerData[0].uid,
              primaryEmail: res!.email,
              photoUrl: res!.providerData[0].photoURL,
              authPhotoUrl: res!.photoURL,
              displayName: res!.displayName,
              isVerified: res!.emailVerified,
              creationTime: res!.metadata.creationTime,
              lastLoginTime: res!.metadata.lastSignInTime,
              uid: res!.uid,
            };
          }),
          switchMap((user:any) => {
            return [
              authAction.saveUser({user}),
              authAction.signInSuccess({ user })
            ];
          }),
          catchError((error) => of(authAction.notAuthenticated({ error })))
        )
      )
    )
  );

  signUpByEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authAction.signUpByEmail),
      switchMap(c =>
          this.authService.signup(c.credential.email,c.credential.password).pipe(
          map((res: any) => {
            // console.log(res)
            return {
              id: res!.providerData[0].uid,
              primaryEmail: res!.email,
              photoUrl: res!.providerData[0].photoURL,
              authPhotoUrl: res!.photoURL,
              displayName: res!.displayName,
              isVerified: res!.emailVerified,
              creationTime: res!.metadata.creationTime,
              lastLoginTime: res!.metadata.lastSignInTime,
              uid: res!.uid,
            };
          }),
          switchMap((user:any) => {
            return [
              authAction.saveUser({ user }),
              authAction.signInSuccess({ user })
            ];
          }),
          catchError((error) => of(authAction.notAuthenticated({ error })))
        )
      )
    )
  );
  signInSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authAction.signInSuccess),
      switchMap((user) => {
        return [
          authAction.updateOnlineStatus({
            id: user.user.uid!,
            isOnline: true,
          }),
          authAction.checkAdminRole({ id: user.user.uid! }),
        ];
      })
    )
  );

  saveUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authAction.saveUser),
        tap((action) => this.authService.saveUser(action.user))
      ),
    { dispatch: false }
  );

  checkAdminRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authAction.checkAdminRole),
      switchMap((action) =>
        this.authService
          .checkAdminRole(action.id)
          .pipe(
            switchMap((isAdmin) => [authAction.updateAdminRole({ isAdmin })])
          )
      )
    )
  );

 
  signOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authAction.signOut),
      switchMap((action) =>
        of(this.authService.logOut(action.id)).pipe(
          map(() => {
            return authAction.signOutCompleted();
          }),
          catchError((err) => of(authAction.notAuthenticated({ error: err })))
        )
      )
    )
  );


  updateOnlineStatus$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authAction.updateOnlineStatus),
        switchMap((action) =>
          this.authService.updateOnlineStatus(action.id, action.isOnline)
        )
      ),
    { dispatch: false }
  );
}
