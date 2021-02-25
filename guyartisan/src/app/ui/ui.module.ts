import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContainerComponent } from './container/container.component';
import { LoginModule } from '../login/login.module';
import { LoginRoutingModule } from '../login/login-routing.module';



@NgModule({
  declarations: [HeaderComponent, FooterComponent, ContainerComponent],
  exports: [HeaderComponent, FooterComponent, ContainerComponent],
  imports: [
    CommonModule,
    LoginRoutingModule
  ]
})
export class UiModule { }
