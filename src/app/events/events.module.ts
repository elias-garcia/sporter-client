import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsRoutingModule } from './events-routing.module';
import { NewEventComponent } from './new-event/new-event.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventSearchResultsComponent } from './event-search-results/event-search-results.component';
import { SharedModule } from '../shared/shared.module';
import { EventsSearcherComponent } from './event-search-results/events-searcher/events-searcher.component';
import { EventMapComponent } from './event-details/event-map/event-map.component';
import { EventPlayersComponent } from './event-details/event-players/event-players.component';
import { EventInfoComponent } from './event-details/event-info/event-info.component';
import { EventListComponent } from './event-search-results/event-list/event-list.component';
import { EventListItemComponent } from './event-search-results/event-list-item/event-list-item.component';

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
    EventMapComponent,
    EventPlayersComponent,
    EventInfoComponent,
    EventListComponent,
    EventListItemComponent
  ],
  exports: [
    EventsSearcherComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EventsModule { }
