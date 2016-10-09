import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DatetimeInputComponent),
  multi: true
};


@Component({
  selector: 'app-datetime-input',
  templateUrl: './datetime-input.component.html',
  styleUrls: ['./datetime-input.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class DatetimeInputComponent implements ControlValueAccessor {
  
  //The internal data model
  private innerDate: any = '';
  private formattedDate:string;

  @Input()
  disabled:boolean;
  @Input()
  styleClass:string;

  constructor() {
  }

  //Placeholders for the callbacks which are later providesd
  //by the Control Value Accessor
  private onTouchedCallback: () => void = () => {};
  private onChangeCallback: (_: any) => void  = (_) => {};


  //From ControlValueAccessor interface
  writeValue(value: any) {
    console.log('writeValue:', value);
    if (value !== this.innerDate) {
      this.innerDate = value;
      this.formattedDate = DatetimeInputComponent.formatDate(value);
    }
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  public set dateTimeStr(v:string) {
    if (v !== this.formattedDate) {
      this.formattedDate = v;
      this.innerDate = DatetimeInputComponent.parseDateString(v);
      console.log('onChangeCallback', this.innerDate);
      this.onChangeCallback(this.innerDate);
    }
  }

  public get dateTimeStr():string {
    return this.formattedDate;
  }

  private static formatDate(d:Date):string {
    if (d == null) {
      return null;
    }
    // "2016-07-05T16:47"
    return d.getFullYear().toString() + '-'
      + DatetimeInputComponent.zeroPadStr(d.getMonth() + 1) + '-'
      + DatetimeInputComponent.zeroPadStr(d.getDate()) + 'T'
      + DatetimeInputComponent.zeroPadStr(d.getHours()) + ':'
      + DatetimeInputComponent.zeroPadStr(d.getMinutes());
  }

  private static parseDateString(date:string): Date {
    date = date.replace('T','-');
    var parts = date.split('-');
    var timeParts = parts[3].split(':');

    // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(
      parseInt(parts[0], 10),
      parseInt(parts[1], 10) - 1, // Note: months are 0-based
      parseInt(parts[2], 10),
      parseInt(timeParts[0], 10),
      parseInt(timeParts[1], 10));

  }

  private static zeroPadStr(n:number):string {
    let str = n.toString();
    if (str.length < 2) {
      str = '0' + str;
    }
    return str;
  }
}
