import { Routes } from '@angular/router';
import {authentificationGuard} from "./utils/guards/authentification.guard";

export const routes: Routes = [
 { path: 'games',
   canActivate: [authentificationGuard],
  loadChildren: () => import('./components/games/route')},
  { path: 'users',
    loadChildren: () => import('./components/users/route')},
  { path: 'booking',
    canActivate: [authentificationGuard],
    loadChildren: () => import('./components/booking/route')}
];
