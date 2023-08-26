import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Hall} from "../../models/booking/Hall";
import {Booking} from "../../models/booking/Booking";
import {BookingCreateDTO} from "./dto/booking-create-dto";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http:HttpClient) { }

  createBooking(bookingCreateDTO:BookingCreateDTO): Observable<Booking> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    let url:string = 'http://localhost:8080/api/bookings/create';
    return this.http.post<Booking>(url,bookingCreateDTO,httpOptions);
  }
}
