import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private matSnackBar = inject(MatSnackBar);

  info(msg: string): void {
    this.matSnackBar.open(`${msg}`, 'OK', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['notification-info'],
    });
  }

  success(msg: string): void {
    this.matSnackBar.open(`${msg}`, 'OK', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['notification-success'],
    });
  }
}
