import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { validateEmail } from '../../shared/validators/email.validator';
import { UserService } from '../../core/services/user.service';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { AlertService } from '../../core/services/alert.service';
import { Router } from '@angular/router';
import { AlertType } from '../../core/components/alert/alert.enum';

const EMAIL_SENT_MESSAGE = 'Se te ha enviado un mensaje con los pasos a seguir para reestablecer la contraseña';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public forgotPasswordForm: FormGroup;
  public isSendingRequest = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, validateEmail]]
    });
  }

  onSubmit() {
    const email: string = this.email.value;

    this.sendPasswordResetEmail(email);
  }

  sendPasswordResetEmail(email: string) {
    this.isSendingRequest = true;
    this.userService.sendPasswordResetEmail(email).subscribe(
      (res: any) => {
        this.isSendingRequest = false;
      },
      (err: HttpErrorResponse) => {
        this.isSendingRequest = false;
        if (err.status === 202) {
          this.alertService.createAlert({ message: EMAIL_SENT_MESSAGE, type: AlertType.Success });
          this.router.navigate(['login']);
        }
        if (err.status === 404) {
          this.email.setErrors({ 'emailDoesNotExist': true });
        }
      });
  }

  get email(): AbstractControl {
    return this.forgotPasswordForm.get('email');
  }

}
