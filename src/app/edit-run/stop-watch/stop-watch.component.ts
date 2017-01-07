import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {UtilsService} from "../../shared/utils.service";

@Component({
  selector: 'app-stop-watch',
  templateUrl: './stop-watch.component.html',
  styleUrls: ['./stop-watch.component.scss']
})
export class StopWatchComponent implements OnInit {

  @Output() onNewValue = new EventEmitter<number>();
  
  isPlaying = false;
  start:number;
  // in seconds
  timeUsed = 0;
  timeUsedFormatted = '';

  constructor(private utils:UtilsService) { }

  ngOnInit() {
    this.updateTime(0);
  }

  startStop() {
    this.isPlaying = !this.isPlaying;

    if (this.isPlaying) {
      this.start = Date.now();
      this.tic();
    } else {
      var timeUsed = Math.floor((Date.now() - this.start) / 1000);
      this.updateTime(timeUsed);
    }
  }

  reset() {
    this.updateTime(0);
  }

  applyValues() {
    this.onNewValue.emit(this.timeUsed);
  }

  private tic() {
    if (!this.isPlaying) {
      return;
    }
    var timeUsed = Math.floor((Date.now() - this.start) / 1000);

    this.updateTime(timeUsed);
    setTimeout(() => {
      this.tic();
    }, 1000);
  }
  
  private updateTime(seconds:number) {
    this.timeUsed = seconds;
    this.timeUsedFormatted = this.utils.formatSeconds(seconds);
  }

}
