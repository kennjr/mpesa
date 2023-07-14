import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, inject } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MyUser } from 'src/modules/app/data/dtos/transactionsDto';
import { AuthRepo } from 'src/modules/auth/data/repos/AuthRepo';
import { SharedRepo } from 'src/modules/shared/data/repos/SharedRepo';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  public showOptionsMenu: boolean = false;

  authRepo = inject(AuthRepo);
  @Input() myUserData: MyUser = {uid: "No Uid" , name: "No Name", email: "No email", phone: "No phone", location: "No location", timestamp: Timestamp.now(), balance: 0.00};

  @Output() goToFundAccount = new EventEmitter<number>();
  @Input() public userId: string = "";

  getMyUserDataSub!: Subscription;

  constructor(private sharedRepo: SharedRepo){  }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    if(this.getMyUserDataSub){
      this.getMyUserDataSub.unsubscribe();
    }
  }

  public closeDialog(): void{
    // navigate back to the prev. route, hence closing the dialog
    this.sharedRepo.navigateBack();
  }

  public onshowOptionsMenuClicked (): void{
    this.showOptionsMenu = !this.showOptionsMenu;
  }

  public onUpdateAccountClicked (): void{
    // TODO: go to update account page
  }

  public onFundAccountClicked (): void{
    this.goToFundAccount.emit(this.myUserData.balance);
  }

  public onLogoutClicked (): void{
    this.authRepo.logOutRequest();
  }

}
