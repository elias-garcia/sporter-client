import { Component, Input } from '@angular/core';
import { GeolocationService } from '../../../core/services/geolocation.service';

@Component({
  selector: 'app-event-map',
  templateUrl: './event-map.component.html',
  styleUrls: ['./event-map.component.scss']
})
export class EventMapComponent {

  @Input() coordinates: [number, number];

  constructor() { }

}
