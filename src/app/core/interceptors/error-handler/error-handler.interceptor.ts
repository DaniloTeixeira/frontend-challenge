import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { NotificationService } from '../../services/notification';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  private notification = inject(NotificationService);

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next
      .handle(request)
      .pipe(catchError((e) => of(this.handleError(e))));
  }

  private handleError(errorResponse: HttpErrorResponse): HttpEvent<any> {
    const statusCode = errorResponse.status;

    if (statusCode === 400) {
      this.notification.error(
        'Solicitação inválida, se o erro persistir contate o suporte técnico.'
      );
    }

    if (statusCode === 401) {
      this.notification.error('Campo usuário ou senha inválido.');
    }

    if (statusCode === 404) {
      this.notification.error('A página solicitada não foi encontrada.');
    }

    if (statusCode === 500) {
      this.notification.error(
        'Erro interno no servidor, tente novamente mais tarde.'
      );
    }

    if (statusCode == 0) {
      this.notification.error(
        'Houve um erro na requisição, tente novamente mais tarde.'
      );
    }

    throw new Error(errorResponse.message);
  }
}
