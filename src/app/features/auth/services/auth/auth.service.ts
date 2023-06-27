import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of, tap } from 'rxjs';

import { endpoints } from 'src/environments/ednpoints';
import { LoginPayload } from '../../models/LoginPayload';
import { LoginResponse } from '../../models/LoginResponse';
import { StorageService } from 'src/app/core/services/storage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private storageService = inject(StorageService);

  private baseUrl = endpoints.auth;
  private _isAuthenticated$ = new BehaviorSubject(
    !!this.storageService.getItem('accessToken')
  );

  isAuthenticated$ = this._isAuthenticated$.asObservable();

  login(payload: LoginPayload): Observable<LoginResponse> {
    const url = `${this.baseUrl}/login`;

    // MOCK
    return of({
      message: 'login has been successfully',
      access_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBpY3BheS13ZWIiLCJzdWIiOiI2MmI0YTk4MGVkYTY5ODVjNTNiN2ExY2UiLCJpYXQiOjE2ODc4MjUyOTEsImV4cCI6MTY4NzkxMTY5MX0.xdNWYBgrjD8FNn-lchYvKKLLdNk4UDkSdTvJDMYquPA',
    }).pipe(
      tap(({ access_token }) => {
        this.setLocalStorageToken(access_token);
        this._isAuthenticated$.next(true);
      })
    );

    return this.http.post<LoginResponse>(url, payload).pipe(
      tap(({ access_token }) => {
        this.setLocalStorageToken(access_token);
        this._isAuthenticated$.next(true);
      })
    );
  }

  logout(): void {
    this._isAuthenticated$.next(false);
    this.storageService.removeItem('accessToken');
  }

  getLocalstorageToken(): string | null {
    return this.storageService.getItem('accessToken');
  }

  private setLocalStorageToken(accessToken: string): void {
    this.storageService.setItem('accessToken', accessToken);
  }
}
