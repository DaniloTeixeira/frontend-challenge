import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  setToken(token: string, value: string): void {
    localStorage.setItem(token, value);
  }

  getToken(key: string): string | null {
    return localStorage.getItem(key);
  }

  removeToken(token: string): void {
    localStorage.removeItem(token);
  }

  clearLocalstorage(): void {
    localStorage.clear();
  }
}
