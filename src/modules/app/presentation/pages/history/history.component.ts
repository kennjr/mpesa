import { Component, Input, OnInit, inject } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { TransactionComponentRequestFromOptions } from 'src/modules/app/common/AppUtils';
import { TransactionsDto } from 'src/modules/app/data/dtos/transactionsDto';
import { AppRepo } from 'src/modules/app/data/repos/AppRepo';
import { SharedRepo } from 'src/modules/shared/data/repos/SharedRepo';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  @Input() userEmail: string = ""
  appRepo = inject(AppRepo);
  sharedRepo = inject(SharedRepo);

  transactions!: DocumentData[];

  public componentData: TransactionsDto = {requestFrom: TransactionComponentRequestFromOptions.History, pageNumber: 1}

  ngOnInit(): void {
    this.getAllTransactions();
  }

  private getSentTransactions (){
    if(this.userEmail.trim() != ""){
      this.appRepo.getSentTransactionReceipts(this.userEmail).then(result => {
        if(!result) return;
        
        let dataList = result.docs.map(doc => { return {...doc.data(), "timestamp": doc.data()['timestamp'].seconds}});
        this.transactions = dataList
        this.sharedRepo.updateTransactionsList(dataList);
        // console.log("The result", this.transactions)
      }).catch(error => {

      });
    }
  }

  private getAllTransactions(): void{
    this.appRepo.getAllTransactionReceipts(this.userEmail).then(result => {
      if(!result) return;
      
      let dataList = result.docs.map(doc => { return {...doc.data(), "timestamp": doc.data()['timestamp'].seconds}});
      this.transactions = dataList
      this.sharedRepo.updateTransactionsList(dataList);
      // console.log("The result", this.transactions)
    }).catch(error => {

    });
  }

  private getReceivedTransactions(): void{
    this.appRepo.getReceivedTransactionReceipts(this.userEmail).then(result => {
      if(!result) return;
      
      let dataList = result.docs.map(doc => { return {...doc.data(), "timestamp": doc.data()['timestamp'].seconds}});
      this.transactions = dataList
      this.sharedRepo.updateTransactionsList(dataList);
      // console.log("The result", this.transactions)
    }).catch(error => {

    });
  }

  public filterTransactionsRequest(type: string): void{
    if(this.userEmail.trim() != ""){
      if(type == "all"){
        this.getAllTransactions();
      }else if(type == "sent"){
        this.getSentTransactions();
      }else if(type == "received"){
        this.getReceivedTransactions();
      }
    }
  }
}
