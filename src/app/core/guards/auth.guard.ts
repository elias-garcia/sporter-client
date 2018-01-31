import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, NavigationExtras } from '@angular/router';
import { SecurityService } from '../services/security.service';
import { AlertService } from '../services/alert.service';
import { AlertType } from '../components/alert/alert.enum';

const AUTH_NEEDED_MESSAGE = 'Necesitas iniciar sesión para acceder a la página solicitada';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private securityService: SecurityService,
    private alertService: AlertService,
    private location: Location,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = this.securityService.getSessionSync();

    if (!user) {
      const navigationExtras: NavigationExtras = { queryParams: { redirectTo: state.url } };

      this.alertService.createAlert({ message: AUTH_NEEDED_MESSAGE, type: AlertType.Info });
      this.router.navigate(['login'], navigationExtras);

      return false;
    }

    return true;
  }

}
