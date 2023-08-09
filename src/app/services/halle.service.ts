import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Halle} from "../models/games/Halle";

@Injectable({
  providedIn: 'root'
})
export class HalleService {

  constructor(private http:HttpClient) { }

  getHalles( clubCode: string): Observable<Halle[]> {
    let url:string = 'http://localhost:8080/api/halles';
    if(clubCode) {
      url = 'http://localhost:8080/api/halles?club_code='+clubCode;
    }
    console.log(url);
    return this.http.get<Halle[]>(url);
  }
}
