/// <reference types="node" />
import { EventEmitter } from 'events';
export declare class Reporter extends EventEmitter {
  private reportInterval;
  private interval;
  private stat;
  constructor(reportInterval?: number);
  start(): void;
  stop(): void;
  report(): any;
}
