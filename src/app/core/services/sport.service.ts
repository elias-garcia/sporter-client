import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SportService {

  constructor(
    private http: HttpClient
  ) { }

  getSports(): Observable<Object> {
    return this.http.get(`${environment.apiUrl}/sports`);
  }

}
