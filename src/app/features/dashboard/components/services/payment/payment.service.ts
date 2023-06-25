import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoints } from 'src/environments/ednpoints';
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
}
