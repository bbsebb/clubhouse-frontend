import {Route} from "@angular/router";
import {SignInComponent} from "./sign-in/sign-in.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {UsersListComponent} from "./users-list/users-list.component";
import {authentificationGuard} from "../../utils/guards/authentification.guard";

export default [
  {path: 'signin', component: SignInComponent},
  {path: 'signup', component: SignUpComponent},
  {path: '', component: UsersListComponent,canActivate: [authentificationGuard]},
  {path: '**', component: UsersListComponent,canActivate: [authentificationGuard]}
] as Route[];
