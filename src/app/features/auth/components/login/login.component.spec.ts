import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let usernameInput: HTMLInputElement;
  let passwordInput: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,

        MatCardModule,
        MatInputModule,
        MatSnackBarModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
      ],
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    usernameInput = fixture.nativeElement.querySelector('#username');
    passwordInput = fixture.nativeElement.querySelector('#password');
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should have username and password input fields', () => {
    expect(usernameInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
  });

  it('should validade input fields', () => {});
});
