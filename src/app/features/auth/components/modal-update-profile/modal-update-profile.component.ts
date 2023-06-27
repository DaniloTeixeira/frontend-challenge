import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/core/services/notification';
import { StorageService } from 'src/app/core/services/storage';
import { UpdateProfilePayload } from '../../models/UpdateProfilePayload';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-modal-update-profile',
  templateUrl: './modal-update-profile.component.html',
  styleUrls: ['./modal-update-profile.component.scss'],
})
export class ModalUpdateProfileComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  storageService = inject(StorageService);
  notification = inject(NotificationService);
  matDialogRef =
    inject<MatDialogRef<ModalUpdateProfileComponent>>(MatDialogRef);

  form = this.buildForm();

  avatarUrl!: string;
  selectedFile?: string;

  loading = false;

  onSubmit(): void {
    if (this.form.invalid) {
      this.notification.error('Preencha todos os campos corretamente.');
      return;
    }

    this.updateProfile();
  }

  handleFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const fileList = inputElement.files;

    this.selectedFile = fileList![0].name;

    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result as string;

        this.avatarUrl = base64String.split(',')[1];
      };

      reader.readAsDataURL(file);
    }
  }

  buildForm() {
    return this.fb.nonNullable.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      bio: ['', Validators.required],
      avatar: ['', Validators.required],
    });
  }

  onCloseDialog(): void {
    this.matDialogRef.close();
  }

  private getUpdateProfilePayload(): UpdateProfilePayload {
    const formValue = this.form.getRawValue();

    return {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      bio: formValue.bio,
      avatar: this.avatarUrl,
    };
  }

  private updateProfile(): void {
    const payload = this.getUpdateProfilePayload();

    this.loading = true;

    this.authService
      .updateProfile(payload)
      .subscribe(({ user }) => {
        const strUser = JSON.stringify(user);

        this.storageService.setItem('userInfo', strUser);

        this.matDialogRef.close({ reload: true });
      })
      .add(() => {
        this.loading = false;
      });
  }
}
