import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsRoutingModule } from './events-routing.module';
import { NewEventComponent } from './new-event/new-event.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventSearchResultsComponent } from './event-search-results/event-search-results.component';
import { SharedModule } from '../shared/shared.module';
import { EventsSearcherComponent } from './components/events-searcher/events-searcher.component';

@NgModule({
  imports: [
    CommonModule,
    EventsRoutingModule,
    SharedModule
  ],
  declarations: [
    NewEventComponent,
    EventDetailsComponent,
    EventSearchResultsComponent,
    EventsSearcherComponent
  ],
  exports: [
    EventsSearcherComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EventsModule { }
