import { Reporter } from '../src';

describe('Reporter', () => {
  const sut = new Reporter();
  it('should log events', () => {
    sut.logCount('a.counter');
    sut.logDuration('a.timer', 1000);
    console.log(sut.report());
  });
});
