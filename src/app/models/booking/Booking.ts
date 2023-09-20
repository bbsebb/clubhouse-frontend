import { Hall } from './Hall';
import { HallUser } from './HallUser';
import { Timeslot } from './Timeslot';
import { PaymentType } from './payment-type';
import { Payment } from './Payment';
import { BookingState } from './booking-state';

export interface Booking {
  id: string;
  hall: Hall;
  user: HallUser;
  timeslot: Timeslot;
  payment: Payment;
  allowOverlap: boolean;
  state: BookingState;
}
