import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { EventSearchData } from '../../shared/components/events-searcher/event-search-data.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  onFillSearchForm(searchData: EventSearchData) {
    const queryParams: EventSearchData = searchData;
    const navigationExtras: NavigationExtras = { queryParams };

    this.router.navigate(['/events'], navigationExtras);
  }

}
