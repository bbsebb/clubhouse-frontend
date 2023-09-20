import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const cheminsExclus = ['/api/auth/login', '/api/users/create'];

    // Utilisez l'objet URL pour extraire le chemin de la requête
    const cheminRequete = new URL(req.url).pathname;

    if (this.authService.isAuth && !cheminsExclus.includes(cheminRequete)) {
      const authReq = req.clone({
        headers: req.headers.set(
          'Authorization',
          'Bearer ' + this.authService.jwt
        ),
      });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}
