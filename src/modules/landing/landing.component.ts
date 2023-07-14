import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedRepo } from '../shared/data/repos/SharedRepo';
import { ScrollData } from '../shared/data/dtos/ScrollData';
import { HeaderEmmissions } from './common/LandingUtils';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit, OnDestroy {

  @ViewChild('features', { read: ElementRef }) public features!: ElementRef;
  @ViewChild('testimonials', { read: ElementRef }) public testimonials!: ElementRef;
  @ViewChild('pricing', { read: ElementRef }) public pricing!: ElementRef;
  @ViewChild('team', { read: ElementRef }) public team!: ElementRef;

  scrollStateSub!: Subscription;
  sharedRepo = inject(SharedRepo);

  ngOnInit(): void {
    this.scrollStateSub = this.sharedRepo.getScrollState().subscribe({
      next: (val: ScrollData) => {
        if(val.isScrolling == true){
          // this.scrollToSectionRequest(val.scrollTarget);
          this.sharedRepo.updateScrollingState({isScrolling: false, scrollTarget: 0});
        }
      },
      error: (error) => {
        // TODO : show a msg when we get this error
        console.log("We got an error", error);
      }
    })
  }

  ngOnDestroy(): void {
    if(this.scrollStateSub){
      this.scrollStateSub.unsubscribe();
    }
  }

  public scrollToSectionRequest(section: number): void {
    switch (section) {
      case HeaderEmmissions.Features:
          this.moveToFeatures();
        break;
      case HeaderEmmissions.Testimonials:
          this.moveToTestimonials();
        break;
      case HeaderEmmissions.Pricing:
          this.moveToPricing();
        break;
      case HeaderEmmissions.Team:
          this.moveToTeam();
        break;
      default:
        break;
    }
  }


  public moveToFeatures():void {
    this.features.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
  }
  public moveToPricing():void {
    this.features.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
  }
  public moveToTeam():void {
    this.features.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
  }
  public moveToTestimonials():void {
    this.features.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'start' });
  }


}
