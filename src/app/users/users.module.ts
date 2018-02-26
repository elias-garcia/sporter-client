import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SharedModule } from '../shared/shared.module';
import { UserProfileInfoComponent } from './user-profile/user-profile-info/user-profile-info.component';
import { UserProfileRatingsComponent } from './user-profile/user-profile-ratings/user-profile-ratings.component';
import { UserProfileEditComponent } from './user-profile-edit/user-profile-edit.component';
import { UserProfileEditProfileComponent } from './user-profile-edit/user-profile-edit-profile/user-profile-edit-profile.component';
import { UserProfileEditSecurityComponent } from './user-profile-edit/user-profile-edit-security/user-profile-edit-security.component';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ],
  declarations: [UserProfileComponent, UserProfileInfoComponent, UserProfileRatingsComponent, UserProfileEditComponent, UserProfileEditProfileComponent, UserProfileEditSecurityComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UsersModule { }
