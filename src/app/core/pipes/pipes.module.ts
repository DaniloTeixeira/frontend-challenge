import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaidPipe } from './paid';

const components = [PaidPipe];

@NgModule({
  declarations: [components],
  imports: [CommonModule],
  exports: [components],
})
export class PipesModule {}
