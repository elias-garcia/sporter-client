import { Component, Input } from '@angular/core';
import { GeolocationService } from '../../../core/services/geolocation.service';

@Component({
  selector: 'app-event-details-map',
  templateUrl: './event-details-map.component.html',
  styleUrls: ['./event-details-map.component.scss']
})
export class EventDetailsMapComponent {

  @Input() coordinates: [number, number];

  constructor() { }

}
