import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';


export class Credentials {
  username: string;
  password: string;
}

@Injectable()
export class AuthService {
  isLoggedIn = false;
  isAdmin = false;
  username: string;

  redirectUrl: string;

  constructor(private router: Router) { }

  login(credentials: Credentials): Observable<boolean> {
    return Observable.of(true).delay(1000).do(() => {
      this.isLoggedIn = true;
      this.username = credentials.username;
      // for testing
      this.isAdmin = this.username === 'admin';
    });
  }

  logout() {
    this.isLoggedIn = false;
    window.location.reload();
  }

  redirectToLogin(url: string, extras?: NavigationExtras) {
    this.redirectUrl = url;
    this.router.navigate(['/login'], extras);
  }

  redirectToForbidden() {
    this.router.navigate(['/forbidden']);
  }
}
