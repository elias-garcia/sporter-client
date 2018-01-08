import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsRoutingModule } from './events-routing.module';
import { NewEventComponent } from './new-event/new-event.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventSearchResultsComponent } from './event-search-results/event-search-results.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    EventsRoutingModule,
    SharedModule
  ],
  declarations: [NewEventComponent, EventDetailsComponent, EventSearchResultsComponent]
})
export class EventsModule { }
