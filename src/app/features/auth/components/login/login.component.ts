import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../services';
import { LoginPayload } from '../../models/LoginPayload';
import { NotificationService } from 'src/app/core/services/notification';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private notification = inject(NotificationService);

  form = this.buildForm();

  showPassword = false;
  loading = false;

  ngOnInit(): void {
    if (environment.development) {
      this.fillFormWithUserCredentials();
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.notification.info('Preencha os campos corretamente');
      return;
    }

    this.login();
  }

  toggleShowPassword(): void {
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
