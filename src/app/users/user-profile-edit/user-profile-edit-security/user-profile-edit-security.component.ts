import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { validatePasswordMatch } from '../../../shared/validators/password-match.validator';
import { validatePasswordSame } from '../../../shared/validators/password-same.validator';
import { UserService } from '../../../core/services/user.service';
import { PasswordData } from '../../password-data';
import { SecurityService } from '../../../core/services/security.service';
import { Session } from '../../../shared/models/session.model';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '../../../core/services/alert.service';
import { AlertType } from '../../../core/components/alert/alert.enum';

const PASSWORD_UPDATED_MESSAGE = 'Contraseña cambiada con éxito!';

@Component({
  selector: 'app-user-profile-edit-security',
  templateUrl: './user-profile-edit-security.component.html',
  styleUrls: ['./user-profile-edit-security.component.scss']
})
export class UserProfileEditSecurityComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private securityService: SecurityService,
    private userService: UserService,
    private alertService: AlertService,
  ) { }

  public session: Session;
  public passwordForm: FormGroup;
  public isSendingRequest = false;

  ngOnInit() {
    this.createPasswordForm();
    this.getSession();
  }

  createPasswordForm() {
    this.passwordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPasswordGroup: this.fb.group({
        password: ['', Validators.required],
        passwordConfirm: ['', Validators.required]
      }, { validator: validatePasswordMatch })
    }, { validator: validatePasswordSame });
  }

  getSession() {
    this.securityService.getSessionAsync().subscribe(
      (session: Session) => {
        this.session = session;
      }
    );
  }

  onChangePassword() {
    this.isSendingRequest = true;
    const passwordData: PasswordData = {
      oldPassword: this.oldPassword.value,
      newPassword: this.newPassword.value,
      newPasswordConfirm: this.newPasswordConfirm.value
    };

    this.userService.changePassword(this.session.userId, passwordData).subscribe(
      (response: any) => {
        this.isSendingRequest = false;
        this.passwordForm.reset();
        this.alertService.createAlert({ message: PASSWORD_UPDATED_MESSAGE, type: AlertType.Success });
      },
      (error: HttpErrorResponse) => {
        this.isSendingRequest = false;
        if (error.status === 422) {
          this.oldPassword.setErrors({ oldPasswordMatch: true });
        }
      }
    );
  }

  get oldPassword(): AbstractControl {
    return this.passwordForm.get('oldPassword');
  }

  get newPassword(): AbstractControl {
    return this.passwordForm.get('newPasswordGroup.password');
  }

  get newPasswordConfirm(): AbstractControl {
    return this.passwordForm.get('newPasswordGroup.passwordConfirm');
  }

  get newPasswordGroup(): AbstractControl {
    return this.passwordForm.get('newPasswordGroup');
  }

}
