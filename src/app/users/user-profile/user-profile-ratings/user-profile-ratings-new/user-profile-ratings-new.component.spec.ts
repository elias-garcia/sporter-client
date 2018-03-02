import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileRatingsNewComponent } from './user-profile-ratings-new.component';

describe('UserProfileRatingsNewComponent', () => {
  let component: UserProfileRatingsNewComponent;
  let fixture: ComponentFixture<UserProfileRatingsNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileRatingsNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileRatingsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
