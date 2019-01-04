import { Reporter } from './reporter';
export declare function LogCount(
  reporter: Reporter,
  event: string
): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function LogDuration(
  reporter: Reporter,
  event: string
): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
