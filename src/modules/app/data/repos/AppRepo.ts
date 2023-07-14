import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TransactionsService } from "../../domain/services/transactions/transactions.service";
import { MyUser } from "../dtos/transactionsDto";
import { DocumentData, QuerySnapshot } from "@angular/fire/firestore";


@Injectable({
    providedIn: 'root'
})
export class AppRepo{

    constructor(
        private transactionService: TransactionsService,
    ){ }

    public fundAccount (amount: number, userId: string): Observable<void>{
        return this.transactionService.fundAccount(amount, userId);
    }

    public transactionRequest(amount: number, email: string, currentUserData: MyUser): Promise<void>{
        return this.transactionService.transactionRequest(amount, email, currentUserData);
    }
    
    public getReceivedTransactionReceipts(email: string): Promise<QuerySnapshot<DocumentData>>{
        return this.transactionService.getReceivedTransactionReceipts(email);
    }
    
    public getSentTransactionReceipts(email: string): Promise<QuerySnapshot<DocumentData>>{
        return this.transactionService.getSentTransactionReceipts(email);
    }
    
    public getAllTransactionReceipts(email: string): Promise<QuerySnapshot<DocumentData>>{
        return this.transactionService.getAllTransactionReceipts(email);
    }
}