import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageResultSearchComponent } from './page/page-result-search/page-result-search.component';
import { PageSearchComponent } from './page/page-search/page-search.component';

const routes: Routes = [
  { path: '',
  component: PageSearchComponent,
  },
  {
    path: 'search/:sector/:job/:city',
    component: PageResultSearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
