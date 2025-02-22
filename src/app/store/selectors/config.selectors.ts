import { createFeatureSelector, createSelector } from "@ngrx/store";
import { configFeatureKey, configReducer, ConfigState } from "../reducers/config.reducer";

export const selectConfigState =
  createFeatureSelector<ConfigState>(configFeatureKey);

export const isDarkMode = createSelector(
  selectConfigState,
  (config: ConfigState): boolean => config.isDark
);
