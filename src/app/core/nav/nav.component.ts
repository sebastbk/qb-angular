import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { AuthService } from '@qb/auth/shared/auth.service';

@Component({
  selector: 'qb-nav',
  templateUrl: './nav.component.html',
})
export class NavComponent implements OnInit {
  show = false;

  get isLoggedIn() { return this.authService.isLoggedIn; }
  get username() { return this.authService.username; }

  constructor(private authService: AuthService, private router: Router) { }

  toggleShow() {
    this.show = !this.show;
  }

  login() {
    this.authService.redirectToLogin(this.router.url);
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit() {
    // hide the expanded nav when you navigate.
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.show = false;
      }
    });
  }
}
