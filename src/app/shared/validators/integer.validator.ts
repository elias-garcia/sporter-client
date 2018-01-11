import { AbstractControl, ValidationErrors } from '@angular/forms';

export function validateInteger(control: AbstractControl): ValidationErrors | null {
  if (!control.value) {
    return null;
  }

  if (!Number.isInteger(control.value)) {
    return { integer: true };
  }

  return null;
}
