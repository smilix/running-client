import { Pipe, PipeTransform } from '@angular/core';
import {UtilsService} from "./utils.service";

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  constructor(private utils:UtilsService) { }

  transform(seconds: any, args?: any): any {
    if (isNaN(seconds) || typeof seconds != 'number') {
      return '-';
    }

    return this.utils.formatSeconds(seconds);
  }

}
