import { Component, inject } from '@angular/core';
import { AuthService } from './features/auth/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isAuthenticated$ = inject(AuthService).isAuthenticated$;
}
