import { Component, OnInit, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, getRedirectResult, signInWithRedirect } from '@angular/fire/auth';
import { Timestamp } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MyUser } from 'src/modules/app/data/dtos/transactionsDto';
import { AuthRepo } from 'src/modules/auth/data/repos/AuthRepo';
import { ImageIds } from 'src/modules/shared/common/SharedUtils';
import { ModalDto } from 'src/modules/shared/data/dtos/modalDto';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  // firebaseAuth = inject(Auth);
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

  authRepo = inject(AuthRepo);

  ngOnInit(): void {
    this.isUserLoggedIn();
    this.signupForm = new FormGroup({
      'name': new FormControl("", [Validators.required]),
      'email': new FormControl("", [Validators.required, Validators.email]),
      'phone': new FormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      'password': new FormControl("", [Validators.required,]),
    });
    // getRedirectResult(this.firebaseAuth).then(result => {
    //   // check whether the reult is null
    //   if(!result) return;
    //   console.log("The signup was a success", result.user.toJSON());
    // });
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
    return this.signupForm.controls["email"] as FormControl;
  }

  get name_fc(){
    return this.signupForm.controls["name"] as FormControl;
  }

  get phone_fc(){
    return this.signupForm.controls["phone"] as FormControl;
  }

  get password_fc(){
    return this.signupForm.controls["password"] as FormControl;
  }

  public onSignupWithEmailClicked (): void{
    this.clearInputFieldErrorMsgs();
    if(this.name_fc.value == ""){
      this.showEmptyNameFieldMsg = true;
    }
    else if(this.email_fc.value == ""){
      this.showEmptyEmailFieldMsg = true;
    }
    else if(this.phone_fc.value == ""){
      this.showEmptyPhoneFieldMsg = true;
    }
    else if(this.password_fc.value == ""){
      this.showEmptyPasswordFieldMsg = true;
    }
    else if(this.email_fc.valid && this.name_fc.value != "" && 
      this.password_fc.value != "" &&
      this.phone_fc.valid && this.signupForm.valid){
        let email = this.email_fc.value.toString();
        let name = this.name_fc.value.toString();
        let phone = this.phone_fc.value.toString();
        let password = this.password_fc.value.toString();
        this.processSignupAttempt(email, password, name, phone);
    }
    else{
      if(!this.signupForm.valid){
        if(!this.email_fc.valid){
          this.emptyEmailMsg = "Invalid email!"
          this.showEmptyEmailFieldMsg = true;
        }else if(!this.phone_fc.valid){
          this.emptyPhoneMsg = "Invalid phone number!"
          this.showEmptyPhoneFieldMsg = true;
        }
      }else{
        this.modalData = {title: "An error occurred", btnText: "Try Again", msg: "An unexpected error occurred. Please try again", icon: ImageIds.Alert}
        this.showNotificationView();
      }
    }
  }

  public onSignUpwithGoogleClicked (): void{
    this.authRepo.signUpWithGoogleAttempt();
  }

  private processSignupAttempt (email: string, password: string, name_str: string, phone_str: string): void{
    this.authRepo.createAccountWithEmail(email, password).then(result => {
      if(!result) return;
      let user = result.user
      let myUser: MyUser = {uid: user.uid, name: name_str, email: user.email, phone: phone_str, location: "Kenya", timestamp: Timestamp.now(), balance: 0}
      this.authRepo.addUserToDatastore(myUser);
      
      this.goToDashboard(1)
    }).catch(error => {
      this.modalData = {title: "An error occurred", btnText: "Try Again", msg: "An unexpected error occurred. Please try again", icon: ImageIds.Alert}
      this.showNotificationView();
      this.clearInputFieldErrorMsgs();
      this.clearForm();
    })
  }

  private goToDashboard (num: number):void{
    if(num == 1){
      this.router.navigate(['/app'], {relativeTo: this.route});
    }
  }

  private clearInputFieldErrorMsgs (): void{
    this.showEmptyEmailFieldMsg = false;
    this.showEmptyPasswordFieldMsg = false;
    this.showEmptyPhoneFieldMsg = false;
    this.showEmptyNameFieldMsg = false;
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
    this.signupForm.reset();
  }

}
