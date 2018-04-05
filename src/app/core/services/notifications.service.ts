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
  private notifications$ = new BehaviorSubject({ notifications: this.notifications, unread: this.unread });
  private areMoreNotifications$ = new BehaviorSubject(true);
  private notificationsPage = 1;

  constructor(
    private securityService: SecurityService
  ) {
    this.securityService.getSessionAsync().subscribe(
      (session: Session) => {
        if (session) {
          this.socket = io(`${environment.webSocketsUrl}/notifications`, { query: `userId=${session.userId}` });
          this.listenOnNewNotifications();
          this.listenOnNotifications();
        }
      }
    );
  }

  listenOnNewNotifications() {
    this.socket.on('new-notifications', (notificationsResponse: NotificationsResponse) => {
      if (notificationsResponse.notifications.length < 5) {
        this.areMoreNotifications$.next(false);
      }
      this.notifications = notificationsResponse.notifications;
      this.unread = notificationsResponse.unread;
      this.notifications$.next({ notifications: this.notifications, unread: this.unread });
    });
  }

  listenOnNotifications() {
    this.socket.on('notifications', (notificationsResponse: NotificationsResponse) => {
      if (!notificationsResponse.notifications.length || notificationsResponse.notifications.length < 5) {
        this.areMoreNotifications$.next(false);
      }
      this.notifications = [...this.notifications, ...notificationsResponse.notifications];
      this.unread = notificationsResponse.unread;
      this.notifications$.next({ notifications: this.notifications, unread: this.unread });
    });
  }

  disconnect(): void {
    this.socket.close();
  }

  getNotifications(): Observable<NotificationsResponse> {
    return this.notifications$.asObservable();
  }

  queryNotifications(userId: string, skip?: number) {
    let page: number;

    if (skip) {
      page = skip;
    } else {
      this.notificationsPage++;
      page = this.notificationsPage;
    }

    this.socket.emit('query-notifications', { userId, skip: page });
  }

  readNotification(notificationId: string) {
    this.notifications.map(notification => {
      if (notification.id === notificationId) {
        notification.read = true;
        this.unread = this.unread - 1;
      }
    });
    this.socket.emit('read-notification', notificationId);
    this.notifications$.next({ notifications: this.notifications, unread: this.unread });
  }

  getAreMoreNotifications(): Observable<boolean> {
    return this.areMoreNotifications$.asObservable();
  }

}
