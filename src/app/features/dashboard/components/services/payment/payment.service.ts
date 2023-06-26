import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoints } from 'src/environments/ednpoints';
import { CreateOrEditPaymentPayload } from '../../models/CreateOrEditPaymentPayload';
import { Payment } from '../../models/Payment';
import { PaymentListPayload } from '../../models/PaymentListPayload';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private http = inject(HttpClient);
  private baseUrl = endpoints.payments;

  getPayments(payload?: PaymentListPayload): Observable<Payment> {
    let params = new HttpParams();

    if (payload?.filter != null) {
      params = params.set('filter', payload?.filter);
    }

    if (payload?.limit != null) {
      params = params.set('limit', payload?.limit);
    }

    if (payload?.page != null) {
      params = params.set('page', payload?.page);
    }

    return this.http.get<Payment>(this.baseUrl, { params });
  }

  getPaymentById(id: string): Observable<Payment> {
    const url = `${this.baseUrl}/${id}`;

    return this.http.get<Payment>(url);
  }

  createPayment(payload: CreateOrEditPaymentPayload): Observable<void> {
    return this.http.post<void>(this.baseUrl, payload);
  }

  editPayment(
    payload: CreateOrEditPaymentPayload,
    id: string
  ): Observable<void> {
    const url = `${this.baseUrl}/${id}`;

    return this.http.put<void>(url, payload);
  }

  deletePayment(id: string): Observable<void> {
    const url = `${this.baseUrl}/${id}`;

    return this.http.delete<void>(url);
  }
}
