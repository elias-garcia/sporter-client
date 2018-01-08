import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import { } from '@types/googlemaps';

const GOOGLE_API_URL = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';

@Injectable()
export class GeolocationService {

  private geocoder = new google.maps.Geocoder();

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

  geocodeAddress(address: string) {
    const response: Subject<google.maps.GeocoderResult[]>
      = new Subject<google.maps.GeocoderResult[]>();
    const request: google.maps.GeocoderRequest = {
      address,

    };

    this.geocoder.geocode(
      request,
      (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
        response.next(results);
      }
    );

    return response;
  }

}
