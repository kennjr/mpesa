import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './presentation/pages/not-found/not-found.component';
import { landingPageRoutes } from '../landing/landing-routing.module';
import { authRoutes } from '../auth/auth-routing.module';
import { DashboardComponent } from './presentation/pages/dashboard/dashboard.component';
import { HistoryComponent } from './presentation/pages/history/history.component';
import { ProfileComponent } from './presentation/components/profile/profile.component';
import { NewTransactionComponent } from './presentation/components/new-transaction/new-transaction.component';
import { TransactionInfoComponent } from './presentation/components/transaction-info/transaction-info.component';
import { FundAccountComponent } from './presentation/components/fund-account/fund-account.component';

const routes: Routes = [
  {path: "app", component: DashboardComponent, 
    children: [
      {path: "history", component: HistoryComponent},
      {path: "profile", component: ProfileComponent},
      {path: "load", component: FundAccountComponent},
      {path: "transaction", component: TransactionInfoComponent},
      {path: "transact", component: NewTransactionComponent},
    ]},
  {path: "auth", children: authRoutes},
  {path: "", children: landingPageRoutes},
  {path: "**", component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
