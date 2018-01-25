import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailsPlayersComponent } from './event-details-players.component';

describe('EventDetailsPlayersComponent', () => {
  let component: EventDetailsPlayersComponent;
  let fixture: ComponentFixture<EventDetailsPlayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDetailsPlayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailsPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
