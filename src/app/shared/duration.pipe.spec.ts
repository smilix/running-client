/* tslint:disable:no-unused-variable */

import { async, inject } from '@angular/core/testing';
import { DurationPipe } from './duration.pipe';
import {UtilsService} from "./utils.service";

describe('Pipe: Duration', () => {
  it('convert test', () => {
    let pipe = new DurationPipe(new UtilsService());

    expect(pipe.transform(1)).toBe('01');
    expect(pipe.transform(55)).toBe('55');
    expect(pipe.transform(60)).toBe('01:00');
    expect(pipe.transform(295)).toBe('04:55');
    expect(pipe.transform(3600)).toBe('01:00:00');
    expect(pipe.transform(3601)).toBe('01:00:01');
    expect(pipe.transform(3671)).toBe('01:01:11');
  });
});
