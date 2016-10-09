import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {RunRepositoryService} from "../shared/run-repository.service";
import {ActivatedRoute} from "@angular/router";
import {Run} from "../shared/run";

@Component({
  selector: 'app-view-run',
  templateUrl: './view-run.component.html',
  styleUrls: ['./view-run.component.scss'],
  providers: [RunRepositoryService]
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewRunComponent implements OnInit {

  run:Run;

  constructor(private route:ActivatedRoute, private runRepository:RunRepositoryService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log('ViewRunComponent: subscribe', params['id']);
      let id = +params['id']; // (+) converts string 'id' to a number

      this.runRepository.getRunById(id).then(run => this.run = run);
    }).unsubscribe();
  }

}
