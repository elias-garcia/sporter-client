import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SecurityService } from '../services/security.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private securityService: SecurityService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const session = this.securityService.getSessionSync();

    if (session) {
      const dupReq = req.clone({ setHeaders: { Authorization: `Bearer ${session.token}` } });

      return next.handle(dupReq);
    }

    return next.handle(req);
  }

}
