import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable, switchMap } from 'rxjs';
import { Hall } from '../../../../models/booking/Hall';
import { Validation } from '../../../../utils/validators/validation';
import { HallService } from '../../../../services/bookings/hall.service';
import { BookingService } from '../../../../services/bookings/booking.service';
import { BookingCreateDTO } from '../../../../services/bookings/dto/booking-create-dto';
import { Timeslot } from '../../../../models/booking/Timeslot';
import { AuthService } from '../../../../services/users/auth.service';
import { SnackBarMessageService } from '../../../../services/snack-bar-message.service';
import { map, tap } from 'rxjs/operators';
import { Game } from '../../../../models/games/Game';
import { GameService } from '../../../../services/games/game.service';
import { NameTeamPipe } from '../../../../utils/pipes/name-team.pipe';

@Component({
  selector: 'app-create-booking',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    NameTeamPipe,
  ],
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  formBooking!: FormGroup;
  hall$!: Observable<Hall[]>;
  startDateTimeControl!: FormControl;
  endDateTimeControl!: FormControl;
  formTimeslot!: FormGroup;

  filterGame$!: Observable<Game[]>;

  useOptions = {
    refreshments: 'Buvette',
    repast: "Repas d'équipe",
    meeting: 'Réunion',
    other: 'Autres',
  };

  constructor(
    private gameService: GameService,
    private snackBarMessage: SnackBarMessageService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private hallService: HallService,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    this.hall$ = this.hallService.getHall();

    this.startDateTimeControl = this.formBuilder.control('', [
      Validators.required,
    ]);
    this.endDateTimeControl = this.formBuilder.control('', [
      Validators.required,
    ]);
    this.formTimeslot = this.formBuilder.group(
      {
        startTimeslot: this.startDateTimeControl,
        endTimeslot: this.endDateTimeControl,
      },
      {
        validators: Validation.timeslot('startTimeslot', 'endTimeslot'),
      }
    );
    this.formBooking = this.formBuilder.group({
      hall: ['00000000-0000-0000-0000-000000000000', Validators.required],
      use: ['refreshments', Validators.required],
      timeslot: this.formTimeslot,
    });

    this.filterGame$ = this.startDateTimeControl.valueChanges.pipe(
      map((startDateString) => new Date(startDateString)),
      switchMap((startDate) => {
        startDate.setHours(0, 0, 0, 0);
        let endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 1);
        return this.gameService.getGames(startDate, endDate);
      })
    );
  }

  onSubmit() {
    if (this.formBooking.valid) {
      const bookingCreateDTO: BookingCreateDTO = {
        hallId: this.formBooking.get('hall')?.value,
        timeslot: {
          start: this.startDateTimeControl.value,
          end: this.endDateTimeControl.value,
        },
        use: this.formBooking.get('use')?.value,
        user: {
          id: this.authService.getUserid(),
        },
      };
      this.bookingService.createBooking(bookingCreateDTO).subscribe({
        next: () =>
          this.snackBarMessage.notifyFormSubmission(
            ['admin', 'bookings'],
            'La réservation a été ajoutée'
          ),
        error: (err) =>
          this.snackBarMessage.notifyFormSubmission([], err.error),
      });
    }
  }

  getFormControlErrorText(ctrl: AbstractControl): string {
    if (ctrl.hasError('required')) {
      return 'Ce champ est requis';
    } else if (ctrl.hasError('timeslot')) {
      return `la fin du créneau doit être après le début`;
    } else {
      return 'une erreur est survenue';
    }
  }
}
