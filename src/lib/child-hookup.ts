import { Hookup } from "./hookup";
import { HookupMessage } from "../index";

export class ChildHookup extends Hookup {
  constructor(reference: Window) {
    if (reference === window.top) {
      throw new Error("Child can't be the top most window");
    }

    super(reference);
  }

  public postback(callback: (message: HookupMessage) => void): void {
    this.reference.addEventListener("message", function(event) {
      // solo recibir mensajes con origen de window
      if (event.source === window.top && !!event.data.hookup) {
        callback(event.data.hookup);
      }
    });
  }

  public post(message: HookupMessage): void {
    this.reference.parent.postMessage(message, "*");
  }
}
