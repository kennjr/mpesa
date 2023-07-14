import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { DocumentData } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionsDto } from 'src/modules/app/data/dtos/transactionsDto';
import { SharedRepo } from 'src/modules/shared/data/repos/SharedRepo';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit, OnDestroy {

  @Input() public componentData!: TransactionsDto;
  @Input() transactions: DocumentData[] = [];
  @Input() userEmail: string = "";
  @Output() goToHistory = new EventEmitter<number>();

  @Output() filterTransactions = new EventEmitter<string>();

  public anyDataAvailable: boolean = true;
  public transactionsFilter: string = "all";

  sharedRepo = inject(SharedRepo);

  public isLoading: boolean = true;

  constructor(){}

  ngOnInit(): void {
    this.sharedRepo.getTransactionsList().subscribe({
        next: (val: DocumentData[]) => {
          if(val.length > 0){
            this.anyDataAvailable = true;
          }else{
            this.anyDataAvailable = false;
          }
          this.transactions = val;
          console.log("The data", val);
        },
        error: (error) => {
          // TODO : show a msg when we get this error
          console.log("We got an error", error);
        }
      })
    if(!this.componentData){
      // TODO : don't make a request
      this.isLoading = false;
      this.anyDataAvailable = false;
    }else{
      // make a request for the data
      setTimeout(() => {
        this.isLoading = false;
      }, 3000);
    }
  }

  ngOnDestroy(): void {
     // TODO : unsubscribe from subs
  }

  public onFilterTransactionsClicked (type: string): void{
    this.filterTransactionRequest(type);
  } 

  private filterTransactionRequest (type: string): void{
    if(type == "all" || type == "sent" || type == "received"){
      this.filterTransactions.emit(type);
      this.transactionsFilter = type;
    }
  }

  public showTransactionHistory(): void{
    this.onGoToHistory();
  }

  private onGoToHistory (): void{
    this.goToHistory.emit(1);
  }

}
