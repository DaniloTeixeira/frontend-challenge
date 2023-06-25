import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';

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
    path: 'dashboard',
    loadChildren: () =>
      import('./features/payments/payments.module').then(
        (m) => m.PaymentsModule
      ),
  },
  {
    path: 'pagina-nao-encontrada',
    component: PageNotFoundComponent,
  },
  {
    path: '**',
    redirectTo: 'pagina-nao-encontrada',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
