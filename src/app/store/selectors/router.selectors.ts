import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { routerKey } from '../router';
import { RouterStateUrl } from '../router/custom-serializer';

export const getRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>(routerKey);

export const getCurrentRoute = createSelector(
  getRouterState,
  (router) => router.state
);
export const getCurrentParams = createSelector(
  getRouterState,
  (router) => router.state.params
);
export const getCurrentQueryParams = createSelector(
  getRouterState,
  (router) => router.state.queryParams
);
