import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../models/users/user";
import {BehaviorSubject, Observable, of, switchMap} from "rxjs";
import {map, tap} from "rxjs/operators";
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user:User|null = null;
  private _jwt:string|null = null;
  private _isAuth = new BehaviorSubject<boolean>(false);
  constructor(private http:HttpClient) {
    const jwt = localStorage.getItem("jwt");
    const userString = localStorage.getItem("user");
    if(jwt && userString) {
      this._user = JSON.parse(userString);
      this._jwt = jwt;
    }
  }

  public login(login:string, password:string):Observable<User> {
      const httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json',
          }),
      };
      const loginRequest = {
        "login":login, "password":password
      }
      return this.http.post<{"token":string}>('http://localhost:8080/api/auth/login',loginRequest,httpOptions)
          .pipe(
              tap(response => {
                localStorage.setItem("jwt",response.token);
                this._jwt = response.token;
              }),
              map(response => this.extractJwt(response.token)),
              map(decodedJwt => decodedJwt.sub),
              switchMap(login => this.http.get<User>('http://localhost:8080/api/auth/info')),
              tap(user => {
                localStorage.setItem("user",JSON.stringify(user));
                this._user = user;
                this._isAuth.next(true);
              })
          )
  }
  public logout():void {
    this._user = null;
    this._jwt = null;
    localStorage.clear();
    this._isAuth.next(false);
  }


  private extractJwt(jwt:string) {
    const parts = jwt.split('.');
    const decodedPayload = atob(parts[1]);
    return JSON.parse(decodedPayload);
  }
  get isAuth():Observable<boolean> {
    return this._isAuth.asObservable();
  }

  get user():User {
    if(!this._user) {
      throw new Error("Utilisateur non identité");
    }
    return this._user;
  }

  get jwt():string {
    if(!this._jwt) {
      throw new Error("Utilisateur non identité");
    }
    return this._jwt;
  }

}
