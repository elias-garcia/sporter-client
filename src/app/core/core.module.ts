import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientJsonpModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LayoutComponent } from './components/layout/layout.component';
import { RouterModule } from '@angular/router';
import { AlertComponent } from './components/alert/alert.component';
import { AlertService } from './services/alert.service';
import { SecurityService } from './services/security.service';
import { UserService } from './services/user.service';
import { SharedModule } from '../shared/shared.module';
import { SportService } from './services/sport.service';
import { GeolocationService } from './services/geolocation.service';
import { EventIntensityService } from './services/event-intensity.service';
import { EventService } from './services/event.service';
import { DatetimeService } from './services/datetime.service';
import { CurrencyService } from './services/currency.service';
import { EventSearchResultsGuard } from './guards/event-search-results.guard';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/not-auth.guard';

@NgModule({
  imports: [
    CommonModule,
    HttpClientJsonpModule,
    RouterModule,
    SharedModule
  ],
  declarations: [
    NavbarComponent,
    FooterComponent,
    LayoutComponent,
    AlertComponent
  ],
  exports: [
    LayoutComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        AlertService,
        AuthGuard,
        CurrencyService,
        DatetimeService,
        EventIntensityService,
        EventSearchResultsGuard,
        EventService,
        GeolocationService,
        NotAuthGuard,
        SecurityService,
        SportService,
        UserService
      ]
    };
  }
}
