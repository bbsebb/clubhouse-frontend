import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Hall} from "../../models/booking/Hall";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HallService {

  constructor(private http:HttpClient) { }

  getHall(): Observable<Hall[]> {
    let url:string = 'http://localhost:8080/api/booking-halls';
    return this.http.get<Hall[]>(url);
  }
}
