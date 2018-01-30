import { Component, OnChanges, Input, SimpleChanges, Inject, Output, EventEmitter } from '@angular/core';
import { EventResponse } from '../../../shared/models/event.model';
import { GeolocationService } from '../../../core/services/geolocation.service';

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.scss']
})
export class EventInfoComponent implements OnChanges {

  @Input() event: EventResponse;
  @Input() isSendingRequest: boolean;
  @Input() isJoinButtonDisabled: boolean;

  @Output() joinEvent = new EventEmitter<void>();

  public eventLocation: string;

  constructor(
    private geolocationService: GeolocationService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.event.currentValue && !changes.event.previousValue) {
      this.reverseGeocode();
    }
  }

  reverseGeocode(): void {
    this.geolocationService.reverseGeocode(this.event.location[0], this.event.location[1]).subscribe(
      (results: google.maps.GeocoderResult[]) => {
        if (results && results.length) {
          this.eventLocation = results[0].formatted_address;
        }
      }
    );
  }

  onJoinEvent(): void {
    this.joinEvent.emit();
  }

}
