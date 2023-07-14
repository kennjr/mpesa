import { Location } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeaderEmmissions } from 'src/modules/landing/common/LandingUtils';
import { ScrollData } from 'src/modules/shared/data/dtos/ScrollData';
import { SharedRepo } from 'src/modules/shared/data/repos/SharedRepo';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  route:string = "";
  locationSub!: Subscription;

  shardRepo = inject(SharedRepo);
  currentRoute = inject(ActivatedRoute);

  @Output() scrollToSection = new EventEmitter<number>();

  constructor(private router: Router, private location: Location){
    this.locationSub = router.events.subscribe(val => {
      if (location.path() != "") {
        this.route = location.path();
      } else {
        this.route = "";
      }
    });
  }

  public onFeaturesClicked (): void{
    this.navigationRequest(HeaderEmmissions.Features);
  }

  public onTestimonialsClicked (): void{
    this.navigationRequest(HeaderEmmissions.Testimonials);
  }

  public onTeamClicked (): void{
    this.navigationRequest(HeaderEmmissions.Team);
  }
  
  public onPricingClicked (): void{
    this.navigationRequest(HeaderEmmissions.Pricing);
  }

  private navigationRequest(sectionId: number): void {
    if(this.route.trim().length > 0){
      // simply navigate back home
      this.goHome();
    }else{
      // the user is at home, emit the value so that he can be scrolled to the appropriate section
      this.scrollToSection.emit(sectionId);
      let newScrollingState: ScrollData = { isScrolling: true, scrollTarget: sectionId };
      this.shardRepo.updateScrollingState(newScrollingState);
    }
  }

  private goHome (): void{
    this.router.navigate(['/'], {relativeTo: this.currentRoute});
  }


}
