import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileEventsHistoryComponent } from './user-profile-events-history.component';

describe('UserProfileEventsHistoryComponent', () => {
  let component: UserProfileEventsHistoryComponent;
  let fixture: ComponentFixture<UserProfileEventsHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileEventsHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileEventsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
