import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}
  loginForm: FormGroup;
  submitted: boolean = false;
  resetSubmitted: boolean = false;
  loading: boolean = false;
  currentUser: User;
  invalid = false;
  resetPasswordForm: FormGroup;
  resetPasswordValue: string;
  passwordResetComplete: boolean = false;

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('home');
    }

    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.resetPasswordForm = this.formBuilder.group({
      username: ['', Validators.required],
    });
  }

  resetPasswordSubmit() {
    this.resetSubmitted = true;
    this.authService
      .forgotPassword(this.resetPasswordForm.controls.username.value)
      .subscribe((data: any) => {
        if (
          (data.resetStatus !== undefined || data.resetStatus !== null) &&
          data.resetStatus == 'success'
        ) {
          this.resetPasswordValue = data.newPassword;
        }
        this.passwordResetComplete = true;
      });
  }

  showResetPasswordModal() {
    this.resetSubmitted = false;
    $('#resetPasswordModal').modal('show');
  }

  hideResetPasswordModal() {
    this.resetSubmitted = false;
    $('#resetPasswordModal').modal('hide');
  }

  getUsername() {
    return this.loginForm.get('userName').value;
  }

  getPassword() {
    return this.loginForm.get('password').value;
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    console.log('Submitted');
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authService
      .login(this.getUsername(), this.getPassword())
      .subscribe((data: any) => {
        if (data.loginStatus == 'success') {
          this.currentUser = data.user;
          console.log(this.currentUser);
          this.authService.setCurrentUser(this.currentUser);
          this.submitted = false;
          this.router.navigateByUrl('home');
        } else {
          this.invalid = true;
          this.loading = false;
        }
      });
  }
}
