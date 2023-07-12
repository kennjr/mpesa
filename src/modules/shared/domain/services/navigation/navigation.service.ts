import { Location } from '@angular/common';
import { Injectable, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService implements OnDestroy {

  private history: string[] = []

  routerSubscription!: Subscription;

  constructor(
    private router: Router,
    private location: Location
  ) {
    // Listen to router events of type NavigationEnd to
    // manage an app-specific navigation history.
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects);
      }
    })
  }

  ngOnDestroy(): void {
    if(this.routerSubscription){
      this.routerSubscription.unsubscribe();
    }
  }

  /**
   * Manage back navigation.
   */
  back(): void {
    this.history.pop();

    // If the history still contains entries after popping
    // the current URL off of the stack, we can safely
    // navigate back. Otherwise we're falling back to the
    // application root.
    if (this.history.length > 0) {
      // console.log('navigating back')
      this.location.back();
    } else {
      // console.log('navigating to /')
      this.router.navigateByUrl('/');
    }
  }

  /**
   * Manage back navigation.
  */
  backAFewSteps(steps: number, path: string): void {
    this.history.pop();

    // If the history still contains entries after popping
    // the current URL off of the stack, we can safely
    // navigate back. Otherwise we're falling back to the
    // application root.
    if (this.history.length > 0) {
      // console.log('navigating back', this.history);
      // let reversed_history = this.history.reverse();
      // console.log("the reversed history", this.history);
      // let last_index_of_blogs = reversed_history.lastIndexOf(path);
      // console.log('navigating back', last_index_of_blogs);
      this.location.historyGo(-steps);
    } else {
      console.log('navigating to /', steps)
      this.router.navigateByUrl('/');
    }
  }
}
