import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LandingModule } from '../landing/landing.module';
import { NotFoundComponent } from './presentation/pages/not-found/not-found.component';
import { AuthModule } from '../auth/auth.module';
import { DashboardComponent } from './presentation/pages/dashboard/dashboard.component';
import { HistoryComponent } from './presentation/pages/history/history.component';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './presentation/components/profile/profile.component';
import { NewTransactionComponent } from './presentation/components/new-transaction/new-transaction.component';
import { TransactionInfoComponent } from './presentation/components/transaction-info/transaction-info.component';
import { TransactionsComponent } from './presentation/components/transactions/transactions.component';
import { FundAccountComponent } from './presentation/components/fund-account/fund-account.component';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';        
import { getAuth, provideAuth } from '@angular/fire/auth';        
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AuthGuard } from '@angular/fire/auth-guard';
import { environment } from 'src/environments/environments';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    DashboardComponent,
    HistoryComponent,
    ProfileComponent,
    NewTransactionComponent,
    TransactionInfoComponent,
    TransactionsComponent,
    FundAccountComponent
  ],
  imports: [
    CommonModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),     
    provideFirestore(() => getFirestore()),  
    provideAuth(() => getAuth()),
    LandingModule,
    AuthModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
