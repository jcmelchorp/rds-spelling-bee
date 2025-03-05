import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { AuthService,Credential } from '../services/auth.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import * as fromAuthActions from '../../../store/actions/auth.actions';
import { AppState } from '../../../store/states/app.state';
import { Store } from '@ngrx/store';
interface LogInForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,MatSnackBarModule, MatIconModule, MatCardModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  hide = true;
  formBuilder = inject(FormBuilder);
  private _snackBar = inject(MatSnackBar);
  auth = inject(AuthService);
  errorMessage!: string | null;

  constructor(private store: Store<AppState>){}
  
  loginForm: FormGroup<LogInForm> = this.formBuilder.group({
    email: this.formBuilder.control('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: this.formBuilder.control('', {
      validators: Validators.required,
      nonNullable: true,
    }),
  });

  get isEmailValid(): string | boolean {
    const control = this.loginForm.get('email');

    const isInvalid = control?.invalid && control.touched;

    if (isInvalid) {
      return control.hasError('required')
        ? 'This field is required'
        : 'Enter a valid email';
    }

    return false;
  }

  loginByGoogle() {
    this.store.dispatch(fromAuthActions.signInByGoogle());
  }


  loginByEmail() {
    if (this.loginForm.invalid) return;
    const credential: Credential = {
      email: this.loginForm.value.email || '',
      password: this.loginForm.value.password || '',
    };

    try {
      this.store.dispatch(fromAuthActions.signInByEmail({credential}));
    } catch (error) {
      console.error(error);
    }
  }

  openSnackBar() {
    return this._snackBar.open('Succesfully Log in 😀', 'Close', {
      duration: 2500,
      verticalPosition: 'top',
      horizontalPosition: 'end',
    });
  }
}