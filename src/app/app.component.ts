import { Component, HostListener } from '@angular/core';
import { NotificationsService } from './core/services/notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private notificationsService: NotificationsService
  ) { }

  @HostListener('window:beforeunload', [])
  beforeunloadHandler() {
    this.notificationsService.disconnect();
  }

}
