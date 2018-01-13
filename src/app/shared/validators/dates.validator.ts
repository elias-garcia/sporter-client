import { FormGroup, ValidationErrors } from '@angular/forms';
import { AbstractControl } from '@angular/forms/src/model';
import * as moment from 'moment';
import { Moment } from 'moment';

export function validateDates(group: FormGroup): ValidationErrors | null {
  const startDateControl: AbstractControl = group.get('startDate');
  const endingDateControl: AbstractControl = group.get('endingDate');
  const startDate: Moment = moment();
  const endingDate: Moment = moment();

  if (endingDate.isSameOrBefore(startDate)) {
    return { dates: true };
  }

  return null;
}
