"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const measured = __importStar(require("measured-core"));
class Reporter extends events_1.EventEmitter {
    constructor(reportInterval = 6000) {
        super();
        this.reportInterval = reportInterval;
        this.interval = null;
        this.stat = measured.createCollection(null);
    }
    start() {
        this.interval = setInterval(() => {
            this.report();
        }, this.reportInterval);
    }
    stop() {
        clearInterval(this.interval);
    }
    logCount(event) {
        this.stat.counter(event).inc(1);
    }
    logDuration(event, duration) {
        this.stat.histogram(event).update(duration);
    }
    report() {
        console.log(this.getMetrics());
    }
    getMetrics() {
        let meters = [];
        let timers = [];
        let counters = [];
        let histograms = [];
        let gauges = [];
        const metrics = this.stat['_metrics'];
        Object.keys(metrics).forEach(namespace => {
            const metric = metrics[namespace];
            const className = metric.constructor.name;
            metric.name = namespace;
            if (className === 'Gauge') {
                gauges.push(metric);
            }
            else if (className === 'Timer') {
                timers.push(metric);
            }
            else if (className === 'Counter') {
                counters.push(metric);
            }
            else if (className === 'Histogram') {
                histograms.push(metric);
            }
            else if (className === 'Meter') {
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
exports.Reporter = Reporter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcmVwb3J0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsbUNBQXNDO0FBRXRDLHdEQUEwQztBQUUxQyxNQUFhLFFBQVMsU0FBUSxxQkFBWTtJQVV4QyxZQUFtQixpQkFBeUIsSUFBSTtRQUM5QyxLQUFLLEVBQUUsQ0FBQztRQURTLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBVHpDLGFBQVEsR0FBeUIsSUFBSSxDQUFDO1FBRXRDLFNBQUksR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFTOUMsQ0FBQztJQUVNLEtBQUs7UUFDVixJQUFJLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQyxHQUFHLEVBQUU7WUFDL0IsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2hCLENBQUMsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVNLElBQUk7UUFDVCxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFTSxRQUFRLENBQUMsS0FBYTtRQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVNLFdBQVcsQ0FBQyxLQUFhLEVBQUUsUUFBZ0I7UUFDaEQsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFTSxNQUFNO1FBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRU0sVUFBVTtRQUNmLElBQUksTUFBTSxHQUFVLEVBQUUsQ0FBQztRQUN2QixJQUFJLE1BQU0sR0FBVSxFQUFFLENBQUM7UUFDdkIsSUFBSSxRQUFRLEdBQVUsRUFBRSxDQUFDO1FBQ3pCLElBQUksVUFBVSxHQUFVLEVBQUUsQ0FBQztRQUMzQixJQUFJLE1BQU0sR0FBVSxFQUFFLENBQUM7UUFHdkIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN0QyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUN2QyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDbEMsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7WUFDMUMsTUFBTSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7WUFDeEIsSUFBSSxTQUFTLEtBQUssT0FBTyxFQUFFO2dCQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3JCO2lCQUFNLElBQUksU0FBUyxLQUFLLE9BQU8sRUFBRTtnQkFDaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNyQjtpQkFBTSxJQUFJLFNBQVMsS0FBSyxTQUFTLEVBQUU7Z0JBQ2xDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDdkI7aUJBQU0sSUFBSSxTQUFTLEtBQUssV0FBVyxFQUFFO2dCQUNwQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3pCO2lCQUFNLElBQUksU0FBUyxLQUFLLE9BQU8sRUFBRTtnQkFDaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNyQjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTztZQUNMLE1BQU07WUFDTixNQUFNO1lBQ04sUUFBUTtZQUNSLFVBQVU7WUFDVixNQUFNO1NBQ1AsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQXJFRCw0QkFxRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdldmVudHMnO1xuXG5pbXBvcnQgKiBhcyBtZWFzdXJlZCBmcm9tICdtZWFzdXJlZC1jb3JlJztcblxuZXhwb3J0IGNsYXNzIFJlcG9ydGVyIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgcHVibGljIGludGVydmFsOiBOb2RlSlMuVGltZW91dCB8IGFueSA9IG51bGw7XG5cbiAgcHVibGljIHN0YXQgPSBtZWFzdXJlZC5jcmVhdGVDb2xsZWN0aW9uKG51bGwpO1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIFJlcG9ydGVyLlxuICAgKiBAcGFyYW0ge251bWJlcn0gW3JlcG9ydEludGVydmFsPTYwMDBdIC0gUmVwb3J0IEludGVydmFsIGluIG1zXG4gICAqIEBtZW1iZXJvZiBSZXBvcnRlclxuICAgKi9cbiAgY29uc3RydWN0b3IocHVibGljIHJlcG9ydEludGVydmFsOiBudW1iZXIgPSA2MDAwKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGFydCgpIHtcbiAgICB0aGlzLmludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgdGhpcy5yZXBvcnQoKTtcbiAgICB9LCB0aGlzLnJlcG9ydEludGVydmFsKTtcbiAgfVxuXG4gIHB1YmxpYyBzdG9wKCkge1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XG4gIH1cblxuICBwdWJsaWMgbG9nQ291bnQoZXZlbnQ6IHN0cmluZykge1xuICAgIHRoaXMuc3RhdC5jb3VudGVyKGV2ZW50KS5pbmMoMSk7XG4gIH1cblxuICBwdWJsaWMgbG9nRHVyYXRpb24oZXZlbnQ6IHN0cmluZywgZHVyYXRpb246IG51bWJlcikge1xuICAgIHRoaXMuc3RhdC5oaXN0b2dyYW0oZXZlbnQpLnVwZGF0ZShkdXJhdGlvbik7XG4gIH1cblxuICBwdWJsaWMgcmVwb3J0KCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMuZ2V0TWV0cmljcygpKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRNZXRyaWNzKCkge1xuICAgIGxldCBtZXRlcnM6IGFueVtdID0gW107XG4gICAgbGV0IHRpbWVyczogYW55W10gPSBbXTtcbiAgICBsZXQgY291bnRlcnM6IGFueVtdID0gW107XG4gICAgbGV0IGhpc3RvZ3JhbXM6IGFueVtdID0gW107XG4gICAgbGV0IGdhdWdlczogYW55W10gPSBbXTtcblxuICAgIC8vIEZsYXR0ZW4gbWV0cmljIG5hbWUgdG8gYmUgbmFtZXNwYWNlLm5hbWUgaWYgaXQgaGFzIGEgbmFtZXNwYWNlIGFuZCBzZXBhcmF0ZSBvdXQgbWV0cmljcyBieSB0eXBlLlxuICAgIGNvbnN0IG1ldHJpY3MgPSB0aGlzLnN0YXRbJ19tZXRyaWNzJ107XG4gICAgT2JqZWN0LmtleXMobWV0cmljcykuZm9yRWFjaChuYW1lc3BhY2UgPT4ge1xuICAgICAgY29uc3QgbWV0cmljID0gbWV0cmljc1tuYW1lc3BhY2VdO1xuICAgICAgY29uc3QgY2xhc3NOYW1lID0gbWV0cmljLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgICBtZXRyaWMubmFtZSA9IG5hbWVzcGFjZTtcbiAgICAgIGlmIChjbGFzc05hbWUgPT09ICdHYXVnZScpIHtcbiAgICAgICAgZ2F1Z2VzLnB1c2gobWV0cmljKTtcbiAgICAgIH0gZWxzZSBpZiAoY2xhc3NOYW1lID09PSAnVGltZXInKSB7XG4gICAgICAgIHRpbWVycy5wdXNoKG1ldHJpYyk7XG4gICAgICB9IGVsc2UgaWYgKGNsYXNzTmFtZSA9PT0gJ0NvdW50ZXInKSB7XG4gICAgICAgIGNvdW50ZXJzLnB1c2gobWV0cmljKTtcbiAgICAgIH0gZWxzZSBpZiAoY2xhc3NOYW1lID09PSAnSGlzdG9ncmFtJykge1xuICAgICAgICBoaXN0b2dyYW1zLnB1c2gobWV0cmljKTtcbiAgICAgIH0gZWxzZSBpZiAoY2xhc3NOYW1lID09PSAnTWV0ZXInKSB7XG4gICAgICAgIG1ldGVycy5wdXNoKG1ldHJpYyk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1ldGVycyxcbiAgICAgIHRpbWVycyxcbiAgICAgIGNvdW50ZXJzLFxuICAgICAgaGlzdG9ncmFtcyxcbiAgICAgIGdhdWdlc1xuICAgIH07XG4gIH1cbn1cbiJdfQ==