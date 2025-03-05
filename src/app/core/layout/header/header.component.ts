import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { map, Observable } from 'rxjs';
import { LayoutService } from '../../services/layout.service';
import { ThemeService } from '../../services/theme.service';
import { SubscriptionService } from '../../services/subscription.service';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { FlexLayoutModule } from 'ngx-flexible-layout';
import { MatExpansionModule } from '@angular/material/expansion';
import { User } from '../../auth/models/user.model';
import { AuthService } from '../../auth/services/auth.service';
import { AppState } from '../../../store/states/app.state';
import { Store } from '@ngrx/store';
import { signOut } from '../../../store/actions/auth.actions';
import { UserCardComponent } from '../../auth/user-card/user-card.component';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    AsyncPipe,
    MatMenuModule,
    MatIconModule,
    MatExpansionModule,
    MatToolbarModule,
    MatButtonModule,
    MatTooltipModule,
    FlexLayoutModule,
    UserCardComponent,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() isHandset!: boolean;
  @Input() user!: User;
  @Input() isOnline!: boolean;
  @Input() isAdmin!: boolean;
  private layoutService = inject(LayoutService);
  public themeService = inject(ThemeService);
  private subscriptionService = inject(SubscriptionService);
  private authservice = inject(AuthService);
  private _router = inject(Router);
  isDarkTheme$!: Observable<boolean>;
  public isDarkTheme!: boolean;
  hide: boolean = false;
  canLogout!: boolean;
  panelOpenState: boolean = false;
  constructor(private store: Store<AppState>) {
    this.isDarkTheme$ = this.themeService.isThemeDark.pipe(
      map((isDark: boolean) => (this.isDarkTheme = isDark))
    );
  }

  showModal: boolean = false;

  toggleModal() {
    this.showModal = !this.showModal;
  }

  toggleDarkTheme(isDarkTheme: boolean) {
    // console.log(isDarkTheme)
    this.themeService.toggleDarkTheme();
  }
  toggleSidenavLeft($event: any) {
    this.layoutService.toggleSidenavLeft.emit($event);
  }
  ngOnDestroy() {
    this.subscriptionService.unsubscribeComponent$;
  }

  onLogout(id: string) {
    // this.isDoorOpen = false;
    this.store.dispatch(signOut({ id }));
  }

  prepareForLogout(): void {
    this.canLogout = true;
  }

  isAuthenticated() {
    return this.authservice.isAuthenticated();
  }

  async logOut(): Promise<void> {
    try {
      await this.authservice.logOut();
      this._router.navigateByUrl('/login');
    } catch (error) {
      console.log(error);
    }
  }
}
