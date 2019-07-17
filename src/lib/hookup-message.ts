import { HookupState } from "./hookup-state";

export class HookupMessage {
  constructor(public hookup: any, public state?: HookupState) {}
}
