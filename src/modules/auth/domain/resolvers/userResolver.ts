import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { FirebaseUserModel } from '../../data/models/FirebaseUserModel';
import { AuthService } from "../../domain/services/auth/auth.service";

export const UserResolver: ResolveFn<FirebaseUserModel> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  let user = new FirebaseUserModel();

  return new Promise((resolve, reject) => {
    authService.getCurrentUser()
    .then(res => {
      if(res.providerData[0].providerId == 'password'){
        user.image = 'https://via.placeholder.com/400x300';
        user.name = res.displayName;
        user.provider = res.providerData[0].providerId;
        return resolve(user);
      }
      else{
        user.image = res.photoURL;
        user.name = res.displayName;
        user.provider = res.providerData[0].providerId;
        return resolve(user);
      }
    }, err => {
      router.navigate(['/auth']);
      return reject(err);
    })
  });
}