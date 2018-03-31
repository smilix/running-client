import { Component, OnInit } from '@angular/core';
import {ShoeService} from "../shared/shoe.service";
import {Shoe} from "../shared/shoe";

@Component({
  selector: 'app-list-shoes',
  templateUrl: './list-shoes.component.html',
  styleUrls: ['./list-shoes.component.scss']
})
export class ListShoesComponent implements OnInit {

  shoeList: Shoe[];

  constructor(private shoeService:ShoeService) { }

  ngOnInit() {
    this.shoeService.getShoes().then(shoes => this.shoeList = shoes);
  }

}
