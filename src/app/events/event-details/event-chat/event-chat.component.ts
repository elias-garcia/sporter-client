import { Component, OnInit, HostListener, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { EventResponse } from '../../../shared/models/event.model';
import { ChatService } from '../../../core/services/chat.service';
import { Session } from '../../../shared/models/session.model';
import { EventService } from '../../../core/services/event.service';
import { Message } from '../../../shared/models/message.model';
import { NotificationsService } from '../../../core/services/notifications.service';
import { NotificationsResponse } from '../../../core/components/navbar/notifications-response.model';
import { NotificationType } from '../../../core/components/navbar/notification-type.enum';
import { Notification } from '../../../shared/models/notification.model';

@Component({
  selector: 'app-event-chat',
  templateUrl: './event-chat.component.html',
  styleUrls: ['./event-chat.component.scss']
})
export class EventChatComponent implements OnInit {

  @Input() event: EventResponse;
  @Input() session: Session;

  @ViewChild('chatBody') chatBody: ElementRef;
  @ViewChild('chatWrapper') chatWrapper: ElementRef;

  public isChatVisible = false;
  public messageForm: FormGroup;
  public messages: Message[];
  public hasUnreadNotifications = false;
  public notifications: Notification[];

  constructor(
    private fb: FormBuilder,
    private chatService: ChatService,
    private eventService: EventService,
    private notificationService: NotificationsService
  ) { }

  ngOnInit() {
    this.createForm();
    this.listenToMessages();
    this.getNotifications();
  }

  createForm() {
    this.messageForm = this.fb.group({
      message: ['']
    });
  }

  listenToMessages() {
    this.chatService.getMessages().subscribe(
      (messages: Message[]) => {
        this.messages = messages;
        setTimeout(() => {
          this.chatBody.nativeElement.scrollTop = this.chatBody.nativeElement.scrollHeight;
        }, 10);
      }
    );
  }

  checkNewMessageNotification() {
    this.notifications.map((notification: Notification) => {
      if (notification.type === NotificationType.NEW_MESSAGE && !notification.read && this.isChatVisible) {
        this.notificationService.readNotification(notification.id);
      }
    });
  }

  getNotifications() {
    this.notificationService.getNotifications().subscribe(
      (notificationsResponse: NotificationsResponse) => {
        this.notifications = notificationsResponse.notifications;
        this.checkNewMessageNotification();
        this.hasUnreadNotifications = notificationsResponse.notifications.some((notification) => {
          return notification.type === NotificationType.NEW_MESSAGE && !notification.read && !this.isChatVisible;
        });
      }
    );
  }

  onSendMessage() {
    this.chatService.sendMessage(this.session.userId, this.event.id, this.message.value);
    this.message.reset();
  }

  onToggleChat() {
    this.isChatVisible = !this.isChatVisible;
    if (this.isChatVisible) {
      this.checkNewMessageNotification();
      setTimeout(() => {
        this.chatBody.nativeElement.scrollIntoView(true);
        this.chatBody.nativeElement.scrollTop = this.chatBody.nativeElement.scrollHeight;
      }, 10);
    }
  }

  get message(): AbstractControl {
    return this.messageForm.get('message');
  }

}
