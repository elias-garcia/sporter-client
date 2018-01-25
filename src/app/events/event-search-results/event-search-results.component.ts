import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { GeolocationService } from '../../core/services/geolocation.service';
import { EventQuery } from '../event-query';
import { } from '@types/googlemaps';
import { EventService } from '../../core/services/event.service';
import { EventStatus } from '../event-status.enum';
import { EventSearchData } from '../components/events-searcher/event-search-data';
import * as moment from 'moment';

@Component({
  selector: 'app-event-search-results',
  templateUrl: './event-search-results.component.html',
  styleUrls: ['./event-search-results.component.scss']
})
export class EventSearchResultsComponent implements OnInit {

  public eventSearchData: EventSearchData = {
    location: '',
    startDate: '',
    sportId: null
  };
  public eventQuery: EventQuery = {
    status: EventStatus.WAITING
  };
  public events: Event[] = [];

  constructor(
    private route: ActivatedRoute,
    private geolocationService: GeolocationService,
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(
      (params: ParamMap) => {
        this.updateEventSearchData(params.get('location'), params.get('startDate'), params.get('sportId'));
      }
    );
  }

  prepareEventQuery() {
    Object.keys(this.eventSearchData).map((key: string) => {
      const value: any = this.eventSearchData[key];
      if (key !== 'location' && value) {
        if (key === 'startDate') {
          this.eventQuery[key] = moment(value, 'L').format();
        } else {
          this.eventQuery[key] = value;
        }
      }
    });
  }

  getEvents() {
    this.prepareEventQuery();
    this.eventService.getEvents(this.eventQuery).subscribe(
      (res: any) => {
        this.events = res.data.events;
      }
    );
  }

  updateEventSearchData(location: string, startDate: string, sportId: string) {
    this.eventSearchData.location = location;
    this.eventSearchData.startDate = startDate;
    this.eventSearchData.sportId = sportId;
    this.geocodeAddress(location);
  }

  geocodeAddress(address: string) {
    this.geolocationService.geocodeAddress(address).subscribe(
      (results: google.maps.GeocoderResult[]) => {
        if (results && results.length) {
          this.eventQuery.location = [
            results[0].geometry.location.lat(),
            results[0].geometry.location.lng()
          ];
          this.getEvents();
        }
      }
    );
  }

  onFillSearchForm(searchData: EventSearchData) {
    this.updateEventSearchData(searchData.location, searchData.startDate, searchData.sportId);
  }

}
