import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Params } from '@angular/router/src/shared';
import { EventService } from '../../core/services/event.service';
import { EventResponse } from '../../shared/models/event.model';
import { UserService } from '../../core/services/user.service';
import { SecurityService } from '../../core/services/security.service';
import { Session } from '../../shared/models/session.model';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  public event: EventResponse;
  public eventPlayers: any;
  public isSendingRequest = false;
  public isJoinButtonDisabled = true;
  public session: Session;

  constructor(
    private activatedRoute: ActivatedRoute,
    private securityService: SecurityService,
    private eventService: EventService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getEvent();
    this.getUserSession();
  }

  getEvent(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.eventService.getEvent(params.id).subscribe(
          (res: any) => {
            this.event = res.data.event;
            this.checkButtonStatus();
          }
        );
        this.getEventPlayers(params.id);
      }
    );
  }

  getUserSession() {
    this.securityService.getSessionAsync().subscribe(
      (session: Session) => {
        this.session = session;
      }
    );
  }

  checkButtonStatus(): void {
    if (!this.session || (this.session && this.session.userId !== this.event.host.id)) {
      this.isJoinButtonDisabled = false;
    }
  }

  getEventPlayers(eventId: string): void {
    this.eventService.getEventPlayers(eventId).subscribe(
      (res: any) => {
        this.eventPlayers = res.data.players;
      }
    );
  }

  onJoinEvent(): void {
    this.isSendingRequest = true;
    if (!this.session) {
      this.router.navigate(['login']);
    } else {
      this.eventService.joinEvent(this.event.id).subscribe(
        (res: any) => {
          console.log(res);
        }
      );
    }
  }

}
