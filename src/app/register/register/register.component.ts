import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      passwordGroup: this.fb.group({
        password: ['', Validators.required],
        passwordRepeat: ['', Validators.required]
      })
    });
  }

  get email() {
    return this.registerForm.get('email');
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get birthDate() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('passwordGroup.password');
  }

  get passwordRepeat() {
    return this.registerForm.get('passwordGroup.passwordRepeat');
  }

}
