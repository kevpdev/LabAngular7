import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { PublicComponent } from './public/public.component';


@NgModule({
  declarations: [PublicComponent],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
