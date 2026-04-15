import { Routes } from '@angular/router';
import { LoginPage } from './pages/login/login-page/login-page';
import { MainPage } from './pages/main/main-page/main-page';

export const routes: Routes = [
   {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'main-page',
    component: MainPage,
  }
];
