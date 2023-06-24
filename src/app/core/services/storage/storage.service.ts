import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  setStorageItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  getStorageItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  removeStorageItem(key: string): void {
    localStorage.removeItem(key);
  }

  clearStorage(): void {
    localStorage.clear();
  }
}
