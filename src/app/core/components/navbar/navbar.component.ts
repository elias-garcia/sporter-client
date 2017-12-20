import { Component, OnInit, ElementRef } from '@angular/core';
import { HostListener } from '@angular/core';
import { SecurityService } from '../../services/security.service';
import { Session } from '../../../shared/models/session.model';
import { DropdownType } from '../../../shared/components/dropdown/dropdown-type.enum';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { AlertType } from '../alert/alert.enum';

const LOGOUT_MESSAGE = 'Gracias por tu visita, hasta la próxima!';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public DropdownType = DropdownType;
  public isCollapsed = true;
  public showDropdown = false;
  public session: Session = undefined;

  constructor(
    private securityService: SecurityService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
    this.securityService.getSessionAsync().subscribe((session: Session) => {
      this.session = session;
    });
  }

  onLogout() {
    this.securityService.removeSession();
    this.alertService.createAlert({ message: LOGOUT_MESSAGE, type: AlertType.Success });
    this.router.navigateByUrl('');
    this.showDropdown = false;
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

  onToggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  onCloseDropdown() {
    this.showDropdown = false;
  }
}
