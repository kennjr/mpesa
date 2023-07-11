import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoSmallComponent } from './components/logo-small/logo-small.component';
import { LogoHeaderComponent } from './components/logo-header/logo-header.component';



@NgModule({
  declarations: [
    LogoSmallComponent,
    LogoHeaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LogoSmallComponent,
    LogoHeaderComponent
  ]
})
export class SharedModule { }
