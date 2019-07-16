import { Hookup } from "./hookup";
import { HookupMessage } from "./hookup-message";

export class ParentHookup extends Hookup {
  constructor(reference: Window) {
    if (reference !== window.top) {
      throw new Error("Parent must be the top most window");
    }

    super(reference);
  }
  public postback(callback: (message: HookupMessage) => void): void {
    this.reference.addEventListener("message", function(event) {
      if (!!event.data.hookup) {
        callback(event.data.hookup);
      }
    });
  }
  
  public post(message: HookupMessage, child: string): void {
    this.reference.frames[child].postMessage(message, "*");
  }
}
