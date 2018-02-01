import { Component, OnInit, Input, SimpleChanges, Inject, Output, EventEmitter } from '@angular/core';
import { EventResponse } from '../../../shared/models/event.model';
import { GeolocationService } from '../../../core/services/geolocation.service';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.scss']
})
export class EventInfoComponent implements OnInit {

  @Input() event: EventResponse;
  @Input() playersNumber: number;
  @Input() isSendingRequest: boolean;
  @Input() isJoinButtonDisabled: boolean;

  @Output() joinEvent = new EventEmitter<void>();

  public eventLocation: string;

  constructor(
    private geolocationService: GeolocationService
  ) { }

  ngOnInit(): void {
    this.reverseGeocode();
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
