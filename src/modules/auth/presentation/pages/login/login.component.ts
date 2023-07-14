import { Component, OnInit, inject } from '@angular/core';
import { Auth, getRedirectResult } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthRepo } from 'src/modules/auth/data/repos/AuthRepo';
import { ImageIds } from 'src/modules/shared/common/SharedUtils';
import { ModalDto } from 'src/modules/shared/data/dtos/modalDto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  authRepo = inject(AuthRepo);
  route = inject(ActivatedRoute);
  router = inject(Router);

  showEmptyEmailFieldMsg: boolean = false;
  emptyEmailMsg:string = "Your email is required";
  emptyPhoneMsg: string = "Your phone number is required"
  showEmptyNameFieldMsg: boolean = false;
  showEmptyPhoneFieldMsg: boolean = false;
  showEmptyPasswordFieldMsg: boolean = false;
  notificationViewVisibility: boolean = false;

  modalData: ModalDto = {title: "Account created", btnText: "Okay", msg: "Your account has been created successfully!", icon: ImageIds.Done}

  ngOnInit(): void {
    this.isUserLoggedIn();
    this.loginForm = new FormGroup({
      'email': new FormControl("", [Validators.required, Validators.email]),
      'password': new FormControl("", [Validators.required]),
    });
  }

  private isUserLoggedIn (): void{
    this.authRepo.getCurrentUser().then(result => {
      if(!result) return;

      this.goToDashboard(1);
    }).catch(error => {
      // let the user create an account
    });
  }


  get email_fc(){
    return this.loginForm.controls["email"] as FormControl;
  }

  get password_fc(){
    return this.loginForm.controls["password"] as FormControl;
  }

  public onLoginClicked (): void{

  }

  public onSignInWithGoogleClicked (): void{
    this.authRepo.signInWithGoogleAttempt()
  }

  public onSignupWithEmailClicked (): void{
    this.clearInputFieldErrorMsgs();
    if(this.email_fc.value == ""){
      this.showEmptyEmailFieldMsg = true;
    }
    else if(this.password_fc.value == ""){
      this.showEmptyPasswordFieldMsg = true;
    }
    else if(this.email_fc.valid && this.password_fc.value != "" &&
      this.loginForm.valid){
        let email = this.email_fc.value.toString();
        let password = this.password_fc.value.toString();
        this.processLoginAttempt(email, password);
    }
    else{
      if(!this.loginForm.valid){
        if(!this.email_fc.valid){
          this.emptyEmailMsg = "Invalid email!"
          this.showEmptyEmailFieldMsg = true;
        }
      }else{
        this.modalData = {title: "An error occurred", btnText: "Try Again", msg: "An unexpected error occurred. Please try again", icon: ImageIds.Alert}
        this.showNotificationView();
      }
    }
  }

  private processLoginAttempt(email: string, password: string): void{
    this.authRepo.signInWithEmailAndPassword(email, password).then(result => {
      if(!result) return;

      this.goToDashboard(1);
    })
    .catch(error => {
      this.modalData = {title: "An error occurred", btnText: "Try Again", msg: "An unexpected error occurred. Please try again", icon: ImageIds.Alert}
      this.showNotificationView();
      this.clearForm();
    });
  }

  private goToDashboard (num: number):void{
    if(num == 1){
      this.router.navigate(['/app'], {relativeTo: this.route});
    }
  }

  private clearInputFieldErrorMsgs (): void{
    this.showEmptyEmailFieldMsg = false;
    this.showEmptyPasswordFieldMsg = false;
  }

  public hideNotificationView(): void{
    if(this.notificationViewVisibility == true){
      this.notificationViewVisibility = false;
    }
  }

  private showNotificationView(): void{
    if(!this.notificationViewVisibility){
      this.notificationViewVisibility = true;
    }
  }

  private clearForm (): void{
    this.loginForm.reset();
  }
}
