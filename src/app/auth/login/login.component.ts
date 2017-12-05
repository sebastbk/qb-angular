import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';

import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'qb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  message: string;

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.loginForm.disable();
    const credentials = this.loginForm.value;
    this.authService.login(credentials)
      .subscribe(() => {
        if (this.authService.isLoggedIn) {
          const navigationExtras: NavigationExtras = {
            queryParamsHandling: 'preserve',
            preserveFragment: true
          };
          this.authService.redirectFromLogin(navigationExtras);
        } else {
          this.message = 'Invalid username or login.';
          this.password.reset();
          this.loginForm.enable();
        }
      });
  }

}
