import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { validateEmail } from '../../shared/validators/email.validator';
import { validatePasswordMatch } from '../../shared/validators/password-match.validator';
import { UserService } from '../../core/services/user.service';
import { RegisterData } from '../register-data.model';
import { SecurityService } from '../../core/services/security.service';
import { Session } from '../../shared/models/session.model';
import { AlertService } from '../../core/services/alert.service';
import { AlertType } from '../../core/components/alert/alert.enum';
import { Observable } from 'rxjs/Observable';
import { HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { HttpErrorResponse } from '@angular/common/http/src/response';

const WELCOME_MESSAGE = 'Bienvenido a Sporter! Ya puedes disfrutar de la plataforma';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private securityService: SecurityService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, validateEmail]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      passwordGroup: this.fb.group({
        password: ['', Validators.required],
        passwordConfirm: ['', Validators.required]
      }, { validator: validatePasswordMatch })
    });
  }

  onPickDate(date: string) {
    this.birthDate.patchValue(date);
  }

  onSubmit() {
    const registerData: RegisterData = {
      email: this.email.value,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      birthdate: this.birthDate.value,
      password: this.password.value,
      passwordConfirm: this.passwordConfirm.value
    };

    this.registerUser(registerData);
  }

  registerUser(registerData: RegisterData) {
    this.userService.register(registerData).subscribe(
      (res: any) => {
        const session = res.data.session;

        this.securityService.storeSession(session);
        this.alertService.createAlert({ message: WELCOME_MESSAGE, type: AlertType.Success });
        this.router.navigateByUrl('');
      },
      (err: HttpErrorResponse) => {
        this.handleRegisterError(err);
      });
  }

  handleRegisterError(err: HttpErrorResponse) {
    if (err.status === 409) {
      this.email.setErrors({ 'emailDuplicated': true });
    }
  }

  get email(): AbstractControl {
    return this.registerForm.get('email');
  }

  get firstName(): AbstractControl {
    return this.registerForm.get('firstName');
  }

  get lastName(): AbstractControl {
    return this.registerForm.get('lastName');
  }

  get birthDate(): AbstractControl {
    return this.registerForm.get('birthDate');
  }

  get password(): AbstractControl {
    return this.registerForm.get('passwordGroup.password');
  }

  get passwordConfirm(): AbstractControl {
    return this.registerForm.get('passwordGroup.passwordConfirm');
  }

}
