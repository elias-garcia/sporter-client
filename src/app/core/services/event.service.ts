import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { EventRequest } from '../../events/event-data';

@Injectable()
export class EventService {

  constructor(
    private http: HttpClient
  ) { }

  createEvent(eventData: EventRequest): Observable<any> {
    return this.http.post(`${environment.apiUrl}/events/`, eventData);
  }

}
