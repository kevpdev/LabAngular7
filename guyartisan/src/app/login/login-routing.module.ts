import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageBusinessComponent } from '../business/pages/page-business/page-business.component';
import { PageFormBusinessComponent } from '../business/pages/page-form-business/page-form-business.component';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { PageSignupComponent } from './pages/page-signup/page-signup.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '',
    component: PageLoginComponent,
   },
   {
     path: 'signup',
     component: PageSignupComponent
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
