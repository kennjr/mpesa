import { Component, NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './presentation/pages/not-found/not-found.component';
import { landingPageRoutes } from '../landing/landing-routing.module';
import { authRoutes } from '../auth/auth-routing.module';
import { DashboardComponent } from './presentation/pages/dashboard/dashboard.component';
import { HistoryComponent } from './presentation/pages/history/history.component';
import { ProfileComponent } from './presentation/components/profile/profile.component';
import { NewTransactionComponent } from './presentation/components/new-transaction/new-transaction.component';
import { TransactionInfoComponent } from './presentation/components/transaction-info/transaction-info.component';
import { FundAccountComponent } from './presentation/components/fund-account/fund-account.component';
import { AuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { UserResolver } from '../../modules/auth/domain/resolvers/userResolver'


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo('auth');
const redirectAuthorizedToDashboard = () => redirectLoggedInTo('app');

const historyRoutes: Routes = [
  {path: "", component: HistoryComponent},
  {path: "transaction", component: TransactionInfoComponent}
]

const routes: Routes = [
  {path: "app", component: DashboardComponent, 
    children: [
      {path: "history", children: historyRoutes, },
      {path: "profile", component: ProfileComponent},
      {path: "load", component: FundAccountComponent},
      {path: "transaction", component: TransactionInfoComponent},
      {path: "transact", component: NewTransactionComponent},
    ], canActivate: [AuthGuard], data: {
      // we're gonna use an auth-guard pip to redirect the user if he's not logged in
      authGuardPipe: redirectUnauthorizedToLogin,
    }, resolve: {
      user: UserResolver
    }},
  {path: "auth", loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule)},
  {path: "", children: landingPageRoutes},
  {path: "**", component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
