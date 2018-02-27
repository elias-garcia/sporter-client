import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, NavigationExtras } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { environment } from '../../../environments/environment';
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

  private pageNumber = 1;
  private geocodedCoordinates: [number, number];
  public eventSearchData: EventSearchData = {};
  public events: EventResponse[];
  public areMoreEvents = true;
  public isLoadingPage = false;
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
      offset: this.pageNumber
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

  getEvents() {
    if (this.areMoreEvents) {
      const eventQuery = this.prepareEventQuery(this.geocodedCoordinates);

      this.isLoadingPage = true;

      this.eventService.getEvents(eventQuery).subscribe(
        (res: any) => {
          this.isSendingRequest = false;
          this.isLoadingPage = false;

          if (!res.data.events.length) {
            this.areMoreEvents = false;
          } else {
            if (this.pageNumber === 1) {
              this.events = res.data.events;
            } else {
              this.events = [...this.events, ...res.data.events];
            }
          }

          if (res.data.events < environment) {
            this.areMoreEvents = false;
          }
        }
      );
    }
  }

  handleInvalidLocationError() {
    this.isSendingRequest = false;
  }

  geocodeAddress(address: string) {
    this.geolocationService.geocodeAddress(address).subscribe(
      (results: google.maps.GeocoderResult[]) => {
        if (results && results.length) {
          this.geocodedCoordinates = [
            results[0].geometry.location.lat(),
            results[0].geometry.location.lng()
          ];
          this.getEvents();
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

  onScroll(event: Event) {
    this.pageNumber += 1;
    this.getEvents();
  }
}
