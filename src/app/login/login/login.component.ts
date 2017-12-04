import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { ISession } from '../../core/models/ISession';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { SecurityService } from '../../core/services/security.service';
import { Router } from '@angular/router';

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
    private router: Router
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    const email: string = this.email.value;
    const password: string = this.password.value;

    this.logIn(email, password);
  }

  logIn(email: string, password: string) {
    this.userService.logIn(email, password)
      .subscribe((session: ISession) => {
        this.securityService.storeSession(session);
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
