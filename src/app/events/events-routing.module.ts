import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewEventComponent } from './new-event/new-event.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventSearchResultsComponent } from './event-search-results/event-search-results.component';
import { EventSearchResultsGuard } from '../core/guards/event-search-results.guard';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: EventSearchResultsComponent,
    canActivate: [EventSearchResultsGuard]
  },
  {
    path: 'new',
    component: NewEventComponent,
    canActivate: [AuthGuard]
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
