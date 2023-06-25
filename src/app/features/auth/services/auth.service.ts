import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable, tap } from 'rxjs';

import { endpoints } from 'src/environments/ednpoints';
import { LoginPayload } from '../models/LoginPayload';
import { LoginResponse } from '../models/LoginResponse';
import { StorageService } from 'src/app/core/services/storage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  private http = inject(HttpClient);
  private storageService = inject(StorageService);

  private baseUrl = endpoints.auth;

  isAuthenticated$ = new BehaviorSubject<boolean>(false);

  constructor() {
    this.setIsAuthenticated();
  }

  login(payload: LoginPayload): Observable<LoginResponse> {
    const url = `${this.baseUrl}/login`;

    return this.http.post<LoginResponse>(url, payload).pipe(
      tap(({ access_token }) => {
        this.isAuthenticated$.next(true);
        this.setLocalStorageToken(access_token);
      })
    );
  }

  logout(): void {
    this.isAuthenticated$.next(false);
    this.router.navigate(['autenticacao']);
    this.storageService.removeItem('accessToken');
  }

  getLocalstorageToken(): string | null {
    return this.storageService.getItem('accessToken');
  }

  private setLocalStorageToken(accessToken: string): void {
    this.storageService.setItem('accessToken', accessToken);
  }

  private setIsAuthenticated(): void {
    const token = this.storageService.getItem('accessToken');

    this.isAuthenticated$.next(!!token);
  }
}
