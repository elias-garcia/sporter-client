import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileRatingsListItemComponent } from './user-profile-ratings-list-item.component';

describe('UserProfileRatingsListItemComponent', () => {
  let component: UserProfileRatingsListItemComponent;
  let fixture: ComponentFixture<UserProfileRatingsListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileRatingsListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileRatingsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
