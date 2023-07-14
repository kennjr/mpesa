import { Component, Input, OnInit, inject } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyUser } from 'src/modules/app/data/dtos/transactionsDto';
import { AppRepo } from 'src/modules/app/data/repos/AppRepo';
import { SharedRepo } from 'src/modules/shared/data/repos/SharedRepo';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.css']
})
export class NewTransactionComponent implements OnInit {

  newTransactionForm!: FormGroup;

  showAmountFieldErrorMsg: boolean = false;
  showAmountFieldErrorMsgString: string = "An amount is required";
  showEmailFieldErrorMsg: boolean = false;
  showEmailFieldErrorMsgString: string = "An email is required";

  @Input() myUserData: MyUser = {uid: "No Uid" , name: "No Name", email: "", phone: "No phone", location: "No location", timestamp: Timestamp.now(), balance: 0.00};
  appRepo = inject(AppRepo);

  constructor(private sharedRepo: SharedRepo){}

  ngOnInit(): void {
    this.newTransactionForm = new FormGroup({
      'amount': new FormControl("", [Validators.required, Validators.maxLength(6)]),
      'email': new FormControl("", [Validators.required, Validators.email])
    });
  }

  get amount_fc(){
    return this.newTransactionForm.controls["amount"] as FormControl;
  }

  get email_fc(){
    return this.newTransactionForm.controls["email"] as FormControl;
  }


  public onCancelClicked(): void{
    this.sharedRepo.navigateBack();
  }

  public onConfirmClicked(): void{
    this.clearInputFieldErrorMsgs();
    if(this.amount_fc.value == ""){
      this.showAmountFieldErrorMsgString = "An amount is required";
      this.showAmountFieldErrorMsg = true;
    }
    else if(this.email_fc.value == ""){
      this.showEmailFieldErrorMsgString = "An email is required";
      this.showEmailFieldErrorMsg = true;
    }
    else if(!this.amount_fc.valid){
      this.showAmountFieldErrorMsgString = "Invalid input";
      this.showAmountFieldErrorMsg = true;
    }
    else if(!this.email_fc.valid){
      this.showEmailFieldErrorMsgString = "Invalid input";
      this.showEmailFieldErrorMsg = true;
    }
    else{
      if(this.newTransactionForm.valid){
        let amt = this.amount_fc.value.toString();
        let email = this.email_fc.value.toString();
        this.processTransactionRequest(parseInt(amt), email);
      }
    }
  }

  private processTransactionRequest (amount: number, email: string): void{
    if(!Number.isNaN(amount)){
      this.appRepo.transactionRequest(amount, email, this.myUserData).then(result => {
        console.log("The response", result);
        // this.sharedRepo.navigateBack();
      }).catch(error => {

      });
    }else{
      this.showAmountFieldErrorMsgString = "Invalid input";
      this.showAmountFieldErrorMsg = true;
    }
  }

  private clearInputFieldErrorMsgs (): void{
    this.showAmountFieldErrorMsg = false;
    this.showEmailFieldErrorMsg = false;
  }


}
