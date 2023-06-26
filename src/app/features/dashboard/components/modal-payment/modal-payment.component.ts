import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/core/services/notification';
import { transformDateString } from 'src/app/utils/transform-date-string';
import { transformDateToISOFormat } from 'src/app/utils/transform-date-to-ISO-format';
import { CreateOrEditPaymentPayload } from '../models/CreateOrEditPaymentPayload';
import { PaymentItem } from '../models/PaymentItem';
import { PaymentService } from '../services/payment';

@Component({
  selector: 'app-modal-payment',
  templateUrl: './modal-payment.component.html',
  styleUrls: ['./modal-payment.component.scss'],
})
export class ModalPaymentComponent implements OnInit {
  private fb = inject(FormBuilder);
  private paymentService = inject(PaymentService);
  private notification = inject(NotificationService);
  private matDialogRef =
    inject<MatDialogRef<ModalPaymentComponent>>(MatDialogRef);

  private payment?: PaymentItem;

  form = this.buildForm();

  loading = false;

  constructor(@Inject(MAT_DIALOG_DATA) data: PaymentItem) {
    this.payment = data;
  }

  get mode(): 'Alterar' | 'Adicionar' {
    return this.payment ? 'Alterar' : 'Adicionar';
  }

  ngOnInit(): void {
    if (this.mode === 'Alterar') {
      this.fillForm();
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.notification.error('Preencha todos os campos corretamente.');
      return;
    }

    if (this.mode === 'Adicionar') {
      this.createPayment();
      return;
    }

    this.editPayment();
  }

  onCloseDialog(): void {
    this.matDialogRef.close();
  }

  private buildForm() {
    return this.fb.nonNullable.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      title: ['', Validators.required],
      date: ['', Validators.required],
      value: ['', Validators.required],
    });
  }

  private fillForm(): void {
    if (!this.payment) {
      return;
    }

    this.form.patchValue({
      username: this.payment.username,
      firstName: this.payment.firstName,
      lastName: this.payment.lastName,
      title: this.payment.title,
      date: transformDateString(this.payment.date, 'dd/MM/yyyy'),
      value: String(this.payment.value),
    });
  }

  private createPaymentPayload(): CreateOrEditPaymentPayload {
    const formValue = this.form.getRawValue();

    return {
      username: formValue.username,
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      title: formValue.title,
      date: transformDateToISOFormat(formValue.date),
      value: +formValue.value,
    };
  }

  private createPayment(): void {
    const payload = this.createPaymentPayload();

    this.loading = true;

    this.paymentService
      .createPayment(payload)
      .subscribe(() => {
        this.notification.success('Pagamento adicionado com sucesso!');
        this.matDialogRef.close({ reload: true });
      })
      .add(() => {
        this.loading = false;
      });
  }

  private editPaymentPayload(): CreateOrEditPaymentPayload {
    const formValue = this.form.getRawValue();
    const _id = this.payment!._id;

    return {
      username: formValue.username,
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      title: formValue.title,
      date: transformDateToISOFormat(formValue.date, 'dd/MM/yyyy'),
      value: +formValue.value,
    };
  }

  private editPayment(): void {
    if (!this.payment) {
      return;
    }

    const payload = this.editPaymentPayload();

    this.loading = true;

    this.paymentService
      .editPayment(payload, this.payment._id)
      .subscribe(() => {
        this.notification.success('Pagamento alterado com sucesso!');
        this.matDialogRef.close({ reload: true });
      })
      .add(() => {
        this.loading = false;
      });
  }
}
