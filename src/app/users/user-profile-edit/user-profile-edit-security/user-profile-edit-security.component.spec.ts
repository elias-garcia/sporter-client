import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileEditSecurityComponent } from './user-profile-edit-security.component';

describe('UserProfileEditSecurityComponent', () => {
  let component: UserProfileEditSecurityComponent;
  let fixture: ComponentFixture<UserProfileEditSecurityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileEditSecurityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileEditSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
