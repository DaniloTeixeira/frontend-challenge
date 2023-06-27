import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth';
import { loggedGuard } from './core/guards/logged';
import { PageNotFoundComponent } from './features/shared/components/page-not-found';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'autenticacao/entrar',
  },
  {
    path: 'autenticacao',
    canActivate: [loggedGuard],
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
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
