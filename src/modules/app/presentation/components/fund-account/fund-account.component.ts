import { Location } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppRepo } from 'src/modules/app/data/repos/AppRepo';
import { TransactionsService } from 'src/modules/app/domain/services/transactions/transactions.service';
import { SharedRepo } from 'src/modules/shared/data/repos/SharedRepo';

@Component({
  selector: 'app-fund-account',
  templateUrl: './fund-account.component.html',
  styleUrls: ['./fund-account.component.css']
})
export class FundAccountComponent implements OnInit {

  fundForm!: FormGroup;

  showAmountFieldErrorMsg: boolean = false;
  showAmountFieldErrorMsgString: string = "An amount is required";

  location = inject(Location);
  appRepo = inject(AppRepo);

  @Input() userId: string = ""

  balance = 0;

  fundingObservable! :Subscription;

  constructor(private sharedRepo: SharedRepo){}

  ngOnInit(): void {
    let routeData: any = this.location.getState();
    this.balance = routeData['balance'];

    this.fundForm = new FormGroup({
      'amount': new FormControl("", [Validators.required, Validators.maxLength(6)])
    });
  }

  get amount_fc(){
    return this.fundForm.controls["amount"] as FormControl;
  }

  public onCancelClicked(): void{
    this.sharedRepo.navigateBack();
  }

  public onConfirmClicked(): void{
    this.clearInputFieldErrorMsgs();
    if(this.amount_fc.value == ""){
      this.showAmountFieldErrorMsg = true;
    }
    else if(!this.amount_fc.valid){
      this.showAmountFieldErrorMsgString = "Invalid input";
      this.showAmountFieldErrorMsg = true;
    }
    else{
      if(this.fundForm.valid){
        let amt = this.amount_fc.value.toString()
        this.processFundingRequest(parseInt(amt));
      }
    }
  }

  private processFundingRequest (amount: number): void{
    if(!Number.isNaN(amount)){
      this.fundingObservable = this.appRepo.fundAccount(amount, this.userId).subscribe({
        next: ((response: void) => {
          console.log("The response", response);
          this.sharedRepo.navigateBack();
        }),
        error: ((error: any) => {
          // this.showSnackbarMessage(error.toString());
          console.log("The error", error);
        })
      });
    }else{
      this.showAmountFieldErrorMsgString = "Invalid input";
      this.showAmountFieldErrorMsg = true;
    }
  }

  private clearInputFieldErrorMsgs (): void{
    this.showAmountFieldErrorMsg = false;
  }

  private clearForm (): void{
    this.fundForm.reset();
  }

}
