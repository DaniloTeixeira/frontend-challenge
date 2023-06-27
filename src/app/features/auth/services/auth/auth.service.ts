import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { BehaviorSubject, Observable, tap } from 'rxjs';

import { endpoints } from 'src/environments/ednpoints';
import { LoginPayload } from '../../models/LoginPayload';
import { LoginResponse } from '../../models/LoginResponse';
import { StorageService } from 'src/app/core/services/storage';
import { UpdateProfilePayload } from '../../models/UpdateProfilePayload';
import { UpdateProfileResponse } from '../../models/UpdateProfileResponse';
import { decodeBASE64ToString } from 'src/app/core/utils/decodeBASE64ToString';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private storageService = inject(StorageService);

  private baseUrl = endpoints.auth;

  private _isAuthenticated$ = new BehaviorSubject(
    !!this.storageService.getItem('access_token')
  );

  isAuthenticated$ = this._isAuthenticated$.asObservable();

  login(payload: LoginPayload): Observable<LoginResponse> {
    const url = `${this.baseUrl}/login`;

    return this.http.post<LoginResponse>(url, payload).pipe(
      tap(({ access_token }) => {
        const decodedToken = decodeBASE64ToString(access_token);

        this._isAuthenticated$.next(true);
        this.storageService.setItem('access_token', access_token);
        this.storageService.setItem('decoded_token', decodedToken);
      })
    );
  }

  logout(): void {
    this._isAuthenticated$.next(false);
    this.storageService.clearStorage();
  }

  updateProfile(
    payload: UpdateProfilePayload
  ): Observable<UpdateProfileResponse> {
    return this.http.put<UpdateProfileResponse>(this.baseUrl, payload);
  }
}
