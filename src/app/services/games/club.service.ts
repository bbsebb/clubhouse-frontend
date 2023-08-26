import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Club} from "../../models/games/Club";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  constructor(private http: HttpClient) { }

  getClubs():Observable<Club[]> {
    let url:string = 'http://localhost:8080/api/clubs';
    return this.http.get<Club[]>(url);
  }

  getClub(code:string):Observable<Club> {
    let url:string = `http://localhost:8080/api/clubs/${code}`;
    return this.http.get<Club>(url);
  }
}
