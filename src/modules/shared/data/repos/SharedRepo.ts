import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RouterHelperService } from "../../domain/services/router-helper/router-helper.service";
import { NavigationService } from "../../domain/services/navigation/navigation.service";
import { ScrollListenerService } from "../../domain/services/scroll-listener/scroll-listener.service";
import { ScrollData } from "../dtos/ScrollData";
import { ImageLoaderService } from "../../domain/services/image-loader/image-loader.service";
import { SendTransactionsService } from "../../domain/services/send-transactions/send-transactions.service";
import { DocumentData } from "@angular/fire/firestore";


@Injectable({
    providedIn: 'root'
})
export class SharedRepo{

    constructor(
        private routeHelperService: RouterHelperService,
        private navService: NavigationService,
        private scrollListenerService: ScrollListenerService,
        private imageLoaderService :ImageLoaderService,
        private sendTransactionsService: SendTransactionsService
    ){ }

    public updateTransactionsList (list: DocumentData[]): void{
        return this.sendTransactionsService.updateTransactionsList(list);
    }

    public getTransactionsList (): Observable<DocumentData[]>{
        return this.sendTransactionsService.transactionsList;
    }

    public isCurrentRouteValid(route: string|undefined): boolean{
        if(route == "" || route == "/"){
            return this.routeHelperService.isRouteValid();
        }else{
            return this.routeHelperService.isRouteValid(route);
        }
    }

    public updateScrollingState (newState: ScrollData): void{
        return this.scrollListenerService.newScrollRequest(newState);
    }

    public getScrollState(): Observable<ScrollData>{
        return this.scrollListenerService.scrollState;
    }

    public navigateBack(): void{
        return this.navService.back();
    }

    public getImage(img_id: number): string{
        return this.imageLoaderService.getImage(img_id);
    }
}