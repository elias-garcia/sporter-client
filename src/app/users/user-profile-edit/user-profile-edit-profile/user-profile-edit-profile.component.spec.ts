import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileEditProfileComponent } from './user-profile-edit-profile.component';

describe('UserProfileEditProfileComponent', () => {
  let component: UserProfileEditProfileComponent;
  let fixture: ComponentFixture<UserProfileEditProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileEditProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
