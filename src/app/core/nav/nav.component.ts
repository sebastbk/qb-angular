import { Component, OnInit } from '@angular/core';

import { AuthService } from '@qb/auth/shared/auth.service';

@Component({
  selector: 'qb-nav',
  templateUrl: './nav.component.html',
})
export class NavComponent implements OnInit {

  get isLoggedIn() { return this.authService.isLoggedIn; }
  get username() { return this.authService.username; }

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }
}
