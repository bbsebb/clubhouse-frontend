import {Timeslot} from "../../../models/booking/Timeslot";

export interface BookingCreateDTO {
  "halleId":string,
  "user": {
    "id":string,
  }
  "timeslot":Timeslot,
  "use":string
}
