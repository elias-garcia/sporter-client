import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewEventComponent } from './new-event/new-event.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventSearchResultsComponent } from './event-search-results/event-search-results.component';

const routes: Routes = [
  {
    path: '',
    component: EventSearchResultsComponent,
  },
  {
    path: 'new',
    component: NewEventComponent,
  },
  {
    path: ':id',
    component: EventDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
