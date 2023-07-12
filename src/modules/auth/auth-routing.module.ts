import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './presentation/pages/login/login.component';
import { SignupComponent } from './presentation/pages/signup/signup.component';

export const authRoutes: Routes = [
  { path: "", component: LoginComponent },
  { path: "login", component: LoginComponent },
  { path: "signin", redirectTo: "login" },
  { path: "signup", component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(authRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
