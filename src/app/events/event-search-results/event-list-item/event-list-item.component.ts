import { Component, OnInit, Input } from '@angular/core';
import { EventResponse } from '../../../shared/models/event.model';

@Component({
  selector: 'app-event-list-item',
  templateUrl: './event-list-item.component.html',
  styleUrls: ['./event-list-item.component.scss']
})
export class EventListItemComponent implements OnInit {

  @Input() public event: EventResponse;

  constructor() { }

  ngOnInit() {
  }

}
