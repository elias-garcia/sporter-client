import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: 'app/login/login.module#LoginModule',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: 'app/register/register.module#RegisterModule',
    pathMatch: 'full'
  },
  {
    path: 'forgot-password',
    loadChildren: 'app/forgot-password/forgot-password.module#ForgotPasswordModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
