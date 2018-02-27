import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Params } from '@angular/router/src/shared';
import { Location } from '@angular/common';
import { EventService } from '../../core/services/event.service';
import { EventResponse } from '../../shared/models/event.model';
import { UserService } from '../../core/services/user.service';
import { SecurityService } from '../../core/services/security.service';
import { Session } from '../../shared/models/session.model';
import { AlertService } from '../../core/services/alert.service';
import { AlertType } from '../../core/components/alert/alert.enum';
import { User } from '../../shared/models/user.model';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { EventStatus } from '../event-status.enum';

const NOT_VALID_ID_MESSAGE = 'El evento no existe en nuestro sistema';
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
  public isSameUserAsHost = false;
  public isJoinButtonDisabled = true;
  public session: Session;

  constructor(
    private activatedRoute: ActivatedRoute,
    private securityService: SecurityService,
    private eventService: EventService,
    private router: Router,
    private location: Location,
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
        ).subscribe(
          ([eventResponse, playersResponse]: [any, any]) => {
            this.event = eventResponse.data.event;
            this.eventPlayers = playersResponse.data.players;
            this.getUserSession();
          },
          (error: any) => {
            this.alertService.createAlert({ message: NOT_VALID_ID_MESSAGE, type: AlertType.Danger });
            this.location.back();
          }
        );
      }
    );
  }

  getUserSession(): void {
    this.securityService.getSessionAsync().subscribe(
      (session: Session) => {
        this.session = session;
        this.checkJoinButtonStatus();
        this.checkIfSameUserAsHost();
      }
    );
  }

  hasUserJoinedTheEvent() {
    if (this.session) {
      return this.eventPlayers.some((user: User) => user.id === this.session.userId);
    } else {
      return false;
    }
  }

  isEventFull() {
    return this.event.status !== EventStatus.WAITING;
  }

  isLoggedUserTheHost() {
    return this.session.userId === this.event.host.id;
  }

  checkIfSameUserAsHost() {
    if (this.isLoggedUserTheHost()) {
      this.isSameUserAsHost = true;
    }
  }

  checkJoinButtonStatus(): void {
    if (!this.hasUserJoinedTheEvent() && !this.isEventFull()) {
      this.isJoinButtonDisabled = false;
    }
  }

  onJoinEvent(): void {
    if (this.session) {
      this.isSendingRequest = true;
      this.eventService.joinEvent(this.event.id).subscribe(
        (res: any) => {
          this.isSendingRequest = false;
          this.isJoinButtonDisabled = true;
          this.eventPlayers.push(res.data.player);
          this.alertService.createAlert({ message: JOINED_SUCCESFULLY_MESSAGE, type: AlertType.Success });
        }
      );
    } else {
      this.router.navigate(['login']);
    }
  }

}
