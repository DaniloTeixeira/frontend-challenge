import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { LoaderComponent } from './components/loader';
import { HttpClientModule } from '@angular/common/http';

const components = [LoaderComponent];
@NgModule({
  declarations: [components],
  imports: [CommonModule, HttpClientModule, MatProgressSpinnerModule],
  exports: [components],
})
export class CoreModule {}
