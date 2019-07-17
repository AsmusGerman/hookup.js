import { Hookup } from "./hookup";
import { HookupMessage } from "./hookup-message";
import { IfStateReady } from "./if-state-ready.descriptor";
import { HookupState } from "./hookup-state";

export class ParentHookup extends Hookup {
  constructor() {
    if (window !== window.top) {
      throw new Error("Parent must be the top most window");
    }
    super();
  }

  public postback(callback: (message: HookupMessage) => void): void {
    window.addEventListener("message", function(event) {
      // only hookup messages after child state is ready
      if (
        !!event.data.hookup &&
        !!event.data.state &&
        event.data.state === HookupState.ready
      ) {
        callback(event.data);
      }
    });
  }

  @IfStateReady()
  public post(message: any, child?: string): void {
    debugger;
    if (!!child) {
      window.frames[child].postMessage(
        new HookupMessage(message, this.state),
        "*"
      );
    }
  }
}
