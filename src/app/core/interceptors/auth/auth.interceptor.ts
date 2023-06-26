import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/features/auth/services/auth';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authService = inject(AuthService);

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.authService.getLocalstorageToken();

    if (token) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });

      this.authService.isAuthenticated$.next(true);

      return next.handle(request);
    }

    return next.handle(request);
  }
}
