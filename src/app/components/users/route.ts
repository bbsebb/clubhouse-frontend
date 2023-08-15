import {Route} from "@angular/router";
import {SignInComponent} from "./sign-in/sign-in.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {UsersListComponent} from "./users-list/users-list.component";

export default [
  {path: 'signin', component: SignInComponent},
  {path: 'signup', component: SignUpComponent},
  {path: '', component: UsersListComponent},
  {path: '**', component: UsersListComponent}
] as Route[];
