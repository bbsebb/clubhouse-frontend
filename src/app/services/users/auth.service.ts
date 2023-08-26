import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _jwt:string|null = null;
  private _isAuth = new BehaviorSubject<boolean>(false);
  constructor(private http:HttpClient) {
    const jwt = localStorage.getItem("jwt");
    if(jwt) {
      this._jwt = jwt;
      this._isAuth.next(true);
    }
  }

  public login(login:string, password:string):Observable<any> {
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
                this._isAuth.next(true);
              })
          )
  }
  public logout():void {
    this._jwt = null;
    localStorage.clear();
    this._isAuth.next(false);
  }


  private extractJwt(jwt:string) {
    const parts = jwt.split('.');
    const decodedPayload = atob(parts[1]);
    return JSON.parse(decodedPayload);
  }

  public getLogin():string {
    if(!this._jwt) {
      throw new Error("Utilisateur non identité");
    }
    return this.extractJwt(this.jwt).sub;
  }

  public getUserid():string {
    if(!this._jwt) {
      throw new Error("Utilisateur non identité");
    }
    return this.extractJwt(this.jwt).userId;
  }

  public getRoles():string {
    if(!this._jwt) {
      throw new Error("Utilisateur non identité");
    }
    return this.extractJwt(this.jwt).scope;
  }

  get isAuth():Observable<boolean> {
    return this._isAuth.asObservable();
  }


  get jwt():string {
    if(!this._jwt) {
      throw new Error("Utilisateur non identité");
    }
    return this._jwt;
  }

}
