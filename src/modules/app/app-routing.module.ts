import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './presentation/not-found/not-found.component';
import { landingPageRoutes } from '../landing/landing-routing.module';
import { authRoutes } from '../auth/auth-routing.module';

const routes: Routes = [
  {path: "", children: landingPageRoutes},
  {path: "auth", children: authRoutes},
  {path: "**", component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
