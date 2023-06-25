import { CreatePaymentPayload } from './CreatePaymentPayload';

export interface EditPaymentPayload extends CreatePaymentPayload {
  id: number;
}
