export interface PaymentItem {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  title: string;
  value: number;
  isPayed: boolean;
  date: string;
  __v: number;
  image?: string;
}
