import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-event-details-players',
  templateUrl: './event-details-players.component.html',
  styleUrls: ['./event-details-players.component.scss']
})
export class EventDetailsPlayersComponent {

  @Input() players: User[];
  @Input() isSendingRequest: boolean;
  @Input() isJoinButtonDisabled: boolean;

  @Output() joinEvent = new EventEmitter<void>();

  constructor() { }

  onJoinEvent() {
    this.joinEvent.emit();
  }

}
