import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Session } from '../../shared/models/session.model';

const STORAGE_KEY = 'session';

@Injectable()
export class SecurityService {

  private session: BehaviorSubject<Session> = new BehaviorSubject<Session>(undefined);

  constructor() { }

  storeSession(session: Session) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    this.session.next(session);
  }

  removeSession() {
    localStorage.removeItem(STORAGE_KEY);
    this.session.next(undefined);
  }

  getSession() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
  }

  getSessionAsync(): Observable<Session> {
    this.session.next(this.getSession());
    return this.session.asObservable();
  }

  getSessionSync(): Session {
    return this.getSession();
  }
}
