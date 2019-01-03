declare module 'measured-core' {
  interface CounterProperties {
    count: number;
  }

  interface Counter {
    toJSON(): number;

    inc(n: number);

    dec(n: number);

    reset(count: number);

    getType();
  }

  interface Histogram {
    toJSON(): HistogramData;

    update(value: number);

    reset();

    hasValues();
  }

  interface HistogramData {
    min: number;
    max: number;
    sum: number;
    variance: number;
    mean: number;
    stddev: number;
    count: number;
    median: number;
    p75: number;
    p95: number;
    p99: number;
    p999: number;
  }

  interface HistogramProperties {
    sample?: any;
  }

  interface Collection {
    register(name, metric);

    gauge(name: string, readFn: Function): any;

    counter(name: string, properties: CounterProperties): Counter;

    histogram(name: string, properties: HistogramProperties): Histogram;

    timer(name: string, properties): any;

    meter(name: string, properties): any;

    settableGauge(name: string, properties): any;

    cachedGauge(
      name: string,
      valueProducingPromiseCallback: Function,
      updateIntervalInSeconds: number
    ): any;

    toJSON(): any;

    end();
  }
  function createCollection(name: string | null): Collection;
}
