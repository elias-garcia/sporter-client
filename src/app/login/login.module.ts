import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    LoginRoutingModule,
    SharedModule
  ],
  declarations: [LoginComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class LoginModule { }
