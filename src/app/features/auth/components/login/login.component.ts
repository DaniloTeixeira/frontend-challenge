import { Router } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth';
import { LoginPayload } from '../../models/LoginPayload';
import { NotificationService } from 'src/app/core/services/notification';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private notification = inject(NotificationService);

  form = this.buildForm();

  loading = false;
  showPassword = false;
  isLocalEnvironment = location.href.includes('http://localhost');

  ngOnInit(): void {
    if (this.isLocalEnvironment) {
      this.fillFormWithUserCredentials();
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.notification.error('Preencha os campos corretamente');
      return;
    }

    this.login();
  }

  onToggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  private buildForm() {
    return this.fb.nonNullable.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  private getLoginPayload(): LoginPayload {
    const formValue = this.form.getRawValue();

    return {
      username: formValue.username,
      password: formValue.password,
    };
  }

  private login(): void {
    const payload = this.getLoginPayload();

    this.loading = true;

    this.authService
      .login(payload)
      .subscribe(() => {
        this.router.navigate(['/dashboard']);
        this.notification.success('Login efetuado com sucesso!');
      })
      .add(() => {
        this.loading = false;
      });
  }

  private fillFormWithUserCredentials(): void {
    this.form.patchValue({
      username: 'picpay-web',
      password: 'picpay@123',
    });
  }
}
