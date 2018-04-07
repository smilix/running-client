import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ShoeService} from "../../../shared/shoe.service";
import {ShoeDetail} from "../../../shared/shoe";

@Component({
  selector: 'app-shoe-dropdown',
  templateUrl: './shoe-dropdown.component.html',
  styleUrls: ['./shoe-dropdown.component.scss']
})
export class ShoeDropdownComponent implements OnInit {

  @Input()
  shoeId:number;
  @Output()
  shoeIdChange = new EventEmitter<number>();

  @Input()
  styleClass:string;
  @Input()
  disabled:boolean;

  shoeList: ShoeDetail[];

  public set shoeIdStr(v:string) {
    this.shoeId = +v; // convert to number
  }

  public get shoeIdStr():string {
    return '' + this.shoeId;
  }

  constructor(private shoeService:ShoeService) { }

  ngOnInit() {
    this.shoeService.getShoes().then(shoeList => this.shoeList = shoeList);
  }

  valueChange() {
    this.shoeIdChange.emit(this.shoeId);
  }

}
