import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { SecurityService } from '../services/security.service';

@Injectable()
export class NotAuthGuard implements CanActivate {

  constructor(
    private securityService: SecurityService,
    private location: Location
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = this.securityService.getSessionSync();

    if (user) {
      this.location.back();

      return false;
    }

    return true;
  }

}
