import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Alert } from '../models/alert.model';

const TIME = 5000;

@Injectable()
export class AlertService {

  private alert: Subject<Alert> = new Subject<Alert>();

  constructor() { }

  public createAlert(alert: Alert) {
    this.alert.next(alert);
    setTimeout(() => {
      this.alert.next(undefined);
    }, TIME);
  }

  public getAlert(): Observable<Alert> {
    return this.alert.asObservable();
  }
}
