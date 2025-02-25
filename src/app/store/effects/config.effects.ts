import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from "@ngrx/effects";
import { from, of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import * as configActions from '../actions/config.actions';
import { ThemeService } from "../../core/services/theme.service";

@Injectable()
export class ConfigEffects {
  constructor(
    private actions$: Actions,
    private themeService: ThemeService,
    //private configService:ConfigService
  ) { }

  toggleDarkMode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(configActions.toggleDarkMode),
      switchMap((config) => of(this.themeService.setDarkTheme(config.isDark)).pipe(
        tap(isDark => console.log(`isDark: ${isDark}`)),
        switchMap(isDark => {
          return [
            configActions.toggleDarkModeSuccess({ isDark: isDark! }),
            configActions.saveDarkMode({ isDark: isDark!}),
          ];
        }),
        catchError((error) => of(configActions.toggleDarkModeFail({ error })))
      )
      )
    )
  );
  setDarkMode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(configActions.setDarkMode),
      switchMap((configs) => of(this.themeService.setDarkTheme(configs.isDark)).pipe(
        switchMap(_ => {
          if (configs.isDark) {
            return [
              configActions.setDarkModeSuccess({ isDark: configs.isDark }),
              configActions.saveDarkMode({ isDark: configs.isDark }),
            ];
          } else {
            return [
              configActions.toggleDarkModeFail({ error: "Error" }),
              configActions.removeDarkMode(),
            ];
          }
        }),
        catchError((error) => of(configActions.toggleDarkModeFail({ error })))
      )
      )
    )
  );
  saveDarkMode$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(configActions.saveDarkMode),
        tap((action) =>
          localStorage.setItem('cemac-config-is-dark', action.isDark.toString())
        )
      ),
    { dispatch: false }
  );
  removeDarkMode$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(configActions.removeDarkMode),
        tap(() =>
          localStorage.removeItem('cemac-config-is-dark')
        )
      ),
    { dispatch: false }
  );
}
