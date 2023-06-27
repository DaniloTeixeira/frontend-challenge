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

    if (statusCode == 400) {
      this.notification.error(
        'Houve um erro na requisição, tente novamente mais tarde.'
      );
    }

    if (statusCode === 401) {
      this.notification.error('Campo usuário ou senha inválido.');
    }

    if (statusCode === 404) {
      this.notification.error('A página solicitada não foi encontrada.');
    }

    if (statusCode === 413) {
      this.notification.error('O arquivo enviado excede o tamanho limite.');
    }

    if (statusCode >= 500 || statusCode === 403) {
      this.notification.error(
        'Erro interno no servidor, tente novamente mais tarde.'
      );
    }

    this.notification.error(
      'Não foi possível processar sua solicitação, tente novamente daqui uns instantes.'
    );

    throw new Error(errorResponse.message);
  }
}
