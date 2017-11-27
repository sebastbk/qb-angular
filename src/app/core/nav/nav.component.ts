import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@qb/auth/shared/auth.service';

@Component({
  selector: 'qb-nav',
  templateUrl: './nav.component.html',
})
export class NavComponent {

  get isLoggedIn() { return this.authService.isLoggedIn; }
  get username() { return this.authService.username; }

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.redirectUrl = this.router.url;
    this.router.navigate(['/login']);
  }

  logout() {
    this.authService.logout();
  }
}
