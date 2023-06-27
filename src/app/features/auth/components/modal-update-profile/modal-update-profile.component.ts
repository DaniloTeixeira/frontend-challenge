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

  submitted = false;
  avatarUrl!: string;
  selectedFileName?: string;

  loading = false;

  get shouldShowRequiredAvatarError(): boolean {
    return this.submitted && !this.avatarUrl;
  }

  buildForm() {
    return this.fb.nonNullable.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      bio: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      this.notification.error('Preencha todos os campos corretamente.');
      return;
    }

    this.updateProfile();
  }

  fileToBase64(event: Event) {
    const inputElement = event.target as HTMLInputElement;

    const file = inputElement.files![0];

    this.selectedFileName = file?.name;

    const fileReader = new FileReader();

    fileReader.onload = () => {
      this.avatarUrl = (fileReader.result as string).split(',')[1];
    };

    fileReader.readAsDataURL(file);
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

        this.notification.success('Perfil alterado com sucesso!');

        this.storageService.setItem('userInfo', strUser);

        this.matDialogRef.close({ reload: true });
      })
      .add(() => {
        this.loading = false;
      });
  }
}
