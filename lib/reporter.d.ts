/// <reference types="node" />
import { EventEmitter } from 'events';
import * as measured from 'measured-core';
export declare class Reporter extends EventEmitter {
  reportInterval: number;
  interval: NodeJS.Timeout | any;
  stat: measured.Collection;
  constructor(reportInterval?: number);
  start(): void;
  stop(): void;
  logCount(event: string): void;
  logDuration(event: string, duration: number): void;
  report(): void;
  getMetrics(): {
    meters: any[];
    timers: any[];
    counters: any[];
    histograms: any[];
    gauges: any[];
  };
}
