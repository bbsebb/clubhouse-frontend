import { Big } from 'big.js';
import { PaymentType } from './payment-type';

export interface Payment {
  amount: number;
  isPaid: boolean;
  paymentType: PaymentType;
  idCollector: string;
}
