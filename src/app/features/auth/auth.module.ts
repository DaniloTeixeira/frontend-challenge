import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AuthService } from './services/auth';
import { CoreModule } from 'src/app/core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './components/auth/auth.component';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LoginComponent, AuthComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,

    CoreModule,
    SharedModule,
  ],
  providers: [AuthService],
})
export class AuthModule {}
