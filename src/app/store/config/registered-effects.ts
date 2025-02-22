import { DialogEffects } from '../effects/dialog.effects';
import { SnackEffects } from '../effects/snack.effects';
import { SpinnerEffects } from '../effects/spinner.effects';
import { RouteEffects } from '../router/route.effects';
import { AppEffects } from '../effects/app.effects';
import { ConfigEffects } from '../effects/config.effects';

export const registeredEffects = [
  AppEffects,
  ConfigEffects,
  DialogEffects,
  RouteEffects,
  SnackEffects,
  SpinnerEffects
];
export * from '../router/route.effects';
export * from '../effects/dialog.effects';
export * from '../effects/spinner.effects';
export * from '../effects/snack.effects';
export * from '../effects/app.effects';
export * from '../effects/config.effects';
