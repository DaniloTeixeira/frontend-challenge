import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  fb = inject(FormBuilder);

  form = this.buildForm();

  showPassword = false;

  ngOnInit(): void {}

  onSubmit(): void {}

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  private buildForm() {
    return this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
}
