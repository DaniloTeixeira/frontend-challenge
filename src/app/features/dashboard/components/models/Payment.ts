import { PaymentItem } from './PaymentItem';

export interface Payment {
  totalPage: number;
  items: PaymentItem[];
}
