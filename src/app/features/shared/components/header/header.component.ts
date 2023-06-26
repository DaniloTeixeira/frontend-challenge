import { Component, inject } from '@angular/core';
import { AuthService } from 'src/app/features/auth/services/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  private authService = inject(AuthService);

  onLogout(): void {
    this.authService.logout();
  }
}
