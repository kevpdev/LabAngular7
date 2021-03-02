import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../login/services/auth-guard.service';
import { PageBusinessComponent } from './pages/page-business/page-business.component';
import { PageFormBusinessComponent } from './pages/page-form-business/page-form-business.component';

const routes: Routes = [
  { path: '',
  component : PageBusinessComponent,
  canActivate: [AuthGuardService]
  },
  { path: 'add',
  component: PageFormBusinessComponent,
  canActivate: [AuthGuardService],
  data: {title: 'Mon entreprise', label: 'Ajouter une entreprise'}
 },
 { path: 'edit/:id',
  component: PageFormBusinessComponent,
  canActivate: [AuthGuardService],
  data: {title: 'Mon entreprise', label: 'Editer une entreprise'}
 },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessRoutingModule { }
