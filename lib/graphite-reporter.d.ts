import { Reporter } from './reporter';
export declare class GraphiteReporter extends Reporter {
  private host;
  private port;
  private prefix;
  private socket;
  private reconnecting;
  constructor(interval?: number, host?: string, port?: string, prefix?: string);
  start(): void;
  stop(): void;
  report(): void;
  private send;
  reportGauge(gauge: any, timestamp: any): void;
  reportCounter(counter: any, timestamp: any): void;
  reportMeter(meter: any, timestamp: any): void;
  reportHistogram(histogram: any, timestamp: any): void;
  reportTimer(timer: any, timestamp: any): void;
  reportMeterMetrics(name: any, meterObject: any, timestamp: any): void;
  reportHistogramMetrics(name: any, histogramObject: any, timestamp: any): void;
}
