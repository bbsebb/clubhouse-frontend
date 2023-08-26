import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../../services/users/auth.service";

export const authentificationGuard: CanActivateFn = (route, state) => {
  const authService = inject<AuthService>(AuthService);
  const router = inject<Router>(Router);
  let guard:boolean = false;
  authService.isAuth.subscribe(
    isAuth => {
      if(isAuth) {
        guard = true;
      } else {
        router.navigate(["users","signin"]);
        guard = false;
      }
    }
  )
  return guard;

};
