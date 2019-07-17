import { Hookup } from "./hookup";
import { HookupMessage } from "../index";
import { IfStateReady } from "./if-state-ready.descriptor";

export class ChildHookup extends Hookup {
  constructor() {
    if (window === window.top) {
      throw new Error("Child can't be the top most window");
    }
    super();
  }

  public postback(callback: (message: HookupMessage) => void): void {
    window.addEventListener("message", function(event) {
      // only hookup messages from window topmost
      if (event.source === window.top && !!event.data.hookup) {
        callback(event.data);
      }
    });
  }

  @IfStateReady()
  public post(message: any): void {
    window.parent.postMessage(new HookupMessage(message, this.state), "*");
  }
}
