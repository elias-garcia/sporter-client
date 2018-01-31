import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Location } from '@angular/common';
import { UserService } from '../../core/services/user.service';
import { Session } from '../../shared/models/session.model';
import { SecurityService } from '../../core/services/security.service';
import { validateEmail } from '../../shared/validators/email.validator';
import { LoginData } from '../login-data.model';
import { AlertService } from '../../core/services/alert.service';
import { AlertType } from '../../core/components/alert/alert.enum';
import { ActivatedRoute, Router } from '@angular/router';

const WELCOME_MESSAGE = 'Bienvenido de nuevo';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public isSendingRequest = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private securityService: SecurityService,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, validateEmail]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.isSendingRequest = true;

    const loginData: LoginData = this.loginForm.value;

    this.logIn(loginData);
  }

  logIn(loginData: LoginData) {
    this.userService.logIn(loginData).subscribe(
      (res: any) => {
        const session: Session = res.data.session;

        this.securityService.storeSession(session);
        this.alertService.createAlert(
          { message: `${WELCOME_MESSAGE} ${session.firstName}!`, type: AlertType.Success });

        const redirectUrl = this.activatedRoute.snapshot.queryParamMap.get('redirectTo');

        if (redirectUrl) {
          this.router.navigate([redirectUrl]);
        } else {
          this.location.back();
        }
      },
      (err: any) => {
        this.isSendingRequest = false;
        if (err.status === 403) {
          this.handleLoginError(err);
        }
      }
    );
  }

  handleLoginError(err: any) {
    if (err.error.error.message.includes('password')) {
      this.password.setErrors({ 'passwordDoesNotMatch': true });
    }
    if (err.error.error.message.includes('email')) {
      this.email.setErrors({ 'emailDoesNotExist': true });
    }
  }

  get email(): AbstractControl {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }

}
