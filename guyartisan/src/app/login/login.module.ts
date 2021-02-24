import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageSignupComponent } from './pages/page-signup/page-signup.component';


@NgModule({
  declarations: [PageLoginComponent, PageSignupComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
