import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: 'app/home/home.module#HomeModule',
  },
  {
    path: 'login',
    loadChildren: 'app/login/login.module#LoginModule',
  },
  {
    path: 'register',
    loadChildren: 'app/register/register.module#RegisterModule',
  },
  {
    path: 'forgot-password',
    loadChildren: 'app/forgot-password/forgot-password.module#ForgotPasswordModule',
  },
  {
    path: 'events',
    loadChildren: 'app/events/events.module#EventsModule',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
