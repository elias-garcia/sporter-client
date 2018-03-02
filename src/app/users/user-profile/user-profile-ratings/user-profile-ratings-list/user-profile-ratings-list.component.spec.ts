import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileRatingsListComponent } from './user-profile-ratings-list.component';

describe('UserProfileRatingsListComponent', () => {
  let component: UserProfileRatingsListComponent;
  let fixture: ComponentFixture<UserProfileRatingsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileRatingsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileRatingsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
