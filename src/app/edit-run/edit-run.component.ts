import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {DatetimeInputComponent} from "../shared/datetime-input/datetime-input.component";
import {Run} from "../shared/run";
import {RunRepositoryService} from "../shared/run-repository.service";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {StopWatchComponent} from "./stop-watch/stop-watch.component";
import {LocalStorageService} from "ng2-webstorage";

export class RunViewModel {

  constructor(public id: number,
              public date: Date,
              public length: number,
              public timeUsed: number,
              public comment: string) {
  }
}

@Component({
  selector: 'app-edit-run',
  templateUrl: './edit-run.component.html',
  styleUrls: ['./edit-run.component.scss'],
  providers: [RunRepositoryService, Location, StopWatchComponent]
})
export class EditRunComponent implements OnInit {

  model: RunViewModel = {} as RunViewModel;
  sending = false;
  error: string = null;
  newRunMode = false;
  recoverMode = false;


  constructor(private runRepository: RunRepositoryService, private route: ActivatedRoute, private router: Router, private storage: LocalStorageService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let recover = this.storage.retrieve('recover');
      if (recover) {
        this.recoverMode = true;
        this.newRunMode = !recover.id;
        this.model = new RunViewModel(recover.id, new Date(recover.date), recover.length, recover.timeUsed, recover.comment);
        return;
      }

      this.updateFromParams(params)
    });
  }

  private updateFromParams(params: Params) {
    if (!params['id']) {
      this.newRunMode = true;

      this.runRepository.getRunById(-1).then(run => {
        this.model = new RunViewModel(null,
          new Date(),
          Math.ceil(run.length / 1000),
          Math.ceil(run.timeUsed / 60),
          '');
      });
    } else {
      let id = +params['id']; // (+) converts string 'id' to a number
      this.runRepository.getRunById(id).then(run => {
        this.model = new RunViewModel(run.id,
          new Date(run.date * 1000),
          Math.ceil(run.length / 1000),
          Math.ceil(run.timeUsed / 60),
          run.comment);
      });
    }
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

    let promise;
    if (this.newRunMode) {
      promise = this.runRepository.addRun(run);
    } else {
      run.id = this.model.id;
      promise = this.runRepository.updateRun(run);
    }

    promise.then(
      newRun => {
        if (this.recoverMode) {
          this.storage.clear('recover');
          this.recoverMode = false;
        }
        self.router.navigate(['/runs', {highlight: newRun.id}]);
      }, err => {
        console.log('Saving recover data.');
        this.storage.store('recover', this.model);
        self.error = err;
        self.sending = false;
      }
    );
  }

  dismissRecover() {
    this.storage.clear('recover');
    this.recoverMode = false;
    this.updateFromParams(this.route.snapshot.params);
  }

  applyTime(seconds: number) {
    this.model.timeUsed = Math.floor(seconds / 60);
  }

}
