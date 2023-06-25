import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, tap } from 'rxjs';
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

  isAuthenticated$ = new BehaviorSubject<boolean>(false);

  login(payload: LoginPayload): Observable<LoginResponse> {
    const url = `${this.baseUrl}/login`;

    return this.http.post<LoginResponse>(url, { payload }).pipe(
      tap((response) =>
        this.storageService.setToken(environment.token, response.access_token)
      ),
      tap(() => this.isAuthenticated$.next(true))
    );
  }

  logout(): void {
    this.storageService.removeToken(environment.token);
    this.router.navigate(['autenticacao']);
    this.isAuthenticated$.next(false);
  }
}
