/* tslint:disable:no-unused-variable */

import { DistancePipe } from './distance.pipe';

describe('Pipe: Distance', () => {
  it('create an instance', () => {
    let pipe = new DistancePipe();
    expect(pipe).toBeTruthy();
    expect(pipe.transform(12000)).toBe('12');
    expect(pipe.transform(8500)).toBe('8,5');
    expect(pipe.transform(8050)).toBe('8,1');
    expect(pipe.transform(8040)).toBe('8');
  });
});
