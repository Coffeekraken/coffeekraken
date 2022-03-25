import __SInterface from "@coffeekraken/s-interface";
class SEventEmitterPipeSettingsInterface extends __SInterface {
  static get _definition() {
    return {
      events: {
        description: "Specify some events to pipe. Default it pipe everything using `*`",
        type: "String",
        default: "*"
      },
      overrideEmitter: {
        description: "Specify if the emitter of the event that will be piped has to be overrided by the instance that pipe the event",
        type: "Boolean",
        default: false
      },
      processor: {
        description: "Specify a function that will be called before piping the event value. If you return only 1 value, it will set the value only, otherwise you can return an object with `value` and `metas` property to update also the metas",
        type: "Function"
      },
      exclude: {
        description: "Specify some event(s) to not pipe at all like `resolve`, `reject`, etc...",
        type: "Array<String>",
        default: ["finally", "resolve", "reject", "cancel", "catch"]
      },
      filter: {
        description: "Specify a function that will receive the value and the metas object and MUST return `true` or `false` to tell if you want to pipe this current event",
        type: "Function"
      }
    };
  }
}
export {
  SEventEmitterPipeSettingsInterface as default
};
