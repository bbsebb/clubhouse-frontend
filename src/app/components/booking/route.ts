import { Route } from '@angular/router';
import { RentComponent } from './rent/rent.component';

export default [
  { path: '', component: RentComponent },
  { path: '**', component: RentComponent },
] as Route[];
