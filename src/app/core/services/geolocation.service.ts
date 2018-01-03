import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';

const GOOGLE_API_URL = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';

@Injectable()
export class GeolocationService {

  constructor() { }

  getCurrentLocation(): Subject<Position> {
    const location: Subject<Position> = new Subject<Position>();

    navigator.geolocation.getCurrentPosition(
      (position: Position) => {
        location.next(position);
      },
      (err: PositionError) => {
        location.error(err);
      },
      { enableHighAccuracy: true, maximumAge: 0 }
    );

    return location;
  }

}
