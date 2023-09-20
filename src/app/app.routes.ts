import { Routes } from '@angular/router';
import {authentificationGuard} from "./utils/guards/authentification.guard";
import {NavAdminComponent} from "./components/core/admin/nav-admin/nav-admin.component";
import {NavComponent} from "./components/core/nav/nav.component";

export const routes: Routes = [
  {
    path: 'admin',
    component: NavAdminComponent,
    children: [
      {
        path: 'games',
        canActivate: [authentificationGuard],
        loadChildren: () => import('./components/games/admin/route')
      },
      {
        path: 'users',
        loadChildren: () => import('./components/users/admin/route')
      },
      {
        path: 'bookings',
        canActivate: [authentificationGuard],
        loadChildren: () => import('./components/booking/admin/route')
      },
      {
        path: '',
        loadChildren: () => import('./components/core/admin/route')
      },
    ]
  },
  {
    path: '',
    component: NavComponent,
    children: [
      {
        path: 'rent',
        loadChildren: () => import('./components/booking/route')
      },
      {
        path: '',
        loadChildren: () => import('./components/core/route')
      }
    ]
  },


];
