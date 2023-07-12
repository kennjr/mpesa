import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponse, ResponseDto } from 'src/modules/app/data/dtos/HttpResponseDto';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private httpClient: HttpClient) { }

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
