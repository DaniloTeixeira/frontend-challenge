import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';

import { DashboardComponent } from './components/dashboard';
import { ModalPaymentComponent } from './components/modal-payment';
import { DashBoardRoutingModule } from './components/dashboard-routing.module';

const components = [DashboardComponent, ModalPaymentComponent];

@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    DashBoardRoutingModule,
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
  ],
  exports: [components],
})
export class DashboardModule {}
