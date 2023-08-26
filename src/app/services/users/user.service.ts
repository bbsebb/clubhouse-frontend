import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {GameCreateDTO} from "../games/dto/game-create-dto";
import {Observable} from "rxjs";
import {UserCreateDTO} from "./dto/user-create-dto";
import {User} from "../../models/users/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  createUser(userCreateDTO: UserCreateDTO):Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post('http://localhost:8080/api/users/create',userCreateDTO,httpOptions)
  }

  getUsers():Observable<User[]> {
    return this.http.get<User[]>('http://localhost:8080/api/users');
  }
}