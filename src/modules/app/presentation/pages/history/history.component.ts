import { Component } from '@angular/core';
import { TransactionComponentRequestFromOptions } from 'src/modules/app/common/AppUtils';
import { TransactionsDto } from 'src/modules/app/data/dtos/transactionsDto';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {

  public componentData: TransactionsDto = {requestFrom: TransactionComponentRequestFromOptions.History, pageNumber: 1}

}
