import { Component, OnInit, Input } from '@angular/core';
import { EventResponse } from '../../../shared/models/event.model';
import { EventService } from '../../../core/services/event.service';
import { GeolocationService } from '../../../core/services/geolocation.service';
import { } from '@types/google-maps';

@Component({
  selector: 'app-event-list-item',
  templateUrl: './event-list-item.component.html',
  styleUrls: ['./event-list-item.component.scss']
})
export class EventListItemComponent implements OnInit {

  @Input() public event: EventResponse;

  public playersNumber: number;
  public eventLocation: string;

  constructor(
    private eventService: EventService,
    private geolocationService: GeolocationService
  ) { }

  ngOnInit() {
    this.eventService.getEventPlayers(this.event.id)
      .map((res: any) => res.data.players.length)
      .subscribe((playersNumber: number) => this.playersNumber = playersNumber);
    this.geolocationService.reverseGeocode(this.event.location[0], this.event.location[1])
      .subscribe((results: google.maps.GeocoderResult[]) => {
        if (results && results.length) {
          this.eventLocation = results[0].formatted_address;
        }
      });
  }

}
