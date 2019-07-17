import { HookupState } from "./hookup-state";

/** method descriptor that checks if state is ready or not then it's descriptor is modified to being executed or not respectively */
export function IfStateReady() {
  return function(target: any, propertyKey: string, descriptor: any) {
    const method = descriptor.value;
    descriptor.value = function(...args: any[]) {
      // if state is not eq to ready then resolve descrptor as an empty function
      if (this.state !== HookupState.ready) {
        return;
      }
      // else apply the original descriptor
      return method.apply(this, args);
    };
    return descriptor;
  };
}
