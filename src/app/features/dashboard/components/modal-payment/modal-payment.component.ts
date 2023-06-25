import { Component, Inject, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Payment } from '../models/Payment';

@Component({
  selector: 'app-modal-payment',
  templateUrl: './modal-payment.component.html',
  styleUrls: ['./modal-payment.component.scss'],
})
export class ModalPaymentComponent {
  private matDialogRef =
    inject<MatDialogRef<ModalPaymentComponent>>(MatDialogRef);

  private payment?: Payment;

  constructor(@Inject(MAT_DIALOG_DATA) data: Payment) {
    this.payment = data;
  }

  get mode(): 'Editar' | 'Adicionar' {
    return this.payment ? 'Editar' : 'Adicionar';
  }

  closeDialog(): void {
    this.matDialogRef.close();
  }
}
