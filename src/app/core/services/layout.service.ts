import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { EventEmitter, HostListener, inject, Injectable, ViewChild } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';

import { Observable, Subject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  public breakpointObserver = inject(BreakpointObserver);
  @ViewChild('mat-toolbar') matToolbar!: MatToolbar;
  public toggleSidenavLeft: EventEmitter<any> = new EventEmitter();
  public sideNavState$: Subject<boolean> = new Subject();
  private _sideState: any = 'open';
  prevScrollpos;

  constructor(
  ) {
    this.prevScrollpos = window.pageYOffset;
    this.sideNavState$.subscribe(state => {
      this.setSidenavState(state);
    });

  }



  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  get sideNavState() {
    return this._sideState;
  }

  setSidenavState(state: any) {
    this._sideState = state;
  }

  
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const currentScrollPos = window.pageYOffset;
    if (this.prevScrollpos > 200) {
    } else {
    }
    this.prevScrollpos = currentScrollPos;
  }
}


 

 

 