import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LayoutComponent } from './components/layout/layout.component';
import { RouterModule } from '@angular/router';
import { AlertComponent } from './components/alert/alert.component';
import { AlertService } from './services/alert.service';
import { SecurityService } from './services/security.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [NavbarComponent, FooterComponent, LayoutComponent, AlertComponent],
  exports: [
    LayoutComponent
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [AlertService, SecurityService]
    };
  }
}
