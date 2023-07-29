import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'test',
  loadComponent: () => import('./components/template/dashboard/dashboard.component').then(module => module.DashboardComponent)},
  { path: 'games',
  loadChildren: () => import('./components/games/route')}
];
