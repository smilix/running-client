import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {RunRepositoryService} from "../../shared/run-repository.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Run} from "../../shared/run";
import {Location} from '@angular/common';
import {Shoe} from "../../shared/shoe";
import {ShoeService} from "../../shared/shoe.service";

@Component({
  selector: 'app-view-run',
  templateUrl: './view-run.component.html',
  styleUrls: ['./view-run.component.scss']
})
export class ViewRunComponent implements OnInit {

  run: Run;
  shoe: Shoe;
  showConfirm = false;

  constructor(private route: ActivatedRoute, private router: Router, private runRepository: RunRepositoryService, private location: Location, private shoeService: ShoeService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = +params['id']; // (+) converts string 'id' to a number

      this.runRepository.getRunById(id).then(run => {
        this.run = run;

        this.shoeService.getShoes().then(shoes => {
          console.log(shoes);
          this.shoe = shoes.find(shoe => shoe.id === run.shoeId);
          console.log(this.shoe);
        });
      });
    });
  }

  back() {
    this.location.back();
  }

  edit() {
    this.router.navigate(['/editRun/', this.run.id]);
  }

  deleteRun() {
    this.runRepository.deleteRun(this.run.id).then(resp => {
      this.router.navigate(['/runs']);
    });
  }
}
