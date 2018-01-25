import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsRoutingModule } from './events-routing.module';
import { NewEventComponent } from './new-event/new-event.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventSearchResultsComponent } from './event-search-results/event-search-results.component';
import { SharedModule } from '../shared/shared.module';
import { EventsSearcherComponent } from './components/events-searcher/events-searcher.component';
import { EventDetailsMapComponent } from './components/event-details-map/event-details-map.component';
import { EventDetailsPlayersComponent } from './components/event-details-players/event-details-players.component';
import { EventDetailsInfoComponent } from './components/event-details-info/event-details-info.component';

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
    EventsSearcherComponent,
    EventDetailsMapComponent,
    EventDetailsPlayersComponent,
    EventDetailsInfoComponent
  ],
  exports: [
    EventsSearcherComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EventsModule { }
