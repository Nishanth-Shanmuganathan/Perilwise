import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from "rxjs";

import { AuthService } from './auth.service';

@Injectable()
export class logginGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const isAuth = this.authService.token ? true : false;
    if (!isAuth) {
      this.router.navigate(['/auth']);
    } else {
      this.authService.getToken();
      this.authService.loggedIn.next([this.authService.token, this.authService.admin]);
      this.router.navigate(['/']);
    }
    return isAuth;
  }

}
