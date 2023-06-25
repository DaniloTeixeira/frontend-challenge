import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { LoaderComponent } from './components/loader';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

const components = [LoaderComponent, PageNotFoundComponent];
@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatButtonModule,

    RouterModule,
  ],
  exports: [components],
})
export class CoreModule {}
