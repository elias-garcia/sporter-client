import { Component, OnInit, ElementRef } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public isCollapsed = true;

  constructor() { }

  ngOnInit() {
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

}
