import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessRoutingModule } from './business-routing.module';
import { PageBusinessComponent } from './pages/page-business/page-business.component';
import { PageFormBusinessComponent } from './pages/page-form-business/page-form-business.component';
import { PageAddBusinessComponent } from './pages/page-add-business/page-add-business.component';
import { PageEditBusinessComponent } from './pages/page-edit-business/page-edit-business.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [PageBusinessComponent, PageFormBusinessComponent, PageAddBusinessComponent, PageEditBusinessComponent],
  imports: [
    CommonModule,
    BusinessRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BusinessModule { }
