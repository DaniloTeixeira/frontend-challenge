import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private prefix = 'TOKEN';

  // setItem(key: string, value: any): void {
  //   if (typeof value !== 'string') {
  //     value = JSON.stringify(value);
  //   }

  //   localStorage.setItem(this.addPrefix(key), value);
  // }

  // clear(): void {
  //   localStorage.clear();
  // }

  // getItem<T = any>(key: string): T | null {
  //   return this.getLocalStorageItem<T>(key);
  // }

  // removeItem(key: string): void {
  //   localStorage.removeItem(this.addPrefix(key));
  // }

  // private getLocalStorageItem<T = any>(key: string): T | null {
  //   const itemStr = localStorage.getItem(this.addPrefix(key));

  //   if (!itemStr) {
  //     return null;
  //   }

  //   return itemStr;
  // }

  // private addPrefix(key: string): string {
  //   return `${this.prefix}_${key}`;
  // }
}
