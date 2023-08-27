import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {BookingService} from "../../../services/bookings/booking.service";
import {Booking} from "../../../models/booking/Booking";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {EuroFormatPipe} from "../../../utils/pipes/euro-format.pipe";

@Component({
  selector: 'app-bookings-list',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, MatTableModule, MatButtonModule, MatIconModule, RouterLink, EuroFormatPipe],
  templateUrl: './bookings-list.component.html',
  styleUrls: ['./bookings-list.component.scss']
})
export class BookingsListComponent implements OnInit,AfterViewInit{

  @ViewChild(MatPaginator, { static: true }) paginator !: MatPaginator;

  dataSource : MatTableDataSource<Booking> = new MatTableDataSource<Booking>();
  displayedColumns: String[] = [
    "hall",
    "username",
    "start",
    "end",
    "price",
    "state",
    "add"
  ];

  constructor(private bookingService:BookingService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.bookingService.getBookings().subscribe(bookings => {
      this.dataSource.data = bookings;
      this.dataSource.paginator = this.paginator;
    });
  }


}
