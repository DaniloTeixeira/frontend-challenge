import { Component, inject } from '@angular/core';
import { AuthService } from 'src/app/features/auth/services/auth';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
})
export class PageNotFoundComponent {
  isAuthenticated$ = inject(AuthService).isAuthenticated$;
}
