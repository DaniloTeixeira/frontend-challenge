import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/features/auth/services/auth';

export const loggedGuard: CanActivateFn = () => {
  const router = inject(Router);
  const accessToken = inject(AuthService).getLocalstorageToken();

  if (accessToken) {
    router.navigate(['dashboard']);
    return false;
  }

  return true;
};
