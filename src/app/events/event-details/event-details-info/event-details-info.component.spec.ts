import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailsInfoComponent } from './event-details-info.component';

describe('EventDetailsInfoComponent', () => {
  let component: EventDetailsInfoComponent;
  let fixture: ComponentFixture<EventDetailsInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailsInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
