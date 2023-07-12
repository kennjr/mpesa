import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedRepo } from 'src/modules/shared/data/repos/SharedRepo';

@Component({
  selector: 'app-transaction-info',
  templateUrl: './transaction-info.component.html',
  styleUrls: ['./transaction-info.component.css']
})
export class TransactionInfoComponent implements OnInit, OnDestroy {

  public result: boolean = false;

  public transactionId: string = "-1";

  constructor(private sharedRepo: SharedRepo, private location: Location,
    private route: ActivatedRoute, private router: Router){
    
    
  }

  ngOnInit(): void {
    let routeData: any = this.location.getState();
    this.transactionId = routeData['id']
    console.log("The state data", routeData);
    console.log("The transactionid", this.transactionId);
  }
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  }

  public closeDialog (): void{
    this.sharedRepo.navigateBack();
  }

  public onDownloadTransactionClicked(): void{
    // TODO : created a pdf with transaction data ready for download
  }

  public onReverseTransactionClicked(): void{
    // TODO : start the reversal process
  }

}
