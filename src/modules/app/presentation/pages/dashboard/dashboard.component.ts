import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { DocumentData, Timestamp } from '@angular/fire/firestore';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TransactionComponentRequestFromOptions } from 'src/modules/app/common/AppUtils';
import { MyUser, TransactionsDto } from 'src/modules/app/data/dtos/transactionsDto';
import { AppRepo } from 'src/modules/app/data/repos/AppRepo';
import { AuthRepo } from 'src/modules/auth/data/repos/AuthRepo';
import { SharedRepo } from 'src/modules/shared/data/repos/SharedRepo';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  public componentData: TransactionsDto = {requestFrom: TransactionComponentRequestFromOptions.Dashboard, pageNumber: 1}

  authRepo = inject(AuthRepo);
  appRepo = inject(AppRepo);
  sharedRepo = inject(SharedRepo);
  userId: string = "";
  userEmail: string = "";

  recentTransactions!: DocumentData[];

  public showProfile: boolean = false;
  public showTransactionInfo: boolean = false;
  public showNewTransactionDialog: boolean = false;
  public showFundAccountDialog: boolean = false;

  public showTransactionHistory: boolean = false;
  public showDashboard: boolean = true;

  public showSidebar: boolean = false;

  private currentRouteSub!: Subscription;
  getMyUserDataSub!: Subscription;

  myUserData: MyUser = {uid: "No Uid" , name: "No Name", email: "", phone: "No phone", location: "No location", timestamp: Timestamp.now(), balance: 0.00};

  constructor(private route: ActivatedRoute, private router: Router){
    this.currentRouteSub = router.events.subscribe({
      next: (val) => {
        if(val instanceof NavigationEnd){
          // console.log("Current path", val.url);
          let isCurrentRouteValid = this.sharedRepo.isCurrentRouteValid(val.url);
          if(isCurrentRouteValid){
            if(val.url.includes('/profile')) {
              // hide the transaction-info and new-transaction dialogs then show the profile dialog
              this.showTransactionInfo = false;
              this.showNewTransactionDialog = false;
              this.showFundAccountDialog = false;
              this.showProfile = true;
            }
            else if(val.url.includes('/transaction')){
              // hide the profile and new-transaction dialogs then show transaction-info
              this.showNewTransactionDialog = false;
              this.showProfile = false;
              this.showFundAccountDialog = false;
              this.showTransactionInfo = true;
            }
            else if(val.url.includes('/transact')){
              // hide the profile and transaction-info dialogs then show new-transaction
              this.showProfile = false;
              this.showTransactionInfo = false;
              this.showFundAccountDialog = false;
              this.showNewTransactionDialog = true;
            }
            else if(val.url.includes('/load')){
              // hide the profile and transaction-info dialogs then show new-transaction
              this.showProfile = false;
              this.showTransactionInfo = false;
              this.showNewTransactionDialog = false;
              this.showFundAccountDialog = true;
            }
            else {
              // hide all the dialogs
              this.showNewTransactionDialog = false;
              this.showProfile = false;
              this.showFundAccountDialog = false;
              this.showTransactionInfo = false;
            }

            if(val.url == '/app/history'){
              // hide the dashboard and show the history
              this.showDashboard = false;
              this.showTransactionHistory = true;
            }
            else{
              // hide the history and show the dashboard
              this.showDashboard = true;
              this.showTransactionHistory = false;
            }
          }else{
            // if the current route isn't valid then that means that the user was redirected to the 404, so we should hide the everything
            if(val.url == "/app" || val.url == "/" || val.url == ""){
              this.showNewTransactionDialog = false;
              this.showProfile = false;
              this.showTransactionInfo = false;
            }
            // this is an exception
            else if(val.url == '/app/history/transaction'){
              this.showNewTransactionDialog = false;
              this.showProfile = false;
              this.showFundAccountDialog = false;
              this.showTransactionInfo = true;
            }
            else{
              // console.log("it isnt valid else", val.url);
              this.showNewTransactionDialog = false;
              this.showProfile = false;
              this.showTransactionInfo = false;
            }
          }
        }
      },
      error: (error) => {
        // TODO : show a msg when we get this error
      }
    });
  }

  ngOnInit(): void {
    this.authRepo.getCurrentUser().then(user => {
      if(!user) return;
      // get myUserdata

      this.userEmail = user.email;
      this.userId = user.uid;
      this.getMyUserDataSub = this.authRepo.getMyUserData(this.userId).subscribe({
        next: ((userdata: Partial<MyUser>) => {
          let uid = userdata.uid ? userdata.uid : "No Uid"
          let name = userdata.name ? userdata.name : "No Name"
          let phone = userdata.phone ? userdata.phone : "No Phone number"
          let email = userdata.email ? userdata.email : "No Email address"
          let balance = userdata.balance ? userdata.balance : 0.00
          let timestamp = userdata.timestamp ? userdata.timestamp : Timestamp.now()
          let location = userdata.location ? userdata.location : "Nairobi, Kenya"
  
  
          this.myUserData = {uid: uid , name: name, email: email, phone: phone, location: location, timestamp: timestamp, balance: balance}
          this.getRecentTransactions();
        }),
        error: ((error: any) => {
          // this.showSnackbarMessage(error.toString());
          console.log("The error", error)
        })
      });  
    }).catch(error => {
      console.log("We got an error", error)
    });
  }

  private getRecentTransactions (){
    let email = this.myUserData.email;
    if(email != null && email.trim() != ""){
      this.appRepo.getSentTransactionReceipts(email).then(result => {
        if(!result) return;
        
        let dataList = result.docs.map(doc => { return {...doc.data(), "timestamp": doc.data()['timestamp'].seconds}});
        this.recentTransactions = dataList
        this.sharedRepo.updateTransactionsList(dataList);
        // console.log("The result", this.recentTransactions)
      }).catch(error => {

      })
    }
  }

  ngOnDestroy(): void {
    if(this.currentRouteSub){
      this.currentRouteSub.unsubscribe();
    }
    if(this.getMyUserDataSub){
      this.getMyUserDataSub.unsubscribe();
    }
  }

  public closeSidebar (): void{
    this.showSidebar = false;
  }

  public toggleSidebarVisibility(): void{
    this.showSidebar = !this.showSidebar;
  }

  public goToHistory (num: number): void{
    if(num == 1){
      this.router.navigate(['/app/history'], {relativeTo: this.route});
    }
  }

  public goToDashboard (): void{
    this.router.navigate(['/app'], {relativeTo: this.route});
  }

  public goToFundAccount (balance: number):void{
    if(this.userId.trim() != ""){
      this.router.navigate(['/app/load'], {relativeTo: this.route, state: {"balance": balance}});
    }
  }

}
