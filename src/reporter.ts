import { EventEmitter } from 'events';

import * as measured from 'measured-core';

export class Reporter extends EventEmitter {
  public interval: NodeJS.Timeout | any = null;

  public stat = measured.createCollection(null);

  /**
   * Creates an instance of Reporter.
   * @param {number} [reportInterval=6000] - Report Interval in ms
   * @memberof Reporter
   */
  constructor(public reportInterval: number = 6000) {
    super();
  }

  public start() {
    this.interval = setInterval(() => {
      this.report();
    }, this.reportInterval);
  }

  public stop() {
    clearInterval(this.interval);
  }

  public logCount(event: string) {
    this.stat.counter(event).inc(1);
  }

  public logDuration(event: string, duration: number) {
    this.stat.histogram(event).update(duration);
  }

  public report() {
    console.log(this.getMetrics());
  }

  public getMetrics() {
    let meters: any[] = [];
    let timers: any[] = [];
    let counters: any[] = [];
    let histograms: any[] = [];
    let gauges: any[] = [];

    // Flatten metric name to be namespace.name if it has a namespace and separate out metrics by type.
    const metrics = this.stat['_metrics'];
    Object.keys(metrics).forEach(namespace => {
      const metric = metrics[namespace];
      const className = metric.constructor.name;
      metric.name = namespace;
      if (className === 'Gauge') {
        gauges.push(metric);
      } else if (className === 'Timer') {
        timers.push(metric);
      } else if (className === 'Counter') {
        counters.push(metric);
      } else if (className === 'Histogram') {
        histograms.push(metric);
      } else if (className === 'Meter') {
        meters.push(metric);
      }
    });
    return {
      meters,
      timers,
      counters,
      histograms,
      gauges
    };
  }
}
