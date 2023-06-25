import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable } from 'rxjs';
import { StorageService } from 'src/app/core/services/storage';
import { endpoints } from 'src/environments/ednpoints';
import { environment } from 'src/environments/environment';
import { LoginPayload } from '../models/LoginPayload';
import { LoginResponse } from '../models/LoginResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private storageService = inject(StorageService);
  private router = inject(Router);

  private baseUrl = endpoints.auth;

  login(payload: LoginPayload) {
    const url = `${this.baseUrl}/login`;

    return this.http.post<LoginResponse>(url, { payload }).pipe(
      map((response) =>
        this.storageService.setToken(environment.token, response.access_token)
      ),
      catchError((err: LoginResponse) => {
        this.storageService.removeToken('token');
        throw new Error(err.message);
      })
    );
  }

  logout(): void {
    this.storageService.removeToken(environment.token);
    this.router.navigate(['autenticacao']);
  }
}
