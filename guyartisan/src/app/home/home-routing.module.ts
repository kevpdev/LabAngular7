import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageDetailBusinessComponent } from './page/page-detail-business/page-detail-business.component';
import { PageHomeComponent } from './page/page-home/page-home.component';
import { PageResultSearchComponent } from './page/page-result-search/page-result-search.component';

const routes: Routes = [

  { path: '',
  component: PageHomeComponent,
  children :   [
    {
      path: 'search/:sector/:job/:city',
      component: PageResultSearchComponent
    },
    {
      path: 'business/:id',
      component: PageDetailBusinessComponent
    },
  ]
  },
  {
    path: '**',
    component: PageHomeComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
