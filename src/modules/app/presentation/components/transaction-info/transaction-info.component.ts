import { Location } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { Timestamp } from '@angular/fire/firestore';
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
  public wasMoneySent: boolean = true;

  @Input() userEmail: string = ""

  public transaction!: DocumentData;
  timestamp!: number;

  constructor(private sharedRepo: SharedRepo, private location: Location){ }

  ngOnInit(): void {
    let routeData: any = this.location.getState();
    this.transaction = routeData['transaction'];
    let t = this.transaction['timestamp'] as Timestamp
    this.timestamp = t.seconds
    if(this.userEmail != ""){
      let senderEmail = this.transaction['senderEmail'];

      if(senderEmail == this.userEmail){
        this.wasMoneySent = true;
      }else{
        this.wasMoneySent = false;
      }
    }else{
      // this.sharedRepo.navigateBack();
    }
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
