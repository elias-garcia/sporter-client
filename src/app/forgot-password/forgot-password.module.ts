import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SharedModule } from '../shared/shared.module';
import { ForgotPasswordResetComponent } from './forgot-password-reset/forgot-password-reset.component';

@NgModule({
  imports: [
    ForgotPasswordRoutingModule,
    SharedModule
  ],
  declarations: [ForgotPasswordComponent, ForgotPasswordResetComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ForgotPasswordModule { }
