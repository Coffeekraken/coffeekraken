import {
  __spreadProps,
  __spreadValues
} from "../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
import __SProcessInterface from "./SProcessInterface";
class SCommandProcessInterface extends __SInterface {
  static get _definition() {
    return __spreadProps(__spreadValues({}, __SProcessInterface.definition), {
      command: {
        description: "Specify the command to execute",
        type: "String",
        alias: "c",
        required: true
      }
    });
  }
}
export {
  SCommandProcessInterface as default
};
