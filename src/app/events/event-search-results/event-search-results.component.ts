import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, NavigationExtras } from '@angular/router';
import { GeolocationService } from '../../core/services/geolocation.service';
import { EventQuery } from '../event-query';
import { EventService } from '../../core/services/event.service';
import { EventStatus } from '../event-status.enum';
import { EventSearchData } from './events-searcher/event-search-data';
import { EventResponse } from '../../shared/models/event.model';
import { } from '@types/googlemaps';
import * as moment from 'moment';

@Component({
  selector: 'app-event-search-results',
  templateUrl: './event-search-results.component.html',
  styleUrls: ['./event-search-results.component.scss']
})
export class EventSearchResultsComponent implements OnInit {

  public eventSearchData: EventSearchData = {};
  public events: EventResponse[];
  public isSendingRequest = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private geolocationService: GeolocationService,
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(
      (params: ParamMap) => {
        this.isSendingRequest = true;
        this.eventSearchData = {};
        params.keys.map(key => this.eventSearchData[key] = params.get(key));
        this.geocodeAddress(this.eventSearchData.location);
      }
    );
  }

  prepareEventQuery(coordinates: [number, number]): EventQuery {
    const eventQuery: EventQuery = {
      status: EventStatus.WAITING,
      location: coordinates,
    };

    Object.keys(this.eventSearchData)
      .filter(key => key !== 'location')
      .map(key => {
        if (key === 'startDate') {
          eventQuery[key] = moment(this.eventSearchData[key], 'L').set('hours', 12).format();
        } else {
          eventQuery[key] = this.eventSearchData[key];
        }
      });

    return eventQuery;
  }

  getEvents(coordinates: [number, number]) {
    const eventQuery = this.prepareEventQuery(coordinates);

    this.eventService.getEvents(eventQuery).subscribe(
      (res: any) => {
        console.log(res.data.events);
        this.events = res.data.events;
        this.isSendingRequest = false;
      }
    );
  }

  handleInvalidLocationError() {
    this.isSendingRequest = false;
    // this.location.setErrors({ invalidLocation: true });
  }

  geocodeAddress(address: string) {
    this.geolocationService.geocodeAddress(address).subscribe(
      (results: google.maps.GeocoderResult[]) => {
        if (results && results.length) {
          this.getEvents([
            results[0].geometry.location.lat(),
            results[0].geometry.location.lng()
          ]);
        } else {
          this.handleInvalidLocationError();
        }
      }
    );
  }

  onFillSearchForm(searchData: EventSearchData) {
    const queryParams: EventSearchData = {};

    Object.keys(searchData)
      .filter(key => searchData[key] !== 'null')
      .map(key => queryParams[key] = searchData[key]);

    const navigationExtras: NavigationExtras = { queryParams };

    this.router.navigate(['/events'], navigationExtras);
  }

}
