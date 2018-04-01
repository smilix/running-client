import { Component, OnInit } from '@angular/core';
import {ShoeDetail, ShoeService} from "../shared/shoe.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from '@angular/common';

@Component({
  selector: 'app-view-shoe',
  templateUrl: './view-shoe.component.html',
  styleUrls: ['./view-shoe.component.scss']
})
export class ViewShoeComponent implements OnInit {

  shoeDetail: ShoeDetail;

  constructor(private route:ActivatedRoute, private router:Router, private shoeService:ShoeService, private location:Location) { }

  ngOnInit() {
    this.route.params.map(p => p.id).subscribe(id => {
      let intId = +id; // (+) converts string 'id' to a number

      this.shoeService.getShoeDetails(intId).then(details => this.shoeDetail = details);
    });
  }

  back() {
    this.location.back();
  }
}
