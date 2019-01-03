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
    report() {
        return this.stat.toJSON();
    }
}
exports.Reporter = Reporter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcmVwb3J0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsbUNBQXNDO0FBRXRDLHdEQUEwQztBQUUxQyxNQUFhLFFBQVMsU0FBUSxxQkFBWTtJQVV4QyxZQUFvQixpQkFBeUIsSUFBSTtRQUMvQyxLQUFLLEVBQUUsQ0FBQztRQURVLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBVHpDLGFBQVEsR0FBeUIsSUFBSSxDQUFDO1FBRXRDLFNBQUksR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFTL0MsQ0FBQztJQUVNLEtBQUs7UUFDVixJQUFJLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQyxHQUFHLEVBQUU7WUFDL0IsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2hCLENBQUMsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVNLElBQUk7UUFDVCxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFTSxNQUFNO1FBQ1gsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzVCLENBQUM7Q0FDRjtBQTNCRCw0QkEyQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdldmVudHMnO1xuXG5pbXBvcnQgKiBhcyBtZWFzdXJlZCBmcm9tICdtZWFzdXJlZC1jb3JlJztcblxuZXhwb3J0IGNsYXNzIFJlcG9ydGVyIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgcHJpdmF0ZSBpbnRlcnZhbDogTm9kZUpTLlRpbWVvdXQgfCBhbnkgPSBudWxsO1xuXG4gIHByaXZhdGUgc3RhdCA9IG1lYXN1cmVkLmNyZWF0ZUNvbGxlY3Rpb24obnVsbCk7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgUmVwb3J0ZXIuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbcmVwb3J0SW50ZXJ2YWw9NjAwMF0gLSBSZXBvcnQgSW50ZXJ2YWwgaW4gbXNcbiAgICogQG1lbWJlcm9mIFJlcG9ydGVyXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlcG9ydEludGVydmFsOiBudW1iZXIgPSA2MDAwKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGFydCgpIHtcbiAgICB0aGlzLmludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgdGhpcy5yZXBvcnQoKTtcbiAgICB9LCB0aGlzLnJlcG9ydEludGVydmFsKTtcbiAgfVxuXG4gIHB1YmxpYyBzdG9wKCkge1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XG4gIH1cblxuICBwdWJsaWMgcmVwb3J0KCkge1xuICAgIHJldHVybiB0aGlzLnN0YXQudG9KU09OKCk7XG4gIH1cbn1cbiJdfQ==