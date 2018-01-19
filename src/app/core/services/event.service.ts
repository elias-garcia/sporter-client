import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { EventData } from '../../events/event-data';

@Injectable()
export class EventService {

  constructor(
    private http: HttpClient
  ) { }

  createEvent(eventData: EventData): Observable<any> {
    return this.http.post(`${environment.apiUrl}/events/`, eventData);
  }

  getEvent(eventId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/events/${eventId}`);
  }

  getEventPlayers(eventId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/events/${eventId}/players`);
  }

  joinEvent(eventId: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/events/${eventId}/players`, {});
  }

}
