import { Component, OnChanges, Input, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { EventResponse } from '../../../shared/models/event.model';
import { GeolocationService } from '../../../core/services/geolocation.service';

@Component({
  selector: 'app-event-details-info',
  templateUrl: './event-details-info.component.html',
  styleUrls: ['./event-details-info.component.scss']
})
export class EventDetailsInfoComponent implements OnChanges {

  @Input() event: EventResponse;

  public eventLocation: string;

  constructor(
    private geolocationService: GeolocationService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.event.currentValue && !changes.event.previousValue) {
      this.reverseGeocode();
    }
  }

  reverseGeocode(): void {
    this.geolocationService.reverseGeocode(this.event.location[0], this.event.location[1]).subscribe(
      (results: google.maps.GeocoderResult[]) => {
        if (results && results.length) {
          this.eventLocation = results[0].formatted_address;
          this.cd.detectChanges();
        }
      }
    );
  }

}
