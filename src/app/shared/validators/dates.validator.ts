import { FormGroup, ValidationErrors } from '@angular/forms';
import { AbstractControl } from '@angular/forms/src/model';
import * as moment from 'moment';
import { Moment } from 'moment';

export function validateDates(group: FormGroup): ValidationErrors | null {
  const startDateControl: AbstractControl = group.get('startDateGroup').get('startDate');
  const startTimeControl: AbstractControl = group.get('startDateGroup').get('startTime');
  const endingDateControl: AbstractControl = group.get('endingDateGroup').get('endingDate');
  const endingTimeControl: AbstractControl = group.get('endingDateGroup').get('endingTime');

  if (!startDateControl.value || !startTimeControl.value
    || !endingTimeControl.value || !endingTimeControl.value) {
    return null;
  }

  if (startTimeControl.value === '--:--' || endingTimeControl.value === '--:--') {
    return null;
  }

  const startDate: Moment = moment(startDateControl.value, 'L');
  const endingDate: Moment = moment(endingDateControl.value, 'L');

  startDate.set({
    hours: startTimeControl.value.split(':')[0],
    minutes: startTimeControl.value.split(':')[1]
  });
  endingDate.set({
    hours: endingTimeControl.value.split(':')[0],
    minutes: endingTimeControl.value.split(':')[1]
  });

  if (endingDate.isSameOrBefore(startDate)) {
    return { dates: true };
  }

  return null;
}
