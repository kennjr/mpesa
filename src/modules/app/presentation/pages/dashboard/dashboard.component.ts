import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TransactionComponentRequestFromOptions } from 'src/modules/app/common/AppUtils';
import { TransactionsDto } from 'src/modules/app/data/dtos/transactionsDto';
import { SharedRepo } from 'src/modules/shared/data/repos/SharedRepo';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  public componentData: TransactionsDto = {requestFrom: TransactionComponentRequestFromOptions.Dashboard, pageNumber: 1}

  public showProfile: boolean = false;
  public showTransactionInfo: boolean = false;
  public showNewTransactionDialog: boolean = false;
  public showFundAccountDialog: boolean = false;

  public showTransactionHistory: boolean = false;
  public showDashboard: boolean = true;

  public showSidebar: boolean = false;

  private currentRouteSub!: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private sharedRepo: SharedRepo){
    this.currentRouteSub = router.events.subscribe({
      next: (val) => {
        if(val instanceof NavigationEnd){
          console.log("Current path", val.url);
          let isCurrentRouteValid = sharedRepo.isCurrentRouteValid(val.url);
          if(isCurrentRouteValid){
            console.log("Current path is valid", val.url);
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
            }else{
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
  }


  ngOnDestroy(): void {
    if(this.currentRouteSub){
      this.currentRouteSub.unsubscribe();
    }
  }

  public closeSidebar (): void{
    this.showSidebar = false;
  }

  public toggleSidebarVisibility(): void{
    this.showSidebar = !this.showSidebar;
  }

  public goToHistory (num: number):void{
    if(num == 1){
      this.router.navigate(['/app/history'], {relativeTo: this.route});
    }
  }

  public goToFundAccount (num: number):void{
    if(num == 1){
      this.router.navigate(['/app/load'], {relativeTo: this.route});
    }
  }

}
