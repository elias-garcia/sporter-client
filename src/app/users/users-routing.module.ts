import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserProfileEditComponent } from './user-profile-edit/user-profile-edit.component';
import { UserProfileEditProfileComponent } from './user-profile-edit/user-profile-edit-profile/user-profile-edit-profile.component';
import { UserProfileEditSecurityComponent } from './user-profile-edit/user-profile-edit-security/user-profile-edit-security.component';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: ':id',
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':id/edit',
    component: UserProfileEditComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
      },
      {
        path: 'profile',
        component: UserProfileEditProfileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'security',
        component: UserProfileEditSecurityComponent,
        canActivate: [AuthGuard],
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
