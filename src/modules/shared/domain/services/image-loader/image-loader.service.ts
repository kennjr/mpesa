import { Injectable } from '@angular/core';
import { ImageIds } from 'src/modules/shared/common/SharedUtils';

@Injectable({
  providedIn: 'root'
})
export class ImageLoaderService {

  public getImage(img_id: number): string{
    switch (img_id) {
      case ImageIds.Alert:
        return this.getAlert();
      case ImageIds.Done: 
        return this.getDone();
      case ImageIds.Error: 
        return this.getDone();
      case ImageIds.Info: 
        return this.getInfo();
      default:
        return this.getError();
    }
  }

  private getDone(): string{
    return "../../../../../assets/res/svg/done-round.svg";
  }

  private getError(): string{
    return "../../../../../assets/res/svg/error-round.svg";
  }

  private getInfo(): string{
    return "../../../../../assets/res/svg/info-round.svg";
  }

  private getAlert(): string{
    return "../../../../../assets/res/svg/alert-round.svg";
  }
}
