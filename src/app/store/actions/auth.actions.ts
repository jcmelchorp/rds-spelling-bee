import { createAction, props } from '@ngrx/store';
import { User } from '../../core/auth/models/user.model';
import { Credential } from '../../core/auth/services/auth.service';

export const checkAdminRole = createAction(
  '[Auth Role] Check admin role',
  props<{ id: string }>()
);
export const checkTeacherRole = createAction(
  '[Auth Role] Check teacher role',
  props<{ id: string }>()
);
export const fillUser = createAction(
  '[Auth Effect] Merge user',
  props<{ id: string }>()
);
export const getUser = createAction('[Auth User] Get user');
export const notAuthenticated = createAction(
  '[Auth] Authentication Fail',
  props<{ error: any }>()
);
export const saveUser = createAction(
  '[Auth Firebase] Save user to firebase',
  props<{ user: User }>()
);
export const signInByEmail = createAction(
  '[AccountUser] Email`s sign-in request',
  props<{ credential: Credential }>()
);
export const signUpByEmail = createAction(
  '[AccountUser] Email`s sign-up request',
  props<{ credential: Credential }>()
);
export const signInByGoogle = createAction(
  '[AccountUser] Google`s sign-in request'
);
export const signUpByGoogle = createAction(
  '[AccountUser] Google`s sign-up request'
);
export const signInFail = createAction('[Auth SignIn] Google`s sign-in Fail');
export const signInSuccess = createAction(
  '[Auth SignIn] Google`s sign-in Success',
  props<{ user: User }>()
);
export const signOut = createAction(
  '[Auth SignOut] Google`s sign-out request',
  props<{ id: string }>()
);
export const signOutCompleted = createAction(
  '[Auth SignOut] Google`s sign-out completed'
);
export const updateAdminRole = createAction(
  '[Auth Role] Update admin role',
  props<{ isAdmin: boolean }>()
);
export const updateOnlineStatus = createAction(
  '[Auth Online] Update online status',
  props<{ id: string; isOnline: boolean }>()
);
export const updateProfile = createAction(
  '[Auth Component] Update profile',
  props<{ userData: User }>()
);
export const updateProfileSuccess = createAction(
  '[Auth Component] Update profile success',
  props<{ user: User }>()
);
export const updateTeachersRole = createAction(
  '[Auth Role] Update teacher role',
  props<{ isTeacher: boolean }>()
);
