import { FormGroup, ValidationErrors, AbstractControl } from '@angular/forms';
import * as moment from 'moment';
import { Moment } from 'moment';

const MIN_HOURS = 1;

export function validateDate(group: FormGroup): ValidationErrors | null {
  const dateControl: AbstractControl = group.get('startDate');
  const timeControl: AbstractControl = group.get('startTime');
  const currentDate: Moment = moment();

  if (!dateControl.value || !timeControl.value) {
    return null;
  }

  const startDate: Moment = moment(dateControl.value, 'L');

  startDate.set({
    hours: timeControl.value.split(':')[0],
    minutes: timeControl.value.split(':')[1]
  });
  currentDate.add(MIN_HOURS, 'hours');

  if (startDate.isSameOrBefore(currentDate)) {
    return { invalidDate: true };
  }

  return null;
}
