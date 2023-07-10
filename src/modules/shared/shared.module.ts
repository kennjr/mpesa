import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoSmallComponent } from './components/logo-small/logo-small.component';



@NgModule({
  declarations: [
    LogoSmallComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LogoSmallComponent
  ]
})
export class SharedModule { }
