import { createReducer, on } from '@ngrx/store';
import * as authActions from '../actions/auth.actions';
import { User } from '../../core/auth/models/user.model';

export const authFeatureKey = 'auth';
export interface AuthenticationState {
  user: User|null;
  isAdmin: boolean;
  isOnline: boolean;
  error: any;
}

export const initialState: AuthenticationState = {
  user: null,
  isAdmin: false,
  isOnline: false,
  error: null,
};

export const authReducer = createReducer<AuthenticationState>(
  initialState,
  on(authActions.signInSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
      isOnline: true,
    };
  }),
  on(authActions.signInFail, (state) => {
    return {
      ...state,
      user: null,
    };
  }),
  on(authActions.notAuthenticated, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(authActions.signOutCompleted, (state) => {
    return {
      ...state,
      user: null,
      isAdmin: false,
      isTeacher: false,
      isOnline: false,
    };
  }),
  on(authActions.updateAdminRole, (state, action) => {
    return {
      ...state,
      isAdmin: action.isAdmin,
    };
  }),
  on(authActions.updateTeachersRole, (state, action) => {
    return {
      ...state,
      isTeacher: action.isTeacher,
    };
  }),
  on(authActions.updateOnlineStatus, (state, action) => {
    return {
      ...state,
      isOnline: action.isOnline,
    };
  })
);
