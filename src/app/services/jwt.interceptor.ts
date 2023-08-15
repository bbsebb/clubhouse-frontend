import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService:AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    try{
      const authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + this.authService.jwt)
      });
      return next.handle(authReq);
    } catch (error) {
      return next.handle(req);
    }
  }
}
