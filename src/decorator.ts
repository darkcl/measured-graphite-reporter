import { Reporter } from './reporter';

function isAsync(fn: any): boolean {
  return fn.constructor.name === 'AsyncFunction';
}

function processFunction(
  oldFunc: any,
  descriptor: PropertyDescriptor,
  startFunction: () => void,
  endFunction: (duration: number) => void
) {
  if (isAsync(oldFunc)) {
    descriptor.value = async function() {
      startFunction();
      const startTime = new Date();
      const result = await oldFunc.apply(this, arguments);
      const endTime = new Date();
      const duration = endTime.getTime() - startTime.getTime();
      endFunction(duration);
      return result;
    };
  } else {
    descriptor.value = function() {
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

export function LogCount(reporter: Reporter, event: string) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const oldFunc = descriptor.value;
    if (oldFunc) {
      processFunction(
        oldFunc,
        descriptor,
        () => {
          reporter.logCount(event);
        },
        duration => {}
      );
    }
  };
}

export function LogDuration(reporter: Reporter, event: string) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const oldFunc = descriptor.value;
    if (oldFunc) {
      processFunction(
        oldFunc,
        descriptor,
        () => {},
        duration => {
          reporter.logDuration(event, duration);
        }
      );
    }
  };
}
