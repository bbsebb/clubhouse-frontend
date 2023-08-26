import {SignInComponent} from "../users/sign-in/sign-in.component";
import {SignUpComponent} from "../users/sign-up/sign-up.component";
import {UsersListComponent} from "../users/users-list/users-list.component";
import {authentificationGuard} from "../../utils/guards/authentification.guard";
import {Route} from "@angular/router";
import {BookingsListComponent} from "./bookings-list/bookings-list.component";
import {CreateBookingComponent} from "./create-booking/create-booking.component";

export default [
  {path: 'create', component: CreateBookingComponent},
  {path: '', component: BookingsListComponent},
  {path: '**', component: BookingsListComponent}
] as Route[];
