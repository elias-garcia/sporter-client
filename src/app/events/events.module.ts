import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsRoutingModule } from './events-routing.module';
import { EventsSearcherComponent } from './events-searcher/events-searcher.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    EventsRoutingModule,
    SharedModule
  ],
  declarations: [EventsSearcherComponent],
  exports: [EventsSearcherComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EventsModule { }
