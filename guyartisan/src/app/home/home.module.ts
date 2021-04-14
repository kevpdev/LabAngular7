import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { PageResultSearchComponent } from './page/page-result-search/page-result-search.component';
import { PageSearchComponent } from './page/page-search/page-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageHomeComponent } from './page/page-home/page-home.component';


@NgModule({
  declarations: [PageResultSearchComponent, PageSearchComponent, PageHomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule, 
    ReactiveFormsModule,
    FormsModule
  ]
})
export class HomeModule { }
