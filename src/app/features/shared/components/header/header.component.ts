import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalUpdateProfileComponent } from 'src/app/features/auth/components/modal-update-profile';
import { AuthService } from 'src/app/features/auth/services/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  private matDialog = inject(MatDialog);

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['autenticacao']);
  }

  onOpenUpdateModal(): void {
    this.matDialog.open(ModalUpdateProfileComponent, {
      autoFocus: false,
      width: '600px',
    });
  }
}
