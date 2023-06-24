import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'autenticacao/entrar',
  },
  {
    path: 'autenticacao',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'pagamentos',
    loadChildren: () =>
      import('./features/payments/payments.module').then(
        (m) => m.PaymentsModule
      ),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'pagamentos',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
