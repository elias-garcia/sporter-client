import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AlertService } from '../services/alert.service';
import { AlertType } from '../components/alert/alert.enum';
import { SecurityService } from '../services/security.service';
import { tap } from 'rxjs/operators/tap';

const NOT_FOUND_MESSAGE = 'La página solicitada no existe en nuestros servidores :(';
const UNAUTHORIZED_MESSAGE = 'Necesitas iniciar sesión para llevar a cabo la acción!';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private alertService: AlertService,
    private securityService: SecurityService,
    private router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(
        () => { },
        (error: any) => {
          if (error instanceof HttpErrorResponse) {
            switch (error.status) {
              case 401:
                this.handleUnauthorizedError();
                break;
              case 404:
                this.handleNotFoundError();
                break;
            }
          }
        }
      )
    );
  }

  handleUnauthorizedError() {
    this.securityService.removeSession();
    this.alertService.createAlert({ message: UNAUTHORIZED_MESSAGE, type: AlertType.Info });
    this.router.navigate(['login']);
  }

  handleNotFoundError() {
    this.alertService.createAlert({ message: NOT_FOUND_MESSAGE, type: AlertType.Danger });
    this.router.navigate(['']);
  }

}
