import { Injectable } from '@angular/core';

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
  isLoggedIn = true;
  isAdmin = true;
  username = 'Admin';

  redirectUrl: string;

  login(credentials: Credentials): Observable<boolean> {
    return Observable.of(true).delay(1000).do(() => {
      this.isLoggedIn = true;
      this.username = credentials.username;
    });
  }

  logout() {
    this.isLoggedIn = false;
  }
}
