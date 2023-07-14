import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../../domain/services/auth/auth.service";
import { UserCredential, user } from "@angular/fire/auth";
import { MyUser } from "src/modules/app/data/dtos/transactionsDto";


@Injectable({
    providedIn: 'root'
})
export class AuthRepo{

    constructor(
        private authService: AuthService
    ){ }

    public signInWithEmailAndPassword (email: string, password: string): Promise<UserCredential | null>{
        return this.authService.signInWithEmailAndPassword(email, password);
    }
    
    public signInWithGoogleAttempt (): void{
        return this.authService.signInWithGoogleAttempt();
    }

    public signUpWithGoogleAttempt (): Promise<void>{
        return this.authService.createAccountWithGoogleSignIn();
    }

    public createAccountWithEmail (email: string, password: string): Promise<UserCredential | null>{
        return this.authService.createAccountWithEmail(email, password);
    }

    public logOutRequest (): Promise<void>{
        return this.authService.logOutRequest();
    }

    public addUserToDatastore (user: MyUser){
        return this.authService.addUser(user);
    }

    public getCurrentUser (): Promise<any>{
        return this.authService.getCurrentUser();
    }

    public getMyUserData (userId: string): Observable<Partial<MyUser>>{
        return this.authService.getMyUserData(userId);
    }
}