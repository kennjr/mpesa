import { Injectable } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendTransactionsService {

  transactionsData = new BehaviorSubject<DocumentData[]>([]);

  constructor() { }

  public updateTransactionsList (list: DocumentData[]): void{
    this.transactionsData.next(list);
  }

  get transactionsList (): Observable<DocumentData[]>{
    return this.transactionsData.asObservable()
  }

}
