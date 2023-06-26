import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header';

import { MatMenuModule } from '@angular/material/menu';
import { LoaderComponent } from './components/loader';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PageNotFoundComponent } from './components/page-not-found';
import { FooterComponent } from './components/footer/footer.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const components = [
  HeaderComponent,
  FooterComponent,
  LoaderComponent,
  PageNotFoundComponent,
];

@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatProgressSpinnerModule,
  ],
  exports: [components],
})
export class SharedModule {}
