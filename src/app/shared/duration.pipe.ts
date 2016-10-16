import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  static zeroPad(n:number) {
    var s = '' + n;
    if (s.length > 1) {
      return s;
    }
    return '0' + s;
  }

  transform(seconds: any, args?: any): any {
    var minutes = Math.floor(seconds / 60); // 60
    var hours = Math.floor(minutes / 60); // 1

    var secondsPart = Math.floor(seconds % 60);
    var minutesPart = Math.floor(minutes % 60);
    var hourPart = Math.floor(hours % 60);

    var result = '';
    if (hourPart > 0) {
      result += DurationPipe.zeroPad(hourPart) + ':';
    }
    if (minutesPart > 0 || hourPart > 0) {
      result += DurationPipe.zeroPad(minutesPart) + ':';
    }
    result += DurationPipe.zeroPad(secondsPart);

    return result;
  }

}
