import { Component, OnInit } from '@angular/core';
import {RunRepositoryService} from "../../shared/run-repository.service";
import {DatePipe} from "@angular/common";
import {StatsService, Stat} from "../../shared/stats.service";
import {Run} from "../../shared/run";

@Component({
  selector: 'app-month-view',
  templateUrl: './month-view.component.html',
  styleUrls: ['./month-view.component.scss'],
  providers: [RunRepositoryService, DatePipe, StatsService]
})
export class MonthViewComponent implements OnInit {

  monthly:Stat[];
  
  constructor(private runRepository:RunRepositoryService, private datePipe:DatePipe, private statsService:StatsService) {}

  ngOnInit() {
    this.runRepository.getRuns(0).then(result => {
      this.makeMonthlyStats(result.runs);
    });
  }

  makeMonthlyStats(runs:Run[]) {
    var oldestRunDate = new Date(runs[runs.length - 1].getDateObj());
    var now = new Date();
    var months = (now.getFullYear() * 12 + now.getMonth()) - (oldestRunDate.getFullYear() * 12 + oldestRunDate.getMonth());
    this.monthly = this.statsService.makeIntervalStats(runs, months,
      (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1);
      },
      (date) => {
        return new Date(date.getFullYear(), date.getMonth() - 1, 1);
      },
      (date) => {
        return this.datePipe.transform(date, 'MMMM y');
      }
    );
  }

}
