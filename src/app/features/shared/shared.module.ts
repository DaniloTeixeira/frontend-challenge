import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from './components/footer/footer.component';

const components = [HeaderComponent, FooterComponent];

@NgModule({
  declarations: [components],
  imports: [CommonModule, MatToolbarModule, MatIconModule],
  exports: [components],
})
export class SharedModule {}
