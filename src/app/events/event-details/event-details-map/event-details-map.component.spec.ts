import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailsMapComponent } from './event-details-map.component';

describe('EventDetailsMapComponent', () => {
  let component: EventDetailsMapComponent;
  let fixture: ComponentFixture<EventDetailsMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailsMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
