import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-event-players',
  templateUrl: './event-players.component.html',
  styleUrls: ['./event-players.component.scss']
})
export class EventPlayersComponent implements OnInit {

  @Input() players: User[];
  @Input() maxPlayers: number;
  @Input() isSendingRequest: boolean;
  @Input() isJoinButtonDisabled: boolean;
  @Input() isLeaveButtonDisabled: boolean;
  @Input() isSameUserAsHost: boolean;

  @Output() joinEvent = new EventEmitter<void>();
  @Output() leaveEvent = new EventEmitter<void>();

  public maxSlots = [];

  constructor() { }

  ngOnInit() {
    this.maxSlots = Array(this.maxPlayers).map((val, i) => val = i + 1);
  }

  onJoinEvent() {
    this.joinEvent.emit();
  }

  onLeaveEvent() {
    this.leaveEvent.emit();
  }

}
