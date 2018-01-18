import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-event-details-players',
  templateUrl: './event-details-players.component.html',
  styleUrls: ['./event-details-players.component.scss']
})
export class EventDetailsPlayersComponent implements OnInit {

  @Input() players: User[];

  constructor() { }

  ngOnInit() {
  }

}
