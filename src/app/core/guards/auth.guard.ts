import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { SecurityService } from '../services/security.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private securityService: SecurityService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = this.securityService.getSessionSync();

    if (!user) {
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }

}
