import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './features/auth/services/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  route = inject(ActivatedRoute);
  isAuthenticated$ = inject(AuthService).isAuthenticated$;
}
