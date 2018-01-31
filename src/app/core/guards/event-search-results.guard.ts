import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ParamMap, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AlertService } from '../../core/services/alert.service';
import { AlertType } from '../../core/components/alert/alert.enum';

const MISSING_PARAMS_ERROR = 'Los parámetros de búsqueda son incorrectos. Por favor, pruebe con otros.';

@Injectable()
export class EventSearchResultsGuard implements CanActivate {

  constructor(
    private alertService: AlertService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const params: ParamMap = route.queryParamMap;

    if (!(params.keys.includes('location') && params.keys.includes('startDate'))) {
      this.alertService.createAlert({ message: MISSING_PARAMS_ERROR, type: AlertType.Danger });
      this.router.navigate(['']);
      return false;
    }

    return true;
  }

}
