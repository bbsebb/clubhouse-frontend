import { Timeslot } from '../../../models/booking/Timeslot';
import { Address } from '../../../models/booking/Address';

export interface BookingCreateDTO {
  hallId: string;
  timeslot: Timeslot;
  use: string;
  user: {
    id?: string;
    username?: string;
    email?: string;
    address?: Address;
  };
}
