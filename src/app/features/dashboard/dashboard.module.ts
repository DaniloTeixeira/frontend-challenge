import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';

import { CurrencyMaskModule } from 'ng2-currency-mask';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './components/dashboard';
import { PipesModule } from 'src/app/core/pipes/pipes.module';
import { ModalPaymentComponent } from './components/modal-payment';
import { DashBoardRoutingModule } from './components/dashboard-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const components = [DashboardComponent, ModalPaymentComponent];

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashBoardRoutingModule,

    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatTooltipModule,
    MatSortModule,
    MatProgressSpinnerModule,

    PipesModule,
    SharedModule,

    NgxMaskDirective,
    CurrencyMaskModule,
  ],
  exports: components,
  providers: [provideNgxMask()],
})
export class DashboardModule {}
