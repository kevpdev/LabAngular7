import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { PageSignupComponent } from './pages/page-signup/page-signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageResetPasswordComponent } from './pages/page-reset-password/page-reset-password.component';
import { PageConfirmSendResetPasswordComponent } from './pages/page-confirm-send-reset-password/page-confirm-send-reset-password.component';


@NgModule({
  declarations: [PageSignupComponent, PageLoginComponent, PageResetPasswordComponent, PageConfirmSendResetPasswordComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
