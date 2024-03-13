import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './pages/error/error.component';
import { AuthGuard } from './guard/auth/auth.guard';
import { TemplateComponent } from './template/template.component';

const routes: Routes = [
  {
    path: '',
    component: TemplateComponent,
    canActivate: [
      AuthGuard
    ],
    loadChildren: () => import('./pages/pages.module').then((m) => m.PagesModule)
  },
  { path: 'login',
    loadChildren: () => import('./pages/auth/auth.module').then((m) => m.AuthModule)
  },
  { path: '404', component: ErrorComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
