import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Params } from '@angular/router/src/shared';
import { EventService } from '../../core/services/event.service';
import { EventResponse } from '../../shared/models/event.model';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  public event: EventResponse;
  public eventPlayers: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.getEvent();
  }

  getEvent(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.eventService.getEvent(params.id).subscribe(
          (res: any) => {
            this.event = res.data.event;
          }
        );
        this.getEventPlayers(params.id);
      }
    );
  }

  getEventPlayers(eventId: string): void {
    this.eventService.getEventPlayers(eventId).subscribe(
      (res: any) => {
        this.eventPlayers = res.data.players;
      }
    );
  }

}
