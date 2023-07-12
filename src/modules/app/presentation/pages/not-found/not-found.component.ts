import { Component } from '@angular/core';
import { SharedRepo } from 'src/modules/shared/data/repos/SharedRepo';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent {

  constructor(private sharedRepo: SharedRepo){}

  public onGoBackClicked(): void{
    this.sharedRepo.navigateBack();
  }

  public onGoHomeClicked(): void{

  }

}
