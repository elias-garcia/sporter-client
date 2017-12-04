import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  logIn(email: string, password: string): Observable<Object> {
    return this.http.post(`${environment.apiUrl}/sessions`, { email, password });
  }

}
