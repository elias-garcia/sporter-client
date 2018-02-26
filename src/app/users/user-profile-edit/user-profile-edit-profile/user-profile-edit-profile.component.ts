import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { validateEmail } from '../../../shared/validators/email.validator';
import { SecurityService } from '../../../core/services/security.service';
import { Session } from '../../../shared/models/session.model';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../shared/models/user.model';
import * as moment from 'moment';
import { UserInfoData } from '../../user-info-data';
import { DatetimeService } from '../../../core/services/datetime.service';
import { AlertService } from '../../../core/services/alert.service';
import { AlertType } from '../../../core/components/alert/alert.enum';

const USER_INFO_UPDATED_MESSAGE = 'Información personal actualizada con éxito!';

@Component({
  selector: 'app-user-profile-edit-profile',
  templateUrl: './user-profile-edit-profile.component.html',
  styleUrls: ['./user-profile-edit-profile.component.scss']
})
export class UserProfileEditProfileComponent implements OnInit {

  public userInfoForm: FormGroup;
  public isSendingRequest = false;
  public session: Session;

  constructor(
    private fb: FormBuilder,
    private securityService: SecurityService,
    private userService: UserService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.securityService.getSessionAsync().subscribe(
      (session: Session) => {
        this.session = session;
        this.userService.getUserDetails(session.userId).subscribe(
          (res: any) => {
            this.createForm(res.data.user);
          }
        );
      }
    );
  }

  createForm(user: User) {
    this.userInfoForm = this.fb.group({
      email: [user.email, [Validators.required, validateEmail]],
      firstName: [user.firstName, Validators.required],
      lastName: [user.lastName, Validators.required],
      birthdate: [moment(user.birthdate).format('L'), Validators.required],
    });
  }

  onPickDate(date: string) {
    this.birthdate.patchValue(date);
  }

  onSubmit() {
    const payload = this.userInfoForm.value;
    this.isSendingRequest = true;
    this.userService.updateUserDetails(this.session.userId, payload).subscribe(
      (res => {
        this.isSendingRequest = false;
        this.alertService.createAlert({ message: USER_INFO_UPDATED_MESSAGE, type: AlertType.Success });
        this.getUser();
      })
    );
  }

  get email(): AbstractControl {
    return this.userInfoForm.get('email');
  }

  get firstName(): AbstractControl {
    return this.userInfoForm.get('firstName');
  }

  get lastName(): AbstractControl {
    return this.userInfoForm.get('lastName');
  }

  get birthdate(): AbstractControl {
    return this.userInfoForm.get('birthdate');
  }

}
