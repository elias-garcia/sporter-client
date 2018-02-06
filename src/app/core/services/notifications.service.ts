import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Session } from '../../shared/models/session.model';
import { SecurityService } from './security.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Notification } from '../../shared/models/notification.model';
import * as io from 'socket.io-client';
import { } from '@types/socket.io-client';
import { Observable } from 'rxjs/Observable';
import { NotificationsResponse } from '../components/navbar/notifications-response.model';

@Injectable()
export class NotificationsService {

  private socket: SocketIOClient.Socket;
  private notifications = [];
  private unread = 0;
  private notificationsSubject: BehaviorSubject<NotificationsResponse>
    = new BehaviorSubject({ notifications: this.notifications, unread: this.unread });

  constructor(
    private securityService: SecurityService
  ) {
    this.securityService.getSessionAsync().subscribe(
      (session: Session) => {
        if (session) {
          this.socket = io(environment.webSocketsUrl, { query: `userId=${session.userId}` });

          this.socket.on('notifications', (notificationsResponse: NotificationsResponse) => {
            console.log(notificationsResponse);
            this.notifications = [...this.notifications, ...notificationsResponse.notifications];
            this.notificationsSubject.next(notificationsResponse);
          });
        }
      }
    );
  }

  disconnect(): void {
    this.socket.close();
  }

  getNotifications(): Observable<NotificationsResponse> {
    return this.notificationsSubject.asObservable();
  }

  queryNotifications(userId: string, skip: number): void {
    this.socket.emit('', { userId, skip });
  }

}
