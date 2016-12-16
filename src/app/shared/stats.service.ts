import {Injectable} from "@angular/core";
import {Run} from "./run";

export class Stat {

  public static WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;

  public totalLength:number = 0;
  public totalTimeUsed:number = 0;

  constructor(public date:string) {
  }

  get paceKm():number {
    return this.totalTimeUsed / (this.totalLength / 1000);
  }
}

@Injectable()
export class StatsService {

  public makeIntervalStats(runs:Run[], entries:number,
                           getStartInterval:(d:Date) => Date,
                           getNextInterval:(d:Date) => Date,
                           getStatLabel:(d:Date) => string):Stat[] {
    let stats = [];

    let startDate = getStartInterval(new Date());
    let runIndex = 0;
    for (let intervalCounter = 0; intervalCounter < entries; intervalCounter++) {
      let interval = new Stat(getStatLabel(startDate));
      stats.push(interval);

      for (; runIndex < runs.length; runIndex++) {
        let run = runs[runIndex];
        if (run.date * 1000 < startDate.getTime()) {
          break;
        }

        interval.totalLength += run.length;
        interval.totalTimeUsed += run.timeUsed;
      }

      startDate = getNextInterval(startDate)
    }

    return stats;
  }

}
