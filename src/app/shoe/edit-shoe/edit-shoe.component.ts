import { Component, OnInit } from '@angular/core';
import {ShoeService} from "../../shared/shoe.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Shoe, ShoeDetail} from "../../shared/shoe";

export class ShoeViewModel {

  constructor(public id: number,
              public bought: Date,
              public comment:string) {}
}


@Component({
  selector: 'app-edit-shoe',
  templateUrl: './edit-shoe.component.html',
  styleUrls: ['./edit-shoe.component.scss']
})
export class EditShoeComponent implements OnInit {

  newMode = false;
  model: ShoeViewModel = {} as ShoeViewModel;
  sending = false;
  error: string = null;

  constructor(private route: ActivatedRoute, private router: Router, private shoeService:ShoeService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (!params['id']) {
        this.newMode = true;
        this.model = new ShoeViewModel(null, new Date(), '');
      } else {
        let id = +params['id']; // (+) converts string 'id' to a number
        this.shoeService.getShoeDetails(id).then(shoeDetail => {
          this.model = new ShoeViewModel(shoeDetail.shoe.id, shoeDetail.shoe.getBoughtDate(), shoeDetail.shoe.comment);
          console.log('model:', this.model);
        });
      }

    });
  }

  save() {
    this.sending = true;
    this.error = null;

    let self = this;
    console.log('shoe data:', this.model);
    let timestamp = Math.floor(this.model.bought.getTime() / 1000);
    let shoe = new Shoe({
      bought: timestamp,
      comment: this.model.comment
    });

    let promise;
    if (this.newMode) {
      promise = this.shoeService.addShoe(shoe);
    } else {
      shoe.id = this.model.id;
      promise = this.shoeService.updateShoe(shoe);
    }

    promise.then(
      newShoe => {
        self.router.navigate(['/shoes', {highlight: newShoe.id}]);
      }, err => {
        self.error = err;
        self.sending = false;
      }
    );

  }

}
