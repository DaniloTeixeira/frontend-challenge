import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageService } from 'src/app/core/services/storage';
import { AuthService } from '../../services';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authService = inject(AuthService);
  private isAuthenticated = inject(AuthService).isAuthenticaded;

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.authService.getLocalstorageToken();

    if (this.isAuthenticated) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });

      return next.handle(request);
    }

    return next.handle(request);
  }
}
