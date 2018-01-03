import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsSearcherComponent } from './events-searcher.component';

describe('EventsSearcherComponent', () => {
  let component: EventsSearcherComponent;
  let fixture: ComponentFixture<EventsSearcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsSearcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsSearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
