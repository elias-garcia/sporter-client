import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../core/services/event.service';
import { ActivatedRoute, Params } from '@angular/router';
import { EventQuery } from '../../../events/event-query';
import { EventResponse } from '../../../shared/models/event.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-user-profile-events-history',
  templateUrl: './user-profile-events-history.component.html',
  styleUrls: ['./user-profile-events-history.component.scss']
})
export class UserProfileEventsHistoryComponent implements OnInit {

  public pageNumber = 1;
  public userId: string;
  public events: EventResponse[];
  public areMoreEvents = true;
  public isSendingRequest = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.isSendingRequest = true;
    this.activatedRoute.parent.params.subscribe(
      (params: Params) => {
        this.userId = params.id;
        this.getEvents();
      }
    );
  }

  getEvents() {
    if (this.areMoreEvents) {
      const eventQuery: EventQuery = {
        userId: this.userId,
        history: true,
        offset: this.pageNumber,
      };

      this.isSendingRequest = true;

      this.eventService.getEvents(eventQuery).subscribe(
        (res: any) => {
          this.isSendingRequest = false;

          if (!res.data.events.length) {
            this.areMoreEvents = false;
            this.events = [];
          } else {
            if (this.pageNumber === 1) {
              this.events = res.data.events;
            } else {
              this.events = [...this.events, ...res.data.events];
            }
          }

          if (res.data.events < environment.defaultPageSize) {
            this.areMoreEvents = false;
          }
        }
      );
    }
  }

  onScroll() {
    if (this.events && this.events.length) {
      this.pageNumber += 1;
      this.getEvents();
    }
  }

}
