import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService, Credential } from '../services/auth.service';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/states/app.state';
import * as fromAuthActions from '../../../store/actions/auth.actions';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  hide = true;
  formBuilder = inject(FormBuilder);
  private _service = inject(AuthService);
  router = inject(Router);
  errorMessage!: string | null;

  constructor(private store: Store<AppState>) {}
  registerForm = this.formBuilder.group({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  byGoogle(): void {
    this._service.byGoogle();
    //.then(() => /* some logic here */ )
    //.catch(() => /* some logic here */ );
  }

  submit(): void {
    if (this.registerForm.invalid) return;
    const credential: Credential = {
      email: this.registerForm.value.email || '',
      password: this.registerForm.value.password || '',
    };

    try {
      this.store.dispatch(fromAuthActions.signUpByEmail({ credential }));
    } catch (error) {
      console.error(error);
    }
  }
}
