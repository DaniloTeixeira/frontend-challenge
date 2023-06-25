import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';

import { DashboardComponent } from './components/dashboard';
import { CoreModule } from 'src/app/core/core.module';
import { ModalPaymentComponent } from './components/modal-payment';
import { DashBoardRoutingModule } from './components/dashboard-routing.module';

const components = [DashboardComponent, ModalPaymentComponent];

@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    DashBoardRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,

    CoreModule,
  ],
  exports: [components],
})
export class DashboardModule {}
