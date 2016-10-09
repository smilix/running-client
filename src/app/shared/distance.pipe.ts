import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'distance'
})
export class DistancePipe implements PipeTransform {

  transform(value: number, args?: any): string {
    let m100 = Math.round(value / 100);
    let km = Math.floor(m100 / 10);
    let partial = m100 % 10;

    if (partial === 0) {
      return '' + km;
    }
    return km + ',' + partial;
  }

}
