import { FormGroup, ValidationErrors, AbstractControl } from '@angular/forms';

export function validatePasswordSame(group: FormGroup): ValidationErrors | null {
  const oldPassword: AbstractControl = group.get('oldPassword');
  const newPassword: AbstractControl = group.get('newPasswordGroup.password');

  if (!oldPassword.value || !newPassword.value) {
    return null;
  }

  if (oldPassword.value === newPassword.value) {
    return { passwordSame: true };
  }

  return null;
}
