import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class DatetimeService {

  constructor() { }

  convertDateAndTimeToISOString(date: string, time: string) {
    const isoDate = moment(date, 'L');

    isoDate.hour(Number.parseInt(time.split(':')[0]));
    isoDate.minutes(Number.parseInt(time.split(':')[1]));

    return isoDate.format();
  }

}
