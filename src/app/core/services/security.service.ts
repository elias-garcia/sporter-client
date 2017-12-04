import { Injectable } from '@angular/core';
import { ISession } from '../models/ISession';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

const STORAGE_KEY = 'session';

@Injectable()
export class SecurityService {

  private session: BehaviorSubject<ISession> = new BehaviorSubject<ISession>(undefined);

  constructor() { }

  storeSession(session: ISession) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    this.session.next(session);
  }

  removeSession() {
    localStorage.removeItem(STORAGE_KEY);
    this.session.next(undefined);
  }

  getSessionAsync(): Observable<ISession> {
    return this.session.asObservable();
  }

  getSessionSync(): ISession {
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
  }
}
