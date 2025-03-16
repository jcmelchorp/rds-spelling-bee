import { AsyncPipe, NgIf, TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { map, mergeMap, Observable, Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { Store } from '@ngrx/store';
import { signOut } from 'firebase/auth';
import { selectUserId, isOnline, isAdmin, selectUser } from '../../../store/selectors/auth.selectors';
import { AppState } from '../../../store/states/app.state';
import { SubscriptionService } from '../../services/subscription.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-profile',
  standalone:true,
  imports:[TitleCasePipe, RouterLink,AsyncPipe, NgIf, MatCardModule,MatProgressSpinnerModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  user$!: Observable<User>;
  isOnline$!: Observable<boolean>;
  loading$!: Observable<boolean>;
  isAdmin$!: Observable<boolean>;
  isTeacher$!: Observable<boolean>;
  userSub!: Subscription;
  @Output() logout = new EventEmitter<User>();
  

  canLogout!: boolean;
  dayOfBirth!: Date;
  constructor(
    private store: Store<AppState>,
    private subService: SubscriptionService
  ) { }
  ngOnDestroy() {
    this.subService.unsubscribeComponent$;
  }
  ngOnInit(): void {
    this.user$ = this.store.select(selectUser);
    this.isOnline$ = this.store.select(isOnline);
    this.isAdmin$ = this.store.select(isAdmin);
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

}