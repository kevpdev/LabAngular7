import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContainerComponent } from './container/container.component';



@NgModule({
  declarations: [HeaderComponent, FooterComponent, ContainerComponent],
  exports: [HeaderComponent, FooterComponent, ContainerComponent],
  imports: [
    CommonModule
  ]
})
export class UiModule { }