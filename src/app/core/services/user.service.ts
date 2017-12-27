import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { LoginData } from '../../login/login-data.model';
import { RegisterData } from '../../register/register-data.model';
import * as moment from 'moment';

@Injectable()
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  logIn(payload: LoginData): Observable<Object> {
    return this.http.post(`${environment.apiUrl}/sessions`, payload);
  }

  register(payload: RegisterData): Observable<Object> {
    const payloadCopy = Object.assign({}, payload);

    payloadCopy.birthdate = moment(payload.birthdate, 'L').format('YYYY-MM-DD');

    return this.http.post(`${environment.apiUrl}/users`, payloadCopy);
  }

}
