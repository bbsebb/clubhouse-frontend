import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Hall} from "../../models/booking/Hall";
import {Booking} from "../../models/booking/Booking";
import {BookingCreateDTO} from "./dto/booking-create-dto";
import {environment} from "../../../environment";

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
    let url:string =`${environment.apiUrl}/bookings/create`;
    return this.http.post<Booking>(url,bookingCreateDTO,httpOptions);
  }

  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${environment.apiUrl}/bookings`);
  }
}
