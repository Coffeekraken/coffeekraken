import __SInterface from "@coffeekraken/s-interface";
import __SLog from "@coffeekraken/s-log";
class SSugarCliParamsInterface extends __SInterface {
  static get _definition() {
    return {
      bench: {
        type: {
          type: "Array<String> |\xA0Boolean",
          splitChars: [","]
        },
        default: false,
        explicit: true
      },
      logPreset: {
        type: "String",
        values: __SLog.PRESETS,
        default: "default",
        explicit: true
      }
    };
  }
}
export {
  SSugarCliParamsInterface as default
};
