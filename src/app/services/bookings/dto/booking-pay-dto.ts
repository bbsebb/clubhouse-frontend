import {PaymentType} from "../../../models/booking/payment-type";

export interface BookingPayDTO {
  amountPaid: number;
  paymentType: PaymentType;
  collectorId: string;
}
