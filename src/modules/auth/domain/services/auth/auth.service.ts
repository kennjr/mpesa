import { Injectable, inject, NgZone } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, catchError, from, map, of } from 'rxjs';
import { signInWithEmailAndPassword, GoogleAuthProvider, Auth,
   signInWithRedirect, UserCredential, createUserWithEmailAndPassword, 
   signOut, signInWithPopup } from '@angular/fire/auth';
import { Firestore, CollectionReference, doc, setDoc, Timestamp, collection, docData } from '@angular/fire/firestore';
import { MyUser } from 'src/modules/app/data/dtos/transactionsDto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  googleAuthProvider = new GoogleAuthProvider();
  firebaseAuth = inject(Auth);
  ngZone = inject(NgZone);
  router = inject(Router);

  firestore = inject(Firestore);

  constructor() {  }

  public signInWithEmailAndPassword(email: string, password: string): Promise<UserCredential | null>{
    if(email.trim().length > 0 && password.trim().length > 0){
      // TODO : validate the email
      return signInWithEmailAndPassword(this.firebaseAuth, email, password);
    }else{
      return new Promise((resolve, reject) => { 
        resolve(null); 
      });
    }
  }

  usersRef<T = MyUser>(userId: string){
    const ref = collection(this.firestore, "users");
    return doc(ref, userId);
  }

  getMyUserData(userId: string): Observable<Partial<MyUser>>{
    const usersRef = this.usersRef(userId);
    // the docData will convert the reference into an observable
    return docData(usersRef);
  }

  getCurrentUser(){
    return new Promise<any>((resolve, reject) => {
      this.firebaseAuth.onAuthStateChanged(function(user){
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      });
    });
  }

  public addUser(user: MyUser): Observable<void> {
    const ref = doc(this.firestore, 'users', user.uid);
    return from(setDoc(ref, user));
  }

  public createAccountWithEmail(email: string, password: string) :Promise<UserCredential|null>{
    if(email.trim().length > 0 && password.trim().length > 0){
      // TODO : validate the email
    return createUserWithEmailAndPassword(this.firebaseAuth, email, password);
    }else{
      return new Promise((resolve, reject) => { 
        resolve(null); 
      });
    }
  }

  // Firebase SignInWithPopup
  private async OAuthProvider(provider: GoogleAuthProvider, createAccount: boolean) {
    try {
      const res = await signInWithPopup(this.firebaseAuth, provider);
      if(createAccount){
        let user = res.user
        let myUser: MyUser = {uid: user.uid, name: user.displayName, email: user.email, phone: user.phoneNumber, location: "Kenya", timestamp: Timestamp.now(), balance: 0}
        this.addUser(myUser);
      }
      this.navigateToDashboard();
    } catch (error) {
      window.alert(error);
    }
  }
  // Firebase Google Sign-in
  async signinWithGoogle() {
    try {
      // const res = await this.OAuthProvider(this.googleAuthProvider);
      await this.OAuthProvider(this.googleAuthProvider, false);
    } catch (error) {
      console.log(error);
    }
  }

  private navigateToDashboard (){
    this.ngZone.run(() => {
      this.router.navigate(['app']);
    });
  }

  private navigateToLogin (){
    this.ngZone.run(() => {
      this.router.navigate(['login']);
    });
  }

  async createAccountWithGoogleSignIn (){
    try {
      // const res = await this.OAuthProvider(this.googleAuthProvider);
      await this.OAuthProvider(this.googleAuthProvider, true);
    } catch (error) {
      console.log(error);
    }
  }

  public signInWithGoogleAttempt(){
    this.getCurrentUser().then(result => {
      this.navigateToDashboard();
    }).catch(error => {
      // no user available, so we can make auth request
      this.signinWithGoogle();
    });
    // return signInWithRedirect(this.firebaseAuth, this.googleAuthProvider);
  }

  public async logOutRequest (): Promise<void>{
    try {
      const result = await signOut(this.firebaseAuth);
      this.navigateToLogin();
    } catch (error) { }
  }


}

// export const AuthGuardCanActivate: CanActivateFn = (
//   route: ActivatedRouteSnapshot,
//   state: RouterStateSnapshot
// ) => {
//   const authService = inject(AuthService);
//   const router = inject(Router);

//   return authService.isLoggedIn().pipe(
//     map(() => true),
//     catchError(() => {
//       router.navigate(['auth']);
//       return of(false);
//     })
//   );
// };