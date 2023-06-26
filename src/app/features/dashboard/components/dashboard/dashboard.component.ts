import {
  Component,
  inject,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/core/services/notification';
import { ModalPaymentComponent } from '../modal-payment';
import { Payment } from '../models/Payment';
import { PaymentItem } from '../models/PaymentItem';
import { PaymentListPayload } from '../models/PaymentListPayload';
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
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild(MatMenuTrigger)
  matMenuTrigger!: MatMenuTrigger;

  @ViewChild(MatPaginator)
  matPaginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  private fb = inject(FormBuilder);
  private matDialog = inject(MatDialog);
  private paymentService = inject(PaymentService);
  private notification = inject(NotificationService);

  form = this.buildForm();

  payment?: Payment;
  selectedPayment?: PaymentItem;
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
  loading = false;
  showFilters = false;
  totalPaymentsAmount = 0;

  ngOnInit(): void {
    this.setTotalPaymentsAmount();
  }

  ngAfterViewInit(): void {
    this.sortRowsByDate();
  }

  onOpenMenu(payment: PaymentItem): void {
    this.selectedPayment = payment;
  }

  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex;
    this.limit = event.pageSize;

    this.setTotalPaymentsAmount();
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

  onOpenDialog(action: 'Adicionar' | 'Alterar'): void {
    let data: PaymentItem | undefined;

    if (action === 'Alterar') {
      data = this.selectedPayment;
    } else {
      data = undefined;
    }

    const dialogRef = this.matDialog.open(ModalPaymentComponent, {
      autoFocus: false,
      width: '650px',
      data,
    });

    dialogRef.afterClosed().subscribe((params) => {
      if (params?.reload) {
        this.loadPayments();
        return;
      }
    });
  }

  onDeletePayment(): void {
    const id = this.selectedPayment?._id;

    if (!id) {
      return;
    }

    this.loading = true;

    this.paymentService
      .deletePayment(id)
      .subscribe(() => {
        this.notification.success('Pagamento excluído com sucesso!');
        this.loadPayments();
      })
      .add(() => {
        this.loading = false;
      });
  }

  private buildForm() {
    return this.fb.nonNullable.group({
      filter: [''],
    });
  }

  private sortRowsByDate(): void {
    this.dataSource.sort = this.sort;

    this.dataSource.sortingDataAccessor = (row, header) => {
      const value = row[header as keyof PaymentItem] as any;

      if (header === 'date') {
        return +new Date(value as string);
      }

      return value;
    };
  }

  private loadPaymentsPayload(): PaymentListPayload {
    const filter = this.form.controls.filter?.value;

    return {
      limit: this.limit,
      page: this.page + 1,
      filter,
    };
  }

  private loadPayments(): void {
    const payload = this.loadPaymentsPayload();

    this.paymentService
      .getPayments(payload)
      .subscribe((payment) => {
        this.dataSource.data = payment.items;

        if (!payment.items.length) {
          this.notification.error(
            'Nenhum pagamento encontrado com o filtro selecionado.'
          );
        }
      })
      .add(() => {
        this.loading = false;
      });
  }

  private setTotalPaymentsAmount(): void {
    this.loading = true;

    this.paymentService.getPayments().subscribe({
      next: (payment) => {
        this.totalPaymentsAmount = payment.items.length;
        this.loadPayments();
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
