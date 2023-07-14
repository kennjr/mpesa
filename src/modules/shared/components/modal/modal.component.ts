import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalDto } from '../../data/dtos/modalDto';
import { SharedRepo } from '../../data/repos/SharedRepo';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  @Input() public modalData: ModalDto = {title: "", btnText: "", msg: "", icon: 1}

  @Output() public isVisible: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private sharedRepo: SharedRepo){

  }
  ngOnInit(): void {
  }

  public getIcon (){
    return this.sharedRepo.getImage(this.modalData.icon);
  }

  public hideModal (){
    this.isVisible.emit(false);
  }


}
