import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalPaymentComponent } from './components/modal-payment/modal-payment.component';
import { DashboardComponent } from './components/dashboard';
import { DashBoardRoutingModule } from './components/dashboard-routing.module';

const components = [DashboardComponent, ModalPaymentComponent];

@NgModule({
  declarations: [components],
  imports: [CommonModule, DashBoardRoutingModule],
  exports: [components],
})
export class DashboardModule {}
