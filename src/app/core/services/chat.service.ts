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
import { Message } from '../../shared/models/message.model';
import { EventService } from './event.service';

@Injectable()
export class ChatService {

  private socket: SocketIOClient.Socket;
  private messages: Message[] = [];
  private messages$ = new BehaviorSubject<Message[]>(this.messages);

  constructor(
    private securityService: SecurityService,
    private eventService: EventService
  ) { }

  connect(eventId: string) {
    this.socket = io(`${environment.webSocketsUrl}/chat`, { query: `eventId=${eventId}` });
    this.getInitialMessages(eventId);
    this.listenOnNewMessages();
  }

  getInitialMessages(eventId: string) {
    this.eventService.getMessages(eventId).subscribe(
      (res: any) => {
        this.messages = res.data.messages;
        this.messages$.next(this.messages);
      }
    );
  }

  listenOnNewMessages() {
    this.socket.on('message', (message: Message) => {
      this.messages.push(message);
      this.messages$.next(this.messages);
    });
  }

  getMessages(): Observable<Message[]> {
    return this.messages$.asObservable();
  }

  sendMessage(userId: string, eventId: string, message: string) {
    this.socket.emit('new-message', { userId, eventId, message });
  }

  disconnect(): void {
    this.socket.close();
  }

}
