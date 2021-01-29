import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageAddBusinessComponent } from './pages/page-add-business/page-add-business.component';
import { PageBusinessComponent } from './pages/page-business/page-business.component';
import { PageEditBusinessComponent } from './pages/page-edit-business/page-edit-business.component';

const routes: Routes = [
  { path: '',
  component : PageBusinessComponent,

  },
  { path: 'add',
  component: PageAddBusinessComponent,
  data: {title: 'Prestations', label: 'Ajouter une prestation'}
 },
 { path: 'edit/:id',
  component: PageEditBusinessComponent,
  data: {title: 'Prestations', label: 'Editer une prestation'}
 },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessRoutingModule { }
