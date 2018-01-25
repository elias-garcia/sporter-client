import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-event-details-players',
  templateUrl: './event-details-players.component.html',
  styleUrls: ['./event-details-players.component.scss']
})
export class EventDetailsPlayersComponent implements OnInit {

  @Input() players: User[];
  @Input() maxPlayers: number;
  @Input() isSendingRequest: boolean;
  @Input() isJoinButtonDisabled: boolean;

  @Output() joinEvent = new EventEmitter<void>();

  private maxSlots = [];

  constructor() { }

  ngOnInit() {
    this.maxSlots = Array(this.maxPlayers).map((val, i) => val = i + 1);
  }

  onJoinEvent() {
    this.joinEvent.emit();
  }

}
