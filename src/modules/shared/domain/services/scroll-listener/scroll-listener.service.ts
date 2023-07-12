import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ScrollData } from 'src/modules/shared/data/dtos/ScrollData';

@Injectable({
  providedIn: 'root'
})
export class ScrollListenerService {

  scrollStatus = new BehaviorSubject<ScrollData>({ isScrolling: false, scrollTarget: 0 });

  constructor() { }

  public newScrollRequest (request: ScrollData){
    this.scrollStatus.next(request);
  }

  get scrollState (): Observable<ScrollData>{
    return this.scrollStatus.asObservable();
  }

}
