import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';

import { MatPaginatorIntl } from '@angular/material/paginator';
import { getPtPaginatorIntl } from './core/intl/paginator-intl';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './core/interceptors/auth';
import { SharedModule } from './features/shared/shared.module';
import { ErrorHandlerInterceptor } from './core/interceptors/error-handler';

registerLocaleData(ptBr);
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatSnackBarModule,

    CoreModule,
    SharedModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR',
    },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL',
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline',
      },
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
    {
      provide: MatPaginatorIntl,
      useValue: getPtPaginatorIntl(),
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
