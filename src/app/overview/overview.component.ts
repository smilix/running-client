import {Component, OnInit} from '@angular/core';
import {RunRepositoryService} from "../shared/run-repository.service";
import {Run} from "../shared/run";
import {DatePipe} from "@angular/common";
import {AuthService} from "../shared/auth/auth.service";
import {Stat, StatsService} from "../shared/stats.service";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  providers: [RunRepositoryService, DatePipe, StatsService]
})
export class OverviewComponent implements OnInit {

  // CONFIG

  // 1: Monday
  static readonly WEEK_BEGIN = 1;
  static readonly SHOW_LAST_ENTRIES = 6;

  // ---

  // runList:Run[];
  weekly:Stat[];
  monthly:Stat[];
  yearly:Stat[];

  constructor(private runRepository:RunRepositoryService, private datePipe:DatePipe, private statsService:StatsService) {
  }

  ngOnInit() {
    this.runRepository.getRuns(0).then(result => {
      // this.runList = result.runs;
      this.makeWeeklyStats(result.runs);
      this.makeMonthlyStats(result.runs);
      this.makeYearlyStats(result.runs);
    });
  }

  makeWeeklyStats(runs:Run[]) {
    const WEEK_FORMAT = 'dd.MM.y';
    this.weekly = this.statsService.makeIntervalStats(runs, OverviewComponent.SHOW_LAST_ENTRIES,
      (date) => {
        let weekDay = (date.getDay() - OverviewComponent.WEEK_BEGIN + 7) % 7;
        let newDay = date.getDate() - weekDay;
        return new Date(date.getFullYear(), date.getMonth(), newDay);
      },
      (date) => {
        return new Date(date.getTime() - Stat.WEEK_IN_MS);
      },
      (date) => {
        let weekEnd = new Date(date.getTime() + Stat.WEEK_IN_MS);
        return this.datePipe.transform(date, WEEK_FORMAT) +
          ' - ' + this.datePipe.transform(weekEnd, WEEK_FORMAT);
      }
    );
  }

  makeMonthlyStats(runs:Run[]) {
    this.monthly = this.statsService.makeIntervalStats(runs, OverviewComponent.SHOW_LAST_ENTRIES,
      (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1);
      },
      (date) => {
        return new Date(date.getFullYear(), date.getMonth() - 1, 1);
      },
      (date) => {
        return this.datePipe.transform(date, 'MMMM');
      }
    );
  }
  
  makeYearlyStats(runs:Run[]) {
    let lastEntry = runs[runs.length - 1];
    let yearDelta = new Date().getFullYear() - lastEntry.getDateObj().getFullYear();
    this.yearly = this.statsService.makeIntervalStats(runs, yearDelta + 1,
      (date) => {
        return new Date(date.getFullYear(), 0, 1);
      },
      (date) => {
        return new Date(date.getFullYear() - 1, 0, 1);
      },
      (date) => {
        return this.datePipe.transform(date, 'y');
      }
    );
  }
}

