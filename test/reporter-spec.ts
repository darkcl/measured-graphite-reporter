import { Reporter } from '../src';

describe('Reporter', () => {
  const sut = new Reporter();
  it('should log events', () => {
    console.log(sut.report());
  });
});
