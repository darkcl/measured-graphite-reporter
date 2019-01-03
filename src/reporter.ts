import { EventEmitter } from 'events';

export class Reporter extends EventEmitter {
  private interval: NodeJS.Timeout;

  /**
   * Creates an instance of Reporter.
   * @param {number} [reportInterval=6000] - Report Interval in ms
   * @memberof Reporter
   */
  constructor(private reportInterval: number = 6000) {
    super();
    this.interval = setInterval(() => {
      this.report();
    }, this.reportInterval);
  }

  start() {}

  stop() {
    clearInterval(this.interval);
  }

  report() {}
}
