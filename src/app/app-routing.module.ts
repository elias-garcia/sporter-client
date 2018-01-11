import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
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
