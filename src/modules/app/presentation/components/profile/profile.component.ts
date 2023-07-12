import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedRepo } from 'src/modules/shared/data/repos/SharedRepo';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  public showOptionsMenu: boolean = false;

  @Output() goToFundAccount = new EventEmitter<number>();

  constructor(private router: Router, 
    private route: ActivatedRoute, 
    private sharedRepo: SharedRepo){}

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
    // TODO: go to update account page
    this.goToFundAccount.emit(1);
  }

  public onLogoutClicked (): void{
    // TODO: log the user out of the account
  }

}
