import { EventEmitter } from 'events';

import * as measured from 'measured-core';

export class Reporter extends EventEmitter {
  private interval: NodeJS.Timeout | any = null;

  private stat = measured.createCollection(null);

  /**
   * Creates an instance of Reporter.
   * @param {number} [reportInterval=6000] - Report Interval in ms
   * @memberof Reporter
   */
  constructor(private reportInterval: number = 6000) {
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

  public report() {
    return this.stat.toJSON();
  }
}
