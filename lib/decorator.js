"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function isAsync(fn) {
    return fn.constructor.name === 'AsyncFunction';
}
function processFunction(oldFunc, descriptor, startFunction, endFunction) {
    if (isAsync(oldFunc)) {
        descriptor.value = function () {
            return __awaiter(this, arguments, void 0, function* () {
                startFunction();
                const startTime = new Date();
                const result = yield oldFunc.apply(this, arguments);
                const endTime = new Date();
                const duration = endTime.getTime() - startTime.getTime();
                endFunction(duration);
                return result;
            });
        };
    }
    else {
        descriptor.value = function () {
            startFunction();
            const startTime = new Date();
            const result = oldFunc.apply(this, arguments);
            const endTime = new Date();
            const duration = endTime.getTime() - startTime.getTime();
            endFunction(duration);
            return result;
        };
    }
}
function LogCount(reporter, event) {
    return function (target, propertyKey, descriptor) {
        const oldFunc = descriptor.value;
        if (oldFunc) {
            processFunction(oldFunc, descriptor, () => {
                reporter.logCount(event);
            }, duration => { });
        }
    };
}
exports.LogCount = LogCount;
function LogDuration(reporter, event) {
    return function (target, propertyKey, descriptor) {
        const oldFunc = descriptor.value;
        if (oldFunc) {
            processFunction(oldFunc, descriptor, () => { }, duration => {
                reporter.logDuration(event, duration);
            });
        }
    };
}
exports.LogDuration = LogDuration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2RlY29yYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBRUEsU0FBUyxPQUFPLENBQUMsRUFBTztJQUN0QixPQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxLQUFLLGVBQWUsQ0FBQztBQUNqRCxDQUFDO0FBRUQsU0FBUyxlQUFlLENBQ3RCLE9BQVksRUFDWixVQUE4QixFQUM5QixhQUF5QixFQUN6QixXQUF1QztJQUV2QyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUNwQixVQUFVLENBQUMsS0FBSyxHQUFHOztnQkFDakIsYUFBYSxFQUFFLENBQUM7Z0JBQ2hCLE1BQU0sU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7Z0JBQzdCLE1BQU0sTUFBTSxHQUFHLE1BQU0sT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7Z0JBQ3BELE1BQU0sT0FBTyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7Z0JBQzNCLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxPQUFPLEVBQUUsR0FBRyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ3pELFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDdEIsT0FBTyxNQUFNLENBQUM7WUFDaEIsQ0FBQztTQUFBLENBQUM7S0FDSDtTQUFNO1FBQ0wsVUFBVSxDQUFDLEtBQUssR0FBRztZQUNqQixhQUFhLEVBQUUsQ0FBQztZQUNoQixNQUFNLFNBQVMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1lBQzdCLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQzlDLE1BQU0sT0FBTyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7WUFDM0IsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUN6RCxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdEIsT0FBTyxNQUFNLENBQUM7UUFDaEIsQ0FBQyxDQUFDO0tBQ0g7QUFDSCxDQUFDO0FBRUQsU0FBZ0IsUUFBUSxDQUFDLFFBQWtCLEVBQUUsS0FBYTtJQUN4RCxPQUFPLFVBQVMsTUFBVyxFQUFFLFdBQW1CLEVBQUUsVUFBOEI7UUFDOUUsTUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztRQUNqQyxJQUFJLE9BQU8sRUFBRTtZQUNYLGVBQWUsQ0FDYixPQUFPLEVBQ1AsVUFBVSxFQUNWLEdBQUcsRUFBRTtnQkFDSCxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzNCLENBQUMsRUFDRCxRQUFRLENBQUMsRUFBRSxHQUFFLENBQUMsQ0FDZixDQUFDO1NBQ0g7SUFDSCxDQUFDLENBQUM7QUFDSixDQUFDO0FBZEQsNEJBY0M7QUFFRCxTQUFnQixXQUFXLENBQUMsUUFBa0IsRUFBRSxLQUFhO0lBQzNELE9BQU8sVUFBUyxNQUFXLEVBQUUsV0FBbUIsRUFBRSxVQUE4QjtRQUM5RSxNQUFNLE9BQU8sR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDO1FBQ2pDLElBQUksT0FBTyxFQUFFO1lBQ1gsZUFBZSxDQUNiLE9BQU8sRUFDUCxVQUFVLEVBQ1YsR0FBRyxFQUFFLEdBQUUsQ0FBQyxFQUNSLFFBQVEsQ0FBQyxFQUFFO2dCQUNULFFBQVEsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3hDLENBQUMsQ0FDRixDQUFDO1NBQ0g7SUFDSCxDQUFDLENBQUM7QUFDSixDQUFDO0FBZEQsa0NBY0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXBvcnRlciB9IGZyb20gJy4vcmVwb3J0ZXInO1xuXG5mdW5jdGlvbiBpc0FzeW5jKGZuOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIGZuLmNvbnN0cnVjdG9yLm5hbWUgPT09ICdBc3luY0Z1bmN0aW9uJztcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc0Z1bmN0aW9uKFxuICBvbGRGdW5jOiBhbnksXG4gIGRlc2NyaXB0b3I6IFByb3BlcnR5RGVzY3JpcHRvcixcbiAgc3RhcnRGdW5jdGlvbjogKCkgPT4gdm9pZCxcbiAgZW5kRnVuY3Rpb246IChkdXJhdGlvbjogbnVtYmVyKSA9PiB2b2lkXG4pIHtcbiAgaWYgKGlzQXN5bmMob2xkRnVuYykpIHtcbiAgICBkZXNjcmlwdG9yLnZhbHVlID0gYXN5bmMgZnVuY3Rpb24oKSB7XG4gICAgICBzdGFydEZ1bmN0aW9uKCk7XG4gICAgICBjb25zdCBzdGFydFRpbWUgPSBuZXcgRGF0ZSgpO1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgb2xkRnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgY29uc3QgZW5kVGltZSA9IG5ldyBEYXRlKCk7XG4gICAgICBjb25zdCBkdXJhdGlvbiA9IGVuZFRpbWUuZ2V0VGltZSgpIC0gc3RhcnRUaW1lLmdldFRpbWUoKTtcbiAgICAgIGVuZEZ1bmN0aW9uKGR1cmF0aW9uKTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICBkZXNjcmlwdG9yLnZhbHVlID0gZnVuY3Rpb24oKSB7XG4gICAgICBzdGFydEZ1bmN0aW9uKCk7XG4gICAgICBjb25zdCBzdGFydFRpbWUgPSBuZXcgRGF0ZSgpO1xuICAgICAgY29uc3QgcmVzdWx0ID0gb2xkRnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgY29uc3QgZW5kVGltZSA9IG5ldyBEYXRlKCk7XG4gICAgICBjb25zdCBkdXJhdGlvbiA9IGVuZFRpbWUuZ2V0VGltZSgpIC0gc3RhcnRUaW1lLmdldFRpbWUoKTtcbiAgICAgIGVuZEZ1bmN0aW9uKGR1cmF0aW9uKTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gTG9nQ291bnQocmVwb3J0ZXI6IFJlcG9ydGVyLCBldmVudDogc3RyaW5nKSB7XG4gIHJldHVybiBmdW5jdGlvbih0YXJnZXQ6IGFueSwgcHJvcGVydHlLZXk6IHN0cmluZywgZGVzY3JpcHRvcjogUHJvcGVydHlEZXNjcmlwdG9yKSB7XG4gICAgY29uc3Qgb2xkRnVuYyA9IGRlc2NyaXB0b3IudmFsdWU7XG4gICAgaWYgKG9sZEZ1bmMpIHtcbiAgICAgIHByb2Nlc3NGdW5jdGlvbihcbiAgICAgICAgb2xkRnVuYyxcbiAgICAgICAgZGVzY3JpcHRvcixcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIHJlcG9ydGVyLmxvZ0NvdW50KGV2ZW50KTtcbiAgICAgICAgfSxcbiAgICAgICAgZHVyYXRpb24gPT4ge31cbiAgICAgICk7XG4gICAgfVxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gTG9nRHVyYXRpb24ocmVwb3J0ZXI6IFJlcG9ydGVyLCBldmVudDogc3RyaW5nKSB7XG4gIHJldHVybiBmdW5jdGlvbih0YXJnZXQ6IGFueSwgcHJvcGVydHlLZXk6IHN0cmluZywgZGVzY3JpcHRvcjogUHJvcGVydHlEZXNjcmlwdG9yKSB7XG4gICAgY29uc3Qgb2xkRnVuYyA9IGRlc2NyaXB0b3IudmFsdWU7XG4gICAgaWYgKG9sZEZ1bmMpIHtcbiAgICAgIHByb2Nlc3NGdW5jdGlvbihcbiAgICAgICAgb2xkRnVuYyxcbiAgICAgICAgZGVzY3JpcHRvcixcbiAgICAgICAgKCkgPT4ge30sXG4gICAgICAgIGR1cmF0aW9uID0+IHtcbiAgICAgICAgICByZXBvcnRlci5sb2dEdXJhdGlvbihldmVudCwgZHVyYXRpb24pO1xuICAgICAgICB9XG4gICAgICApO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==