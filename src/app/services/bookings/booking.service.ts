import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Hall} from "../../models/booking/Hall";
import {Booking} from "../../models/booking/Booking";
import {BookingCreateDTO} from "./dto/booking-create-dto";
import {environment} from "../../../environment";
import {PaymentType} from "../../models/booking/payment-type";
import {BookingPayDTO} from "./dto/booking-pay-dto";

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

  getBooking(id: string):Observable<Booking> {
    return this.http.get<Booking>(`${environment.apiUrl}/bookings/${id}`);
  }

  accept(id: string):Observable<Booking> {
    return this.http.put<Booking>(`${environment.apiUrl}/bookings/${id}/accept`,{});
  }

  pay(id: string,amountPaid:number,paymentType:PaymentType,collectorId:string):Observable<Booking> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    const bookingPayDTO:BookingPayDTO = {
      amountPaid:amountPaid,
      collectorId:collectorId,
      paymentType:paymentType
    }
    return this.http.put<Booking>(`${environment.apiUrl}/bookings/${id}/pay`,bookingPayDTO,httpOptions);
  }

  valid(id: string):Observable<Booking> {
    return this.http.put<Booking>(`${environment.apiUrl}/bookings/${id}/valid`,{});
  }

  refuse(id: string):Observable<Booking> {
    return this.http.put<Booking>(`${environment.apiUrl}/bookings/${id}/refuse`,{});
  }
}
