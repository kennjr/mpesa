import { Component } from '@angular/core';
import { SharedRepo } from 'src/modules/shared/data/repos/SharedRepo';

@Component({
  selector: 'app-fund-account',
  templateUrl: './fund-account.component.html',
  styleUrls: ['./fund-account.component.css']
})
export class FundAccountComponent {

  constructor(private sharedRepo: SharedRepo){}

  public onCancelClicked(): void{
    this.sharedRepo.navigateBack();
  }

  public onConfirmClicked(): void{
    // process the transaction
  }


}
