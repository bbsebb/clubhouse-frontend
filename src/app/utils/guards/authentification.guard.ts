import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../../services/users/auth.service";
import {SnackBarMessageService} from "../../services/snack-bar-message.service";

export const authentificationGuard: CanActivateFn = (route, state) => {
  const authService = inject<AuthService>(AuthService);
  const router = inject<Router>(Router);
  const snackBar:SnackBarMessageService = inject<SnackBarMessageService>(SnackBarMessageService);
  let guard:boolean = true;
  authService.isAuth.subscribe(
    isAuth => {
      if(!isAuth) {
        router.navigate(["users","signin"]);
        guard = false;
      }
      if(isAuth && !authService.getRoles().includes("ADMIN") && !authService.getRoles().includes("USER")) {
        snackBar.notifyFormSubmission(['/'],"Vous n'avez pas les droits pour accéder à cette page" );
        guard = false;
      }
    }
  )
  return guard;

};
