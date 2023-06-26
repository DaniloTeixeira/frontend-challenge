import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paid',
})
export class PaidPipe implements PipeTransform {
  transform(paid: boolean): string {
    return paid ? 'Sim' : 'Não';
  }
}
