import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Params } from '@angular/router/src/shared';
import { EventService } from '../../core/services/event.service';
import { EventResponse } from '../../shared/models/event.model';
import { UserService } from '../../core/services/user.service';
import { SecurityService } from '../../core/services/security.service';
import { Session } from '../../shared/models/session.model';
import { AlertService } from '../../core/services/alert.service';
import { AlertType } from '../../core/components/alert/alert.enum';
import { User } from '../../shared/models/user.model';
import { forkJoin } from 'rxjs/observable/forkJoin';

const JOINED_SUCCESFULLY_MESSAGE = 'Te has unido con éxito al evento!';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  public event: EventResponse;
  public eventPlayers: User[];
  public isSendingRequest = false;
  public isJoinButtonDisabled = true;
  public session: Session;

  constructor(
    private activatedRoute: ActivatedRoute,
    private securityService: SecurityService,
    private eventService: EventService,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getEvent();
  }

  getEvent(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        forkJoin(
          this.eventService.getEvent(params.id),
          this.eventService.getEventPlayers(params.id)
        ).subscribe(([eventResponse, playersResponse]: [any, any]) => {
          this.event = eventResponse.data.event;
          this.eventPlayers = playersResponse.data.players;
          this.getUserSession();
        });
      }
    );
  }

  getUserSession() {
    this.securityService.getSessionAsync().subscribe(
      (session: Session) => {
        this.session = session;
        this.checkJoinButtonStatus();
      }
    );
  }

  checkJoinButtonStatus(): void {
    if (!this.session || !this.eventPlayers.map((user: User) => user.id).includes(this.session.userId)) {
      this.isJoinButtonDisabled = false;
    }
  }

  onJoinEvent(): void {
    this.isSendingRequest = true;
    if (!this.session) {
      this.router.navigate(['login']);
    } else {
      this.eventService.joinEvent(this.event.id).subscribe(
        (res: any) => {
          console.log(res);
          this.isJoinButtonDisabled = true;
          this.alertService.createAlert({ message: JOINED_SUCCESFULLY_MESSAGE, type: AlertType.Success });
        }
      );
    }
  }

}
