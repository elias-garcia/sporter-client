import { Component, OnInit, Input } from '@angular/core';
import { EventResponse } from '../../../shared/models/event.model';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  @Input() public events: EventResponse[];

  constructor() { }

  ngOnInit() {
  }

}
