import {Timeslot} from "../../../models/booking/Timeslot";

export interface BookingCreateDTO {
  "halleId": string,
  "timeslot": Timeslot
  "use": string,
  "user": {
    "id": string,
  }
}
