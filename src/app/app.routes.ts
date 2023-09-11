import { Routes } from '@angular/router';
import {authentificationGuard} from "./utils/guards/authentification.guard";

export const routes: Routes = [
 { path: 'games',
   canActivate: [authentificationGuard],
  loadChildren: () => import('./components/games/route')},
  { path: 'users',
    loadChildren: () => import('./components/users/route')},
  { path: 'bookings',
    canActivate: [authentificationGuard],
    loadChildren: () => import('./components/booking/route')},
  //Afin de ne pas surcharger, je fais cette page dans cette application, mais cela mériterait par la suite une application en particulier
  { path: 'otherapp',
    loadChildren: () => import('./components/otherapp-booking/route')},
  { path: '',
    loadChildren: () => import('./components/core/route') },
];
