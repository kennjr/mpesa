import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Auth, authState, user } from '@angular/fire/auth';
import { DocumentData, DocumentReference, Firestore, QueryDocumentSnapshot, QuerySnapshot, Timestamp, addDoc, collection, doc, docData, getDocs, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { ref } from '@angular/fire/storage';
import { Observable, filter, from, map, of } from 'rxjs';
import { HttpResponse, ResponseDto } from 'src/modules/app/data/dtos/HttpResponseDto';
import { MyTransaction, MyUser } from 'src/modules/app/data/dtos/transactionsDto';
import { SharedRepo } from 'src/modules/shared/data/repos/SharedRepo';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  firestore = inject(Firestore);
  auth = inject(Auth);

  sharedRepo = inject(SharedRepo);

  // this is an observable that we're gonna use to check whether the user is still logged in 
  user$ = authState(this.auth).pipe(
    filter(user => user !== null),
    map(user => user!)
  )

  // create the transactions ref that we're gonna use to get the data from the collection
  transactionsRef<T = MyTransaction>(transactionId: string){
    const ref = collection(this.firestore, "transactions");
    return doc(ref, transactionId);
  }

  usersRef<T = MyUser>(userId: string){
    const ref = collection(this.firestore, "users");
    return doc(ref, userId);
  }

  getTransaction(transactionId: string): Observable<Partial<MyTransaction>>{
    const transactionRef = this.transactionsRef(transactionId);
    // the docData will convert the reference into an observable
    return docData(transactionRef);
  }

  getMyUserData(userId: string): Observable<Partial<MyTransaction>>{
    const usersRef = this.usersRef(userId);
    // the docData will convert the reference into an observable
    return docData(usersRef);
  }

  public fundAccount(amount: number, userId: string): Observable<void> {
    if(userId.trim() != ""){
      const ref = doc(this.firestore, 'users', userId);
      return from(updateDoc(ref, {"balance": amount}));
    }else{
      return of();
    }
  }

  private async getReceiverObj (email: string): Promise<QuerySnapshot<DocumentData>>{
    const mtransactionsRef = collection(this.firestore, "users");

    // Create a query against the collection.
    const q = query(mtransactionsRef, where("email", "==", email));
    return await getDocs(q);
  }

  private async getCurrentUserSentTransactions (email: string): Promise<QuerySnapshot<DocumentData>>{
    const mtransactionsRef = collection(this.firestore, "transactions");
    console.log("Got here", email)
    // Create a query against the collection.
    const q = query(mtransactionsRef, where("senderEmail", "==", email));
    return await getDocs(q);
  }

  private async getCurrentUserReceivedTransactions (email: string): Promise<QuerySnapshot<DocumentData>>{
    const mtransactionsRef = collection(this.firestore, "transactions");

    // Create a query against the collection.
    const q = query(mtransactionsRef, where("receiverEmail", "==", email));
    return await getDocs(q);
  }

  private async getCurrentUserAllTransactions (email: string): Promise<QuerySnapshot<DocumentData>>{
    const mtransactionsRef = collection(this.firestore, "transactions");

    // Create a query against the collection.
    const q = query(mtransactionsRef, where("receiverEmail", "==", email), where("senderEmail", "==", email));
    return await getDocs(q);
  }

  public getSentTransactionReceipts (email: string): Promise<QuerySnapshot<DocumentData>>{
    let snapshot = this.getCurrentUserSentTransactions(email)
    return snapshot
  }

  public getReceivedTransactionReceipts (email: string): Promise<QuerySnapshot<DocumentData>>{
    let snapshot = this.getCurrentUserReceivedTransactions(email)
    return snapshot
  }

  public getAllTransactionReceipts (email: string): Promise<QuerySnapshot<DocumentData>>{
    let snapshot = this.getCurrentUserAllTransactions(email)
    return snapshot
  }

  public async transactionRequest(amount: number, email: string, currentUserData: MyUser): Promise<void> {
    if(email.trim() != ""){
      let snapshot = this.getReceiverObj(email);
      (await snapshot).forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        this.moveMoney(amount, currentUserData, doc);
      });
      return;
    }else{
      this.sharedRepo.navigateBack();
      return;
    }
  }

  private moveMoney (amount: number, sender: MyUser, receiver: QueryDocumentSnapshot<DocumentData>){
    let receiverEmail = receiver.get("email");
    let receiverPhone = receiver.get("phone");
    let receiverName = receiver.get("name");
    let receiverBalance = receiver.get("balance");
    let receiverUid = receiver.id;

    let senderEmail = sender.email;
    let senderPhone = sender.phone ? sender.phone : "No Phone";
    let senderName = sender.name ? sender.name : "No name";
    let senderUid = sender.uid;
    let senderBalance = sender.balance;

    let result = false;

    if(senderBalance > amount){
      result = true;
      senderBalance = sender.balance - amount;
      receiverBalance = parseInt(receiver.get("balance").toString()) + amount;
    }else{
      result = false;
    }

    let timestamp = Timestamp.now()
    let fee = 0;

    if(senderEmail){
      let transaction: MyTransaction = {
        senderBalance, 
        receiverBalance,
        receiverEmail,
        senderEmail,
        receiverName,
        senderName,
        receiverPhone,
        senderPhone,
        timestamp,
        amount,
        fee,
        result
      }

      this.executeTransaction(transaction).then(response => {
        if(!response) return;

        if(result){
          // let newReceiverBalance = parseInt(receiverBalance) + amount
          this.updateReceiverBalance(receiverUid, receiverBalance);
  
          // let newSenderBalance = senderBalance - amount
          this.updateSenderBalance(senderUid, senderBalance);
        }
        this.sharedRepo.navigateBack();
      }).catch(error => {
        this.sharedRepo.navigateBack();
      })
    }
  }

  private async executeTransaction(transaction: MyTransaction): Promise<DocumentReference<DocumentData>>{
    return await addDoc(collection(this.firestore, "transactions"), transaction);
  }

  private updateReceiverBalance (userId: string, newBalance: number){
    if(userId.trim() != ""){
      const ref = doc(this.firestore, 'users', userId);
      return from(updateDoc(ref, {"balance": newBalance}));
    }else{
      return;
    }
  }

  private updateSenderBalance (userId: string, newBalance: number){
    if(userId.trim() != ""){
      const ref = doc(this.firestore, 'users', userId);
      return from(updateDoc(ref, {"balance": newBalance}));
    }else{
      return;
    }
  }

  // fundAccount(amount: number): 

  readonly fakeObservable = new Observable<HttpResponse>(subscriber => {
    subscriber.next({code: 200, data: 'First emmision'});
    subscriber.next({code: 200, data: 'Second emmision'});
    subscriber.next({code: 200, data: 'Third emmision'});
    subscriber.next({code: 500, data: 'An artifical error'});
    setTimeout(() => {
      subscriber.next({code: 200, data: 'More fake data'});
      subscriber.complete();
    }, 3000);
  })

  public newTransaction(): Observable<any> {
    return this.fakeObservable;
    // return this.httpClient.get<any>(`https://ramanie.com/insert.php`);
  }

  public getTransactions(): Observable<any> {
    return this.fakeObservable;
    // return this.httpClient.get<any>(`https://ramanie.com/insert.php`);
  }


}
