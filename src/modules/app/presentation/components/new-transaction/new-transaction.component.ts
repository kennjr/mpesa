import { Component } from '@angular/core';
import { SharedRepo } from 'src/modules/shared/data/repos/SharedRepo';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.css']
})
export class NewTransactionComponent {

  constructor(private sharedRepo: SharedRepo){}

  public onCancelClicked(): void{
    this.sharedRepo.navigateBack();
  }

  public onConfirmClicked(): void{
    // process the transaction
  }

}
