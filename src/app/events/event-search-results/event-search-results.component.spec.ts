import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EventSearchResultsComponent } from './event-search-results.component';

describe('EventSearchComponent', () => {
  let component: EventSearchResultsComponent;
  let fixture: ComponentFixture<EventSearchResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EventSearchResultsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
