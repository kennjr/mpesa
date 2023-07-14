import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoSmallComponent } from './components/logo-small/logo-small.component';
import { LogoHeaderComponent } from './components/logo-header/logo-header.component';
import { ModalComponent } from './components/modal/modal.component';
import { OnlyNumbersDirective } from './domain/directives/only-numbers/only-numbers.directive';



@NgModule({
  declarations: [
    LogoSmallComponent,
    LogoHeaderComponent,
    ModalComponent,
    OnlyNumbersDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LogoSmallComponent,
    LogoHeaderComponent,
    ModalComponent,
    OnlyNumbersDirective
  ]
})
export class SharedModule { }
