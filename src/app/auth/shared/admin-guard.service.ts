import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Route, Router
} from '@angular/router';

import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';

@Injectable()
export class AdminGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkAdmin();
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {
    return this.checkAdmin();
  }

  checkAdmin(): boolean {
    if (this.authService.isAdmin) { return true; }
    this.authService.redirectToForbidden();
    return false;
  }

}
