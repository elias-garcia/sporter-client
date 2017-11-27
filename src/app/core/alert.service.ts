import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { IAlert } from './models/IAlert';

@Injectable()
export class AlertService {

  private alert: Subject<IAlert> = new Subject<IAlert>();

  constructor() { }

  public createAlert(alert: IAlert) {
    this.alert.next(alert);
  }

  public getAlert(): Observable<IAlert> {
    return this.alert.asObservable();
  }
}
