import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './alert.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [NavbarComponent, FooterComponent, LayoutComponent, AlertComponent],
  providers: [AlertService],
  exports: [
    LayoutComponent
  ]
})
export class CoreModule { }
