import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class EventIntensityService {

  private eventIntensities: string[] = ['LOW', 'MEDIUM', 'HIGH'];

  constructor() { }

  getEventIntensities(): Observable<string[]> {
    return of(this.eventIntensities);
  }
}
