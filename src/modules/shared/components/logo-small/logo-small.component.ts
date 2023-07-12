import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-logo-small',
  templateUrl: './logo-small.component.html',
  styleUrls: ['./logo-small.component.css']
})
export class LogoSmallComponent {

  @Output() logoClicked = new EventEmitter<boolean>();

  public onLogoClick(): void{
    this.logoClicked.emit(true);
  }

}
