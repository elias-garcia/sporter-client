import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Alert } from './alert.model';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  public alert: Alert;

  constructor(
    private alertService: AlertService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.alertService.getAlert().subscribe((alert: Alert) => {
      this.alert = alert;
      this.cd.detectChanges();
    });
  }

}
