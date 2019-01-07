import { Socket } from 'net';

import { Reporter } from './reporter';

export class GraphiteReporter extends Reporter {
  private socket: Socket = new Socket();
  private reconnecting: boolean = false;
  constructor(
    interval: number = 6000,
    private host: string = process.env.GRAPHITE_HOST || 'localhost',
    private port: string = process.env.GRAPHITE_PORT || '2003',
    private prefix: string = 'app'
  ) {
    super(interval);
  }

  public start() {
    this.socket.on('error', error => {
      if (!this.reconnecting) {
        this.reconnecting = true;
        this.emit(
          'log',
          'warn',
          `Lost connection to ${this.host}. Reconnect in 10 seconds: ${error}`
        );
        // Stop the reporter and try again in a few seconds.
        this.stop();
        setTimeout(() => {
          this.reconnecting = false;
          this.start();
        }, 10000);
      }
    });

    this.emit('log', 'verbose', `Connecting to graphite @ ${this.host}:${this.port}.`);
    this.socket.connect(
      parseInt(this.port),
      this.host,
      () => {
        this.emit(
          'log',
          'verbose',
          `Successfully connected to graphite @ ${this.host}:${this.port}.`
        );
        this.interval = setInterval(() => {
          this.report();
        }, this.reportInterval);
      }
    );
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.socket.end();
  }

  public report() {
    if (this.reconnecting) return;
    const timestamp = Date.now() / 1000;
    const metrics = this.getMetrics();

    if (metrics.gauges.length !== 0) {
      metrics.gauges.forEach(gauge => {
        this.reportGauge(gauge, timestamp);
      });
    }
    if (metrics.meters.length !== 0) {
      metrics.meters.forEach(meter => {
        this.reportMeter(meter, timestamp);
      });
    }
    if (metrics.timers.length !== 0) {
      metrics.timers.forEach(timer => {
        this.reportTimer(timer, timestamp);
      });
    }
    if (metrics.counters.length !== 0) {
      metrics.counters.forEach(counter => {
        this.reportCounter(counter, timestamp);
      });
    }
    if (metrics.histograms.length !== 0) {
      metrics.histograms.forEach(histogram => {
        this.reportHistogram(histogram, timestamp);
      });
    }
  }

  private send(name, value, timestamp) {
    if (this.reconnecting) return;
    if (value !== null && value !== undefined) {
      this.socket.write(`${this.prefix}.${name} ${value} ${timestamp}\n`);
    }
  }

  public reportGauge(gauge, timestamp) {
    if (gauge) {
      this.send(gauge.name, gauge.toJSON(), timestamp);
    }
  }

  public reportCounter(counter, timestamp) {
    if (counter) {
      this.send(counter.name, counter.toJSON(), timestamp);
    }
  }

  public reportMeter(meter, timestamp) {
    if (meter) {
      this.reportMeterMetrics(meter.name, meter.toJSON(), timestamp);
    }
  }

  public reportHistogram(histogram, timestamp) {
    if (histogram) {
      this.reportHistogramMetrics(histogram.name, histogram.toJSON(), timestamp);
    }
  }

  public reportTimer(timer, timestamp) {
    if (timer) {
      const timerObject = timer.toJSON();
      const meter = timerObject.meter;
      const histogram = timerObject.histogram;
      this.reportMeterMetrics(timer.name, meter, timestamp);
      this.reportHistogramMetrics(timer.name, histogram, timestamp);
    }
  }

  public reportMeterMetrics(name, meterObject, timestamp) {
    this.send(`${name}.count`, meterObject.count, timestamp);
    this.send(`${name}.mean_rate`, meterObject.mean, timestamp);
    this.send(`${name}.m1_rate`, meterObject['1MinuteRate'], timestamp);
    this.send(`${name}.m5_rate`, meterObject['5MinuteRate'], timestamp);
    this.send(`${name}.m15_rate`, meterObject['15MinuteRate'], timestamp);
  }

  public reportHistogramMetrics(name, histogramObject, timestamp) {
    Object.keys(histogramObject).forEach(key => {
      this.send(`${name}.${key}`, histogramObject[key], timestamp);
    });
  }
}
