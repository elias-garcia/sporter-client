import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { EventSearchData } from '../../shared/components/events-searcher/event-search-data.model';
import { GeolocationService } from '../../core/services/geolocation.service';
import { LocationCoordinates } from '../location-coordinates.model';
import { } from '@types/googlemaps';

@Component({
  selector: 'app-event-search-results',
  templateUrl: './event-search-results.component.html',
  styleUrls: ['./event-search-results.component.scss']
})
export class EventSearchResultsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private geolocationService: GeolocationService
  ) { }

  public searchData: EventSearchData = {
    location: '',
    startDate: '',
    sportId: ''
  };
  private coordinates: LocationCoordinates;

  ngOnInit() {
    this.route.queryParamMap.subscribe(
      (params: ParamMap) => {
        this.searchData.location = params.get('location');
        this.searchData.startDate = params.get('startDate');
        this.searchData.sportId = params.get('sportId');
        this.geocodeAddress(this.searchData.location);
      }
    );
  }

  onFillSearchForm(searchData: EventSearchData) {
    this.geocodeAddress(searchData.location);
  }

  geocodeAddress(address: string) {
    this.geolocationService.geocodeAddress(address).subscribe(
      (results: google.maps.GeocoderResult[]) => {
        if (results) {
          this.coordinates = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng()
          };
        }
      }
    );
  }

}
