import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ModalPaymentComponent } from '../modal-payment';
import { Payment } from '../models/Payment';
import { PaymentItem } from '../models/PaymentItem';
import { PaymentService } from '../services/payment';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatMenuTrigger)
  matMenuTrigger!: MatMenuTrigger;

  @ViewChild(MatPaginator)
  matPaginator!: MatPaginator;

  private fb = inject(FormBuilder);
  private matDialog = inject(MatDialog);
  private paymentService = inject(PaymentService);

  form = this.buildForm();

  payment?: Payment;
  selectedPayment!: Payment;
  dataSource = new MatTableDataSource<PaymentItem>();

  displayedColumns: string[] = [
    'name',
    'title',
    'date',
    'value',
    'paid',
    'actions',
  ];

  page = 0;
  limit = 10;
  totalPage = 0;
  loading = false;
  showFilters = false;

  ngOnInit(): void {
    this.loadPayments();
  }

  openMenu(payment: Payment): void {
    this.matMenuTrigger.openMenu();
    this.selectedPayment = payment;
  }

  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex;
    this.limit = event.pageSize;

    this.loadPayments();
  }

  onFilterSubmit(): void {
    this.page = 0;

    if (this.matPaginator) {
      this.matPaginator.pageIndex = 0;
    }

    this.loadPayments();
  }

  toogleShowFilters(): void {
    this.showFilters = !this.showFilters;
  }

  onOpenDialog(): void {
    const data = this.selectedPayment;

    const dialogRef = this.matDialog.open(ModalPaymentComponent, {
      autoFocus: false,
      width: '500px',
      data,
    });

    dialogRef.afterClosed().subscribe((params) => {
      if (params?.reload) {
        this.loadPayments();
      }
    });
  }

  onDeletePayment(): void {}

  private buildForm() {
    return this.fb.nonNullable.group({
      filter: [''],
    });
  }

  private loadPayments(): void {
    this.loading = true;

    this.paymentService
      .getPayments()
      .subscribe((payment) => {
        this.dataSource.data = payment.items;
        this.totalPage = payment.totalPage;
      })
      .add(() => {
        this.loading = false;
      });
  }
}
