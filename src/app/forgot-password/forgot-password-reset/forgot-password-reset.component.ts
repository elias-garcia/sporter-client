import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AlertType } from '../../core/components/alert/alert.enum';
import { AlertService } from '../../core/services/alert.service';
import { SecurityService } from '../../core/services/security.service';
import { UserService } from '../../core/services/user.service';
import { validatePasswordMatch } from '../../shared/validators/password-match.validator';
import { PasswordData } from '../../users/password-data';

const TOKEN_NOT_FOUND_MESSAGE = 'No se ha encontrado un token válido en la url';
// tslint:disable-next-line:max-line-length
const PASSWORD_UPDATED_SUCCESSFULLY_MESSAGE = 'La contraseña ha sido reestablecida con éxito, ya puedes iniciar sesión con tus nuevos datos';
const USER_NOT_FOUND = 'El usuario para el que ha intentado reestablecer la contraseña no existe';
const DATA_NOT_VALID = 'El token con el que ha intentado reestablecer la contraseña no es válido o ha expirado';

@Component({
  selector: 'app-forgot-password-reset',
  templateUrl: './forgot-password-reset.component.html',
  styleUrls: ['./forgot-password-reset.component.scss']
})
export class ForgotPasswordResetComponent implements OnInit {

  public passwordResetForm: FormGroup;
  private passwordResetToken: string;
  private userId: string;
  public isSendingRequest = false;

  constructor(
    private fb: FormBuilder,
    private securityService: SecurityService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.checkIfLoggedIn();
    this.createForm();
    this.getToken();
  }

  checkIfLoggedIn() {
    const session = this.securityService.getSessionSync();

    if (session) {
      this.router.navigate(['']);
    }
  }

  createForm() {
    this.passwordResetForm = this.fb.group({
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required]
    }, { validator: validatePasswordMatch });
  }

  getToken() {
    this.activatedRoute.paramMap.subscribe(
      (params: ParamMap) => {
        const token = params.get('token');

        this.parseToken(token);
      }
    );
  }

  parseToken(token: string) {
    const decoded: string[] = token.split('-');

    if (decoded && decoded.length === 2) {
      this.userId = decoded[0];
      this.passwordResetToken = decoded[1];
    } else {
      this.alertService.createAlert({ message: TOKEN_NOT_FOUND_MESSAGE, type: AlertType.Danger });
      this.router.navigate(['']);
    }
  }

  onSubmit() {
    this.isSendingRequest = true;

    const payload: PasswordData = {
      newPassword: this.password.value,
      newPasswordConfirm: this.passwordConfirm.value,
      token: this.passwordResetToken
    };

    this.userService.resetPassword(this.userId, payload).subscribe(
      (res: any) => {
        this.isSendingRequest = false;
        this.alertService.createAlert({ message: PASSWORD_UPDATED_SUCCESSFULLY_MESSAGE, type: AlertType.Success });
        this.router.navigate(['']);
      },
      (err: HttpErrorResponse) => {
        this.isSendingRequest = false;
        if (err.status === 404) {
          this.handleNonExistingUser();
        }
        if (err.status === 422) {
          this.handleTokenNotValid();
        }
      }
    );

  }

  handleNonExistingUser() {
    this.alertService.createAlert({ message: USER_NOT_FOUND, type: AlertType.Danger });
    this.router.navigate(['']);
  }

  handleTokenNotValid() {
    this.alertService.createAlert({ message: DATA_NOT_VALID, type: AlertType.Danger });
    this.router.navigate(['']);
  }

  get password() {
    return this.passwordResetForm.get('password');
  }

  get passwordConfirm() {
    return this.passwordResetForm.get('passwordConfirm');
  }

}
