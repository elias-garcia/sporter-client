import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    RegisterRoutingModule,
    SharedModule
  ],
  declarations: [RegisterComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class RegisterModule { }
