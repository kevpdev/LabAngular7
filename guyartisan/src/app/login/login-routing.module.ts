import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageFormBusinessComponent } from '../business/pages/page-form-business/page-form-business.component';
import { PageConfirmSendResetPasswordComponent } from './pages/page-confirm-send-reset-password/page-confirm-send-reset-password.component';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { PageResetPasswordComponent } from './pages/page-reset-password/page-reset-password.component';
import { PageSignupComponent } from './pages/page-signup/page-signup.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: PageLoginComponent,
  },
  {
    path: 'signin',
    component: PageLoginComponent,
  },
  {
    path: 'signup',
    component: PageSignupComponent
  },
  {
    path: 'send-reset-pwd',
    component: PageResetPasswordComponent
  },
  {
    path: 'confirm-send-reset-pwd',
    component: PageConfirmSendResetPasswordComponent
  },
  {
    path: 'business',
    component: PageFormBusinessComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
