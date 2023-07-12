import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionsDto } from 'src/modules/app/data/dtos/transactionsDto';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit, OnDestroy {

  @Input() public componentData!: TransactionsDto;
  @Output() goToHistory = new EventEmitter<number>();

  public anyDataAvailable: boolean = true;

  public isLoading: boolean = true;

  constructor(private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
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

  public openTransactionInfo(id: number): void{

  }
   
  public showTransactionHistory(): void{
    this.onGoToHistory();
  }

  private onGoToHistory (): void{
    this.goToHistory.emit(1);
  }

}
