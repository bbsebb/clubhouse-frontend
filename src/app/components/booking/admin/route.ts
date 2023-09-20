import {Route} from '@angular/router';
import {BookingsListComponent} from './bookings-list/bookings-list.component';
import {CreateBookingComponent} from './create-booking/create-booking.component';
import {BookingDetailComponent} from './booking-detail/booking-detail.component';

export default [
  { path: 'create', component: CreateBookingComponent },
  { path: ':id', component: BookingDetailComponent },
  { path: '', component: BookingsListComponent },
  { path: '**', component: BookingsListComponent },
] as Route[];
