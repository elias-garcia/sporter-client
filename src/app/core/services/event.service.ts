import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { EventData } from '../../events/event-data';
import { EventQuery } from '../../events/event-query';
import { CustomQueryEncoder } from '../../shared/encoders/custom-query.encoder';
import * as moment from 'moment';

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

  updateEvent(eventId: string, eventData: EventData): Observable<any> {
    return this.http.put(`${environment.apiUrl}/events/${eventId}`, eventData);
  }

  getEventPlayers(eventId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/events/${eventId}/players`);
  }

  getEvents(eventQuery: EventQuery): Observable<any> {
    let params: HttpParams = new HttpParams({ encoder: new CustomQueryEncoder() });

    Object.keys(eventQuery).map(key => {
      params = params.set(key, eventQuery[key]);
    });

    params = params.set('limit', environment.defaultPageSize);

    return this.http.get(`${environment.apiUrl}/events`, { params });
  }

  joinEvent(eventId: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/events/${eventId}/players`, {});
  }

  getMessages(eventId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/events/${eventId}/messages`);
  }

}
