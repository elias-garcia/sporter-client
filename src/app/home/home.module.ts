import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { EventsModule } from '../events/events.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    EventsModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
