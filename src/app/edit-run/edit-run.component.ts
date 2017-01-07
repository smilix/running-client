import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {DatetimeInputComponent} from "../shared/datetime-input/datetime-input.component";
import {Run} from "../shared/run";
import {RunRepositoryService} from "../shared/run-repository.service";
import {Router, ActivatedRoute} from "@angular/router";
import {StopWatchComponent} from "./stop-watch/stop-watch.component";

export class RunViewModel {

  public id:number;
  
  constructor(public date:Date,
              public length:number,
              public timeUsed:number,
              public comment:string) {
  }
}

@Component({
  selector: 'app-edit-run',
  templateUrl: './edit-run.component.html',
  styleUrls: ['./edit-run.component.scss'],
  providers: [RunRepositoryService, Location, StopWatchComponent]
})
export class EditRunComponent implements OnInit {

  model:RunViewModel = new RunViewModel(new Date(), 12, 60, '');
  sending = false;
  error:string = null;
  newRunMode = false;


  constructor(private runRepository:RunRepositoryService, private route:ActivatedRoute, private router:Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (!params['id']) {
        this.newRunMode = true;

        this.runRepository.getRunById(-1).then(run => {
          this.model.length = Math.ceil(run.length / 1000);
          this.model.timeUsed = Math.ceil(run.timeUsed / 60);
        });
      } else {
        let id = +params['id']; // (+) converts string 'id' to a number
        this.runRepository.getRunById(id).then(run => {
          this.model.id = run.id;
          this.model.date = new Date(run.date * 1000);
          this.model.length = Math.ceil(run.length / 1000);
          this.model.timeUsed = Math.ceil(run.timeUsed / 60);
          this.model.comment = run.comment;
        });
      }
    }).unsubscribe();
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


  save() {
    this.sending = true;
    this.error = null;

    let self = this;
    console.log('run data:', this.model);
    let timestamp = Math.floor(this.model.date.getTime() / 1000);
    let run = new Run({
      date: timestamp,
      length: this.model.length * 1000,
      timeUsed: this.model.timeUsed * 60,
      comment: this.model.comment
    });
    var promise;
    if (this.newRunMode) {
      promise = this.runRepository.addRun(run);
    } else {
      run.id = this.model.id;
      promise = this.runRepository.updateRun(run);
    }
    promise.then(
      function ok(newRun:Run) {
        self.router.navigate(['/runs', {highlight: newRun.id}]);
      }, function error(err) {
        self.error = err;
        self.sending = false;
      });
  }

  applyTime(seconds:number) {
    this.model.timeUsed = Math.floor(seconds / 60);
  }

}
