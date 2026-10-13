
import { Routes } from '@angular/router';

import { LoginComponent } from './login.component';
import { DashboardComponent } from './dashboard.component';
import { roleGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'patient',
    component: DashboardComponent,
    canActivate: [roleGuard],
    data: { roles: ['PATIENT'] },
  },
  {
    path: 'doctor',
    component: DashboardComponent,
    canActivate: [roleGuard],
    data: { roles: ['DOCTOR'] },
  },
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [roleGuard],
    data: { roles: ['ADMIN'] },
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
