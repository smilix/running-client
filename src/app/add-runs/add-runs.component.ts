import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {DatetimeInputComponent} from "../shared/datetime-input/datetime-input.component";
import {Run} from "../shared/run";
import {RunRepositoryService} from "../shared/run-repository.service";
import {Router} from "@angular/router";

export class RunViewModel {

  constructor(public date:Date,
              public length:number,
              public timeUsed:number,
              public comment:string) {
  }
}

@Component({
  selector: 'app-add-runs',
  templateUrl: './add-runs.component.html',
  styleUrls: ['./add-runs.component.scss'],
  providers: [RunRepositoryService, Location]
})
export class AddRunsComponent implements OnInit {

  model:RunViewModel = new RunViewModel(new Date(), 12, 60, '');
  sending = false;
  error:string = null;


  constructor(private runRepository:RunRepositoryService, private router:Router) {
  }

  ngOnInit() {
    this.runRepository.getRunById(-1).then(run => {
      this.model.length = Math.ceil(run.length / 1000);
      this.model.timeUsed = Math.ceil(run.timeUsed / 60);
    });
  }

  decLength() {
    this.model.length--;
  }

  incLength() {
    this.model.length++;
  }

  decTimeUsed() {
    this.model.timeUsed--;
  }

  incTimeUsed() {
    this.model.timeUsed++;
  }


  newRun() {
    this.sending = true;
    this.error = null;

    let self = this;
    console.log('new run:', this.model);
    let timestamp = Math.floor(this.model.date.getTime() / 1000);
    let run = new Run({
      date: timestamp,
      length: this.model.length * 1000,
      timeUsed: this.model.timeUsed * 60,
      comment: this.model.comment
    });
    this.runRepository.addRun(run).then(
      function ok(newRun:Run) {
        self.router.navigate(['/runs', {highlight: newRun.id}]);
      }, function error(err) {
        self.error = err;
        self.sending = false;
      });
  }

}
