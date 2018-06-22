import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GeolocationService } from '../../../core/services/geolocation.service';
import { EventResponse } from '../../../shared/models/event.model';
import { EventStatus } from '../../event-status.enum';

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
  @Input() isLeaveButtonDisabled: boolean;
  @Input() isEditButtonDisabled: boolean;
  @Input() isDeleteButtonDisabled: boolean;
  @Input() isSameUserAsHost: boolean;

  @Output() joinEvent = new EventEmitter<void>();
  @Output() leaveEvent = new EventEmitter<void>();
  @Output() deleteEvent = new EventEmitter<void>();

  public eventStatus = EventStatus;
  public eventLocation: string;

  constructor(
    private geolocationService: GeolocationService
  ) { }

  ngOnInit(): void {
    this.reverseGeocode();
    console.log(this.isLeaveButtonDisabled);
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

  onLeaveEvent(): void {
    this.leaveEvent.emit();
  }

  onDeleteEvent(): void {
    this.deleteEvent.emit();
  }

}
