import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    ForgotPasswordRoutingModule,
    SharedModule
  ],
  declarations: [ForgotPasswordComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ForgotPasswordModule { }
