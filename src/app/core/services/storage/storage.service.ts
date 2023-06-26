import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private prefix = 'PAY_STORE';

  setItem(key: string, value: string): void {
    localStorage.setItem(this.addPrefix(key), value);
  }

  getItem(key: string): string | null {
    return localStorage.getItem(this.addPrefix(key));
  }

  removeItem(key: string): void {
    localStorage.removeItem(this.addPrefix(key));
  }

  clearStorage(): void {
    localStorage.clear();
  }

  private addPrefix(key: string): string {
    return `${this.prefix}_${key}`;
  }
}
