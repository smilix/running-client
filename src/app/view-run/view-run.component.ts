import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {RunRepositoryService} from "../shared/run-repository.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Run} from "../shared/run";
import {Location} from '@angular/common';

@Component({
  selector: 'app-view-run',
  templateUrl: './view-run.component.html',
  styleUrls: ['./view-run.component.scss'],
  providers: [RunRepositoryService]
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewRunComponent implements OnInit {

  run:Run;
  showConfirm = false;

  constructor(private route:ActivatedRoute, private router:Router, private runRepository:RunRepositoryService, private location:Location) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log('ViewRunComponent: subscribe', params['id']);
      let id = +params['id']; // (+) converts string 'id' to a number

      this.runRepository.getRunById(id).then(run => this.run = run);
    }).unsubscribe();
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
