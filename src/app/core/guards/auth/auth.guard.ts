import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/features/auth/services/auth';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const isAuthenticated$ = inject(AuthService).isAuthenticated$;

  isAuthenticated$.subscribe((isAuthenticated) => {
    if (!isAuthenticated) {
      router.navigate(['autenticacao']);
      return false;
    }

    return true;
  });

  return true;
};
