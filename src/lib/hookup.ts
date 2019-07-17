import { HookupState } from "./hookup-state";
import { HookupMessage } from "../index";

export abstract class Hookup {
  constructor() {
    this.initialice();
  }

  protected _state: HookupState;

  /** returns the current state of the Hookup instance  */
  get state() {
    return this._state;
  }

  /** send a HookupMessage using postmessage API */
  abstract post(message: any, child?: string): void;
  /** listen for messages then invokes callback function*/
  abstract postback(callback: (message: HookupMessage) => void): void;

  //#region private methods
  private initialice() {
    this._state = HookupState.loading;

    new Promise<void>(
      resolve =>
        (window.onload = function() {
          if (window.document.readyState == "complete") {
            resolve();
          }
        })
    )
      .then(() => {
        this._state = HookupState.ready;
        this.post("state has change");
      })
      .catch(() => {
        this._state = HookupState.error;
        this.post("state has change");
      });
  }
  //#endregion
}
