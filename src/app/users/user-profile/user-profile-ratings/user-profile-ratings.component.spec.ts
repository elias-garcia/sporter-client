import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileRatingsComponent } from './user-profile-ratings.component';

describe('UserProfileRatingsComponent', () => {
  let component: UserProfileRatingsComponent;
  let fixture: ComponentFixture<UserProfileRatingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileRatingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
