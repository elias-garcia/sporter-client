import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { Session } from '../../shared/models/session.model';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { SecurityService } from '../../core/services/security.service';
import { Router } from '@angular/router';
import { validateEmail } from '../../shared/validators/email.validator';
import { LoginData } from '../login-data.model';
import { AlertService } from '../../core/services/alert.service';
import { AlertType } from '../../core/components/alert/alert.enum';

const WELCOME_MESSAGE = 'Bienvenido de nuevo';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

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
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, validateEmail]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    const loginData: LoginData = this.loginForm.value;

    this.logIn(loginData);
  }

  logIn(loginData: LoginData) {
    this.userService.logIn(loginData).subscribe((res: any) => {
      const session: Session = res.data.session;

      this.securityService.storeSession(session);
      this.alertService.createAlert(
        { message: `${WELCOME_MESSAGE} ${session.firstName}!`, type: AlertType.Success });
      this.router.navigateByUrl('');
    });
  }

  get email(): AbstractControl {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }

}
