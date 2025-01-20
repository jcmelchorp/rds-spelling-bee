import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, Subject, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private _themeDark: BehaviorSubject<boolean>;
  public isThemeDark: Observable<boolean>;
  constructor() {
    this._themeDark = new BehaviorSubject(localStorage.getItem("dark") == 'true');
    this.isThemeDark = this._themeDark.asObservable();
    this.setDarkTheme(this._themeDark.value);
  }

  public toggleDarkTheme(): void {
    this.setDarkTheme(!this._themeDark.value);
  }

  setDarkTheme(isThemeDark: boolean) {

    this._themeDark.next(isThemeDark);

    if (isThemeDark == true) {
      console.log('Dark Used');
      document.body.className = 'dark-theme';
      localStorage.setItem('dark', 'true');
    }
    else {
     console.log('Light Used');
      document.body.className = 'light-theme';
      localStorage.setItem('dark', 'false');
    }

  }
}
