import {Injectable} from '@angular/core';

@Injectable()
export class UtilsService {

  constructor() {
  }

  public zeroPad(n:number):string {
    let str = n.toString();
    if (str.length < 2) {
      str = '0' + str;
    }
    return str;
  }

  public formatSeconds(seconds:number) {
    var minutes = Math.floor(seconds / 60); // 60
    var hours = Math.floor(minutes / 60); // 1
    var days = Math.floor(hours / 24);

    var secondsPart = Math.floor(seconds % 60);
    var minutesPart = Math.floor(minutes % 60);
    var hourPart = Math.floor(hours % 60);
    var dayPart = Math.floor(days % 24);

    var result = '';
    if (dayPart > 0) {
      result += dayPart + 'd ';
    }
    if (hourPart > 0) {
      result += this.zeroPad(hourPart) + ':';
    }
    if (minutesPart > 0 || hourPart > 0) {
      result += this.zeroPad(minutesPart) + ':';
    }
    result += this.zeroPad(secondsPart);

    return result;
  }
}
