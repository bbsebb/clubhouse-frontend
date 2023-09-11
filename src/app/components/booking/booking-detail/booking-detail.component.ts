import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import {MatCardModule} from "@angular/material/card";
import {catchError, empty, Observable, of, switchMap} from "rxjs";
import {Booking} from "../../../models/booking/Booking";
import {map, tap} from "rxjs/operators";
import {BookingService} from "../../../services/bookings/booking.service";
import {MatButtonModule} from "@angular/material/button";
import {EuroFormatPipe} from "../../../utils/pipes/euro-format.pipe";
import {BookingState} from "../../../models/booking/booking-state";
import {PaymentType} from "../../../models/booking/payment-type";
import {AuthService} from "../../../services/users/auth.service";
import {SnackBarMessageService} from "../../../services/snack-bar-message.service";

@Component({
  selector: 'app-booking-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, EuroFormatPipe],
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.scss']
})
export class BookingDetailComponent implements OnInit{

  booking$!:Observable<Booking>
  isAcceptActive: boolean = true;
  isPayActive: boolean = true;
  isValidActive: boolean = true;
  isRefuseActive: boolean = true;
  booking!: Booking;

  constructor(private snackMessage:SnackBarMessageService,private route: ActivatedRoute,private bookingService:BookingService,private authService:AuthService) {
  }

  ngOnInit(): void {
    this.booking$ = this.route.paramMap.pipe(
      map(params => params.get('id') as string),
      switchMap(param => this.bookingService.getBooking(param)),
      tap(booking => this.booking = booking),
      tap(booking => this.activateButton(booking)),
      tap((booking) => console.log(booking))
    )
  }

  onAccept() {
    this.booking$ = this.bookingService.accept(this.booking.id).pipe(
      tap(booking => this.booking = booking),
      tap(booking => this.activateButton(booking)),
      tap(() => this.snackMessage.notifyFormSubmission([],"Réservation acceptée")),
      catchError((err) => {
        this.snackMessage.notifyFormSubmission([], "une erreur est survenue");
        throw new Error(err);
      })
    );
  }

  onPay() {
    this.booking$ = this.bookingService.pay(this.booking.id, this.booking.payment.amount, PaymentType.CASH, this.authService.getUserid()).pipe(
      tap(booking => this.booking = booking),
      tap(booking => this.activateButton(booking)),
      tap(() => this.snackMessage.notifyFormSubmission([],"Réservation payée")),
      catchError((err) => {
        this.snackMessage.notifyFormSubmission([], "une erreur est survenue");
        throw new Error(err);
      })
    );
  }

  onValid() {
    this.booking$ = this.bookingService.valid(this.booking.id).pipe(
      tap(booking => this.booking = booking),
      tap(booking => this.activateButton(booking)),
      tap(() => this.snackMessage.notifyFormSubmission([],"Réservation validée")),
      catchError((err) => {
        this.snackMessage.notifyFormSubmission([], "une erreur est survenue");
        throw new Error(err);
      })
    );
  }

  onRefuse() {
    this.booking$ = this.bookingService.refuse(this.booking.id).pipe(
      tap(booking => this.booking = booking),
      tap(booking => this.activateButton(booking)),
      tap(() => this.snackMessage.notifyFormSubmission([],"Réservation refusée")),
      catchError((err) => {
        this.snackMessage.notifyFormSubmission([], "une erreur est survenue");
        throw new Error(err);
      })
    );
  }

  private activateButton(booking:Booking):void {
    switch (booking.state) {
      case BookingState.ACCEPTED:
        this.isPayActive = false;
        this.isAcceptActive = true;
        this.isValidActive = false;
        this.isRefuseActive = false;
        break;

      case BookingState.PENDING:
        this.isPayActive = true;
        this.isAcceptActive = false;
        this.isValidActive = true;
        this.isRefuseActive = false;
        break;

      default:
        this.isPayActive = true;
        this.isAcceptActive = true;
        this.isValidActive = true;
        this.isRefuseActive = true;
        break;
    }
  }


}
