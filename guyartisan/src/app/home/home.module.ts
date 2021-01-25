import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { SearchComponent } from './search/search.component';
import { BusinessesComponent } from './businesses/businesses.component';


@NgModule({
  declarations: [SearchComponent, BusinessesComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
