import {Big} from "big.js";
import {PaymentType} from "./payment-type";

export interface Payment {
  "amount":Big,
  "isPaid":boolean,
  "paymentType":PaymentType,
  "idCollector":string
}
