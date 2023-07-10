import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing.component';

export const landingPageRoutes: Routes = [
  { path:"", component: LandingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(landingPageRoutes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
