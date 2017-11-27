import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IAlert } from '../models/IAlert';
import { AlertService } from '../alert.service';
import { setTimeout } from 'timers';

const TIME = 5000;

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  public alert: IAlert;
  public show = false;

  constructor(
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.alertService.getAlert().subscribe((alert: IAlert) => {
      this.alert = alert;
      this.show = true;
      setTimeout(() => {
        this.show = false;
      }, TIME);
    });
  }

}
