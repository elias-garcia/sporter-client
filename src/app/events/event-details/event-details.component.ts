import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Params } from '@angular/router/src/shared';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { AlertType } from '../../core/components/alert/alert.enum';
import { AlertService } from '../../core/services/alert.service';
import { ChatService } from '../../core/services/chat.service';
import { EventService } from '../../core/services/event.service';
import { SecurityService } from '../../core/services/security.service';
import { EventResponse } from '../../shared/models/event.model';
import { Session } from '../../shared/models/session.model';
import { User } from '../../shared/models/user.model';
import { EventStatus } from '../event-status.enum';

const NOT_VALID_ID_MESSAGE = 'El evento no existe en nuestro sistema';
const JOINED_SUCCESFULLY_MESSAGE = 'Te has unido con éxito al evento!';
const JOIN_ERROR = 'No es posible unirse al evento en este momento';
const LEFT_SUCCESFULLY_MESSAGE = 'Te has dado de baja del evento con éxito';
const LEFT_ERROR = 'No es posible darse de baja del evento en este momento';
const DELETE_ERROR = 'No es posible eliminar el evento en este momento';
const DELETED_SUCCESSFULLY = 'El evento se ha eliminado con éxito';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit, OnDestroy {

  public event: EventResponse;
  public eventPlayers: User[];
  public isSendingRequest = false;
  public isSameUserAsHost = false;
  public isJoinButtonDisabled = true;
  public isLeaveButtonDisabled = true;
  public isEditButtonDisabled = true;
  public isDeleteButtonDisabled = true;
  public session: Session;

  constructor(
    private activatedRoute: ActivatedRoute,
    private securityService: SecurityService,
    private eventService: EventService,
    private router: Router,
    private location: Location,
    private alertService: AlertService,
    private chatService: ChatService
  ) { }

  ngOnInit() {
    this.getEvent();
  }

  ngOnDestroy() {
    this.chatService.disconnect();
  }

  getEvent(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.chatService.connect(params.id);
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
        this.checkButtonStatuses();
      }
    );
  }

  checkButtonStatuses() {
    this.checkJoinButtonStatus();
    this.checkLeaveButtonStatus();
    this.checkIfSameUserAsHost();
    this.checkEditButtonStatus();
    this.checkDeleteButtonStatus();
  }

  hasUserJoinedTheEvent() {
    if (this.session) {
      return this.eventPlayers.some((user: User) => user.id === this.session.userId);
    } else {
      return false;
    }
  }

  isEventWaiting() {
    return this.event.status === EventStatus.WAITING;
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

  checkLeaveButtonStatus(): void {
    if (this.hasUserJoinedTheEvent() && (this.isEventWaiting || this.isEventFull)) {
      this.isLeaveButtonDisabled = false;
    }
  }

  isTheLoggedUserAPlayer() {
    return this.session && this.eventPlayers.some(player => player.id === this.session.userId);
  }

  isTheLoggedUserTheOnlyPlayer() {
    return this.eventPlayers.length === 1 && this.eventPlayers[0].id === this.session.userId;
  }

  checkEditButtonStatus() {
    if (this.isEventWaiting() && this.isTheLoggedUserTheOnlyPlayer()) {
      this.isEditButtonDisabled = false;
    }
  }

  checkDeleteButtonStatus() {
    if (this.isEventWaiting() && this.isTheLoggedUserTheOnlyPlayer()) {
      this.isDeleteButtonDisabled = false;
    }
  }

  onJoinEvent(): void {
    if (this.session) {
      this.isSendingRequest = true;
      this.eventService.joinEvent(this.event.id).subscribe(
        (res: any) => {
          this.isSendingRequest = false;
          this.isJoinButtonDisabled = true;
          this.isLeaveButtonDisabled = false;
          this.getEvent();
          this.alertService.createAlert({ message: JOINED_SUCCESFULLY_MESSAGE, type: AlertType.Success });
        },
        (err: HttpErrorResponse) => {
          this.isSendingRequest = false;
          this.getEvent();
          this.alertService.createAlert({ message: JOIN_ERROR, type: AlertType.Danger });
        }
      );
    } else {
      this.router.navigate(['login']);
    }
  }

  onLeaveEvent(): void {
    if (this.session) {
      this.isSendingRequest = true;
      this.eventService.leaveEvent(this.event.id, this.session.userId).subscribe(
        (res: any) => {
          this.isSendingRequest = false;
          this.isJoinButtonDisabled = false;
          this.isLeaveButtonDisabled = true;
          this.getEvent();
          this.alertService.createAlert({ message: LEFT_SUCCESFULLY_MESSAGE, type: AlertType.Success });
        },
        (err: HttpErrorResponse) => {
          this.isSendingRequest = false;
          this.getEvent();
          this.alertService.createAlert({ message: LEFT_ERROR, type: AlertType.Danger });
        }
      );
    } else {
      this.router.navigate(['login']);
    }
  }

  onDeleteEvent(): void {
    this.isSendingRequest = true;
    this.eventService.deleteEvent(this.event.id).subscribe(
      (res: any) => {
        this.isSendingRequest = false;
        this.getEvent();
        this.isEditButtonDisabled = true;
        this.isDeleteButtonDisabled = true;
        this.alertService.createAlert({ message: DELETED_SUCCESSFULLY, type: AlertType.Success });
      },
      (err: HttpErrorResponse) => {
        this.isSendingRequest = false;
        this.alertService.createAlert({ message: DELETE_ERROR, type: AlertType.Danger });
      }
    );
  }

}
