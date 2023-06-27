import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { first, Observable, switchMap } from 'rxjs';
import { AuthService } from 'src/app/features/auth/services/auth';
import { StorageService } from '../../services/storage';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private storageService = inject(StorageService);
  private isAuthenticated$ = inject(AuthService).isAuthenticated$;

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        const accessToken = this.storageService.getItem('access_token');
        request = request.clone({
          setHeaders: { Authorization: `Bearer ${accessToken}` },
        });
      }
    });

    return this.isAuthenticated$.pipe(
      first(),
      switchMap(() => next.handle(request))
    );
  }
}
