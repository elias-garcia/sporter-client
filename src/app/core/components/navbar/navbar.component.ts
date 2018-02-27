import { Component, OnInit, ElementRef } from '@angular/core';
import { HostListener } from '@angular/core';
import { SecurityService } from '../../services/security.service';
import { Session } from '../../../shared/models/session.model';
import { DropdownType } from '../../../shared/components/dropdown/dropdown-type.enum';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { AlertType } from '../alert/alert.enum';
import { NotificationsService } from '../../services/notifications.service';
import { Notification } from '../../../shared/models/notification.model';
import { NotificationsResponse } from './notifications-response.model';

const LOGOUT_MESSAGE = 'Gracias por tu visita, hasta la próxima!';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public DropdownType = DropdownType;
  public isCollapsed = true;
  public showUserDropdown = false;
  public showNotificationsDropdown = false;
  public session: Session = undefined;
  public notifications: Notification[] = [];
  public unreadNotifications = 0;

  constructor(
    private securityService: SecurityService,
    private notificationsService: NotificationsService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
    this.securityService.getSessionAsync().subscribe(
      (session: Session) => {
        this.session = session;
      });
    this.notificationsService.getNotifications().subscribe(
      (notificationsResponse: NotificationsResponse) => {
        this.notifications = notificationsResponse.notifications;
        this.unreadNotifications = notificationsResponse.unread;
      });
  }

  onViewProfile() {
    this.router.navigate(['users', this.session.userId]);
    this.showUserDropdown = false;
  }

  onEditInfo() {
    this.router.navigate(['users', 'me', 'edit', 'profile']);
    this.showUserDropdown = false;
  }

  onLogout() {
    this.alertService.createAlert({ message: LOGOUT_MESSAGE, type: AlertType.Success });
    this.securityService.removeSession();
    this.notificationsService.disconnect();
    this.router.navigate(['']);
    this.showUserDropdown = false;
  }

  onChangeNavbarStatus() {
    this.isCollapsed = !this.isCollapsed;
  }

  @HostListener('window:resize', ['$event.target'])
  handleWindowResize(window) {
    if (!this.isCollapsed) {
      if (window.innerWidth >= 992) {
        this.isCollapsed = true;
      }
    }
  }

  onToggleUserDropdown() {
    this.showUserDropdown = !this.showUserDropdown;
  }

  onCloseUserDropdown() {
    this.showUserDropdown = false;
  }

  onToggleNotificationsDropdown() {
    this.showNotificationsDropdown = !this.showNotificationsDropdown;
  }

  onCloseNotificationsDropdown() {
    this.showNotificationsDropdown = false;
  }

}
