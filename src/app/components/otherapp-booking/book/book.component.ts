//Afin de ne pas surcharger, je fais cette page dans cette application, mais cela mériterait par la suite une application en particulier
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {Observable} from "rxjs";
import {Hall} from "../../../models/booking/Hall";
import {SnackBarMessageService} from "../../../services/snack-bar-message.service";
import {HallService} from "../../../services/bookings/hall.service";
import {BookingService} from "../../../services/bookings/booking.service";
import {Validation} from "../../../utils/validators/validation";
import {BookingCreateDTO} from "../../../services/bookings/dto/booking-create-dto";
import {EuroFormatPipe} from "../../../utils/pipes/euro-format.pipe";
import {MatIconModule} from "@angular/material/icon";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {RouterLink} from "@angular/router";
import {Booking} from "../../../models/booking/Booking";

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, ReactiveFormsModule, EuroFormatPipe, MatIconModule, MatPaginatorModule, MatTableModule, RouterLink],
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit,AfterViewInit{

  @ViewChild(MatPaginator, { static: true }) paginator !: MatPaginator;

  dataSource : MatTableDataSource<Booking> = new MatTableDataSource<Booking>();
  displayedColumns: String[] = [
    "hall",
    "start",
    "end"
  ];

  formBooking!: FormGroup;
  hall$!: Observable<Hall[]>;
  startDateTimeControl!: FormControl;
  endDateTimeControl!: FormControl;
  emailControl!:FormControl;
  formTimeslot!:FormGroup;

  useOptions = {
    'wedding': 'mariage',
    'repast': 'Repas',
    'meeting': 'Réunion',
    'other': 'Autres'
  };

  constructor(private snackBarMessage:SnackBarMessageService,private formBuilder:FormBuilder,private hallService:HallService,private bookingService:BookingService) {
  }

  ngOnInit(): void {
    this.hall$ = this.hallService.getHall();
    this.emailControl = this.formBuilder.control('',[Validators.required,Validators.email]);
    this.startDateTimeControl = this.formBuilder.control('',[Validators.required]);
    this.endDateTimeControl = this.formBuilder.control('',[Validators.required]);
    this.formTimeslot = this.formBuilder.group({
      "startTimeslot":this.startDateTimeControl,
      "endTimeslot":this.endDateTimeControl,
    }, {
      validators: Validation.timeslot("startTimeslot","endTimeslot")
    });
    this.formBooking = this.formBuilder.group({
      "username": ['',Validators.required],
      "email": this.emailControl,
      "street": ['',Validators.required],
      "cp": ['',Validators.required],
      "city": ['',Validators.required],
      "hall": ['00000000-0000-0000-0000-000000000000',Validators.required],
      "use": ['meeting',Validators.required],
      "timeslot":this.formTimeslot,
    })
  }

  ngAfterViewInit(): void {
    this.loadBookings();
  }

  private loadBookings(): void {
    this.bookingService.getBookings().subscribe(bookings => {
      this.dataSource.data = bookings;
      this.dataSource.paginator = this.paginator;
    });
  }

  onSubmit() {
    if(this.formBooking.valid) {
      const bookingCreateDTO:BookingCreateDTO = {
        halleId: this.formBooking.get('hall')?.value,
        timeslot: {
          start: this.startDateTimeControl.value,
          end: this.endDateTimeControl.value
        },
        use: this.formBooking.get('use')?.value,
        user: {
          email:this.emailControl.value,
          address: {
            street:this.formBooking.get('street')?.value,
            city:this.formBooking.get('city')?.value,
            postalCode:this.formBooking.get('cp')?.value
          },
          username:this.formBooking.get('username')?.value
        }
      }
      this.bookingService.createBooking(bookingCreateDTO).subscribe({
        next: () => {
          this.snackBarMessage.notifyFormSubmission([], 'La réservation a été ajoutée');
          this.loadBookings();
        },
        error: (err) => this.snackBarMessage.notifyFormSubmission([],err.error)
      });
    }
  }

  getFormControlErrorText(ctrl: AbstractControl):string {
    if (ctrl.hasError('required')) {
      return 'Ce champ est requis';
    } else if(ctrl.hasError('timeslot')) {
      return `la fin du créneau doit être après le début`;
    }else if(ctrl.hasError('email')) {
      return `l'email n'est pas valide`;
    } else {
      return 'une erreur est survenue';
    }
  }
}
