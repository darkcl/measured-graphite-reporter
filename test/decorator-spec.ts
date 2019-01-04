import { LogCount, Reporter, LogDuration } from '../src';

const reporter = new Reporter();

class Foo {
  @LogCount(reporter, 'Foo.bar')
  public bar() {
    return 'bar';
  }

  @LogCount(reporter, 'Foo.baz')
  public async baz(): Promise<string> {
    return Promise.resolve('baz');
  }

  @LogDuration(reporter, 'Foo.bar1.duration')
  public bar1() {
    return 'bar1';
  }

  @LogDuration(reporter, 'Foo.baz1.duration')
  public async baz1(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      setTimeout(() => resolve('baz'), 10);
    });
  }

  @LogDuration(reporter, 'Foo.baz2.duration')
  @LogCount(reporter, 'Foo.baz2.count')
  public async baz2(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      setTimeout(() => resolve('baz'), 10);
    });
  }
}

describe('Decorator', () => {
  it('should log count', () => {
    const foo = new Foo();
    foo.bar();
  });

  it('should log async count', async () => {
    const foo = new Foo();
    await foo.baz();
  });

  it('should log duration', () => {
    const foo = new Foo();
    foo.bar1();
  });

  it('should log async duration', async () => {
    const foo = new Foo();
    await foo.baz1();
  });

  it('should log both duration and count', async () => {
    const foo = new Foo();
    await foo.baz2();
    reporter.report();
  });
});
