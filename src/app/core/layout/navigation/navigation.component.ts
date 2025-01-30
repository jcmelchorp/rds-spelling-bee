import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { ChildrenOutletContexts, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LayoutService } from '../../services/layout.service';
import { HeaderComponent } from "../header/header.component";
import { MatMenuModule } from '@angular/material/menu';
import { Menu } from '../../models/menu.model';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { Overlay } from '@angular/cdk/overlay';
import { FlexLayoutModule } from 'ngx-flexible-layout';
import { flyInOut } from '../../../shared/animations/router.animations';

@Component({
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    MatIconModule,
    MatProgressBarModule,
    AsyncPipe,
    HeaderComponent,
    SidenavComponent,
    NgClass,
    NgIf,
    FlexLayoutModule
  ],
  animations: [],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class NavigationComponent {
  private layoutService = inject(LayoutService);
  private router = inject(Router);
  isHandset$: Observable<boolean> = this.layoutService.isHandset$;
  isDarkTheme!: Observable<boolean>;
  loading = false;

  menu: Menu = [
    {
      title: 'Home',
      icon: 'home',
      link: '/home',
      color: '#ff7f0e',
    },
    {
      title: 'Statistics',
      icon: 'bar_chart',
      color: '#ff7f0e',
      subMenu: [
        {
          title: 'Sales',
          icon: 'money',
          link: '/sales',
          color: '#ff7f0e',
        },
        {
          title: 'Customers',
          icon: 'people',
          color: '#ff7f0e',
          link: '/customers',
        },
      ],
    },
  ];

  constructor() {
    this.router.events.subscribe(event => this.navigationInterceptor(event as RouterEvent));
    this.router.events.subscribe((event_2) =>
      this.navigationInterceptor(event_2 as RouterEvent)
    );
    this.isHandset$ = this.layoutService.isHandset$;
  }

  
  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
    switch (true) {
      case event instanceof NavigationStart: {
        this.loading = true;
        break;
      }
      case event instanceof NavigationEnd:
      case event instanceof NavigationCancel:
      case event instanceof NavigationError: {
        this.loading = false;
        break;
      }
      default: {
        break;
      }
    }
  }

}