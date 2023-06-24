import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoints } from 'src/environments/ednpoints';
import { LoginPayload } from '../models/LoginPayload';
import { LoginResponse } from '../models/LoginResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = endpoints.auth;

  login(payload: LoginPayload): Observable<LoginResponse> {
    const url = `${this.baseUrl}/login`;
    debugger;

    return this.http.post<LoginResponse>(url, { payload });
  }
}
