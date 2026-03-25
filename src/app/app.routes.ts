import { Routes } from '@angular/router';
import { authGuard, publicGuard } from './guards/auth.guards';
import { TaskListComponent } from './components/home/task-list/task-list.component';

export const routes: Routes = [
     {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./components/home/task-list/task-list.component').then(m=>m.TaskListComponent),
  },
  {
    path: 'auth',
    canActivate: [publicGuard],
    children: [
      {
        path: 'sign-up',
        loadComponent: () => import('./components/auth/sign-up/sign-up.component').then(m=>m.SignUpComponent),
      },
      {
        path: 'log-in',
        loadComponent: () => import('./components/auth/login/login.component').then(m=>m.LoginComponent),
      },
    ],
  },
];
