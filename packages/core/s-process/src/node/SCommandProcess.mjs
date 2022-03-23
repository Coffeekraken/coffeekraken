import {
  __spreadValues
} from "../../../../chunk-TD77TI6B.mjs";
import __spawn from "@coffeekraken/sugar/node/process/spawn";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
import __SCommandProcessInterface from "./interface/SCommandProcessInterface";
import __SProcess from "./SProcess";
class SCommandProcess extends __SProcess {
  get commandProcessSettings() {
    return this._settings.commandProcess;
  }
  constructor(initialParams, settings) {
    super(initialParams != null ? initialParams : {}, __deepMerge({
      commandProcess: {}
    }, settings != null ? settings : {}, {
      process: {
        runAsChild: false
      }
    }));
  }
  process(params, settings) {
    const set = __deepMerge(this.commandProcessSettings, settings != null ? settings : {});
    return __spawn(params.command, [], __spreadValues({
      returnValueOnly: true
    }, set.spawnSettings));
  }
}
SCommandProcess.interfaces = {
  params: __SCommandProcessInterface
};
export {
  SCommandProcess as default
};
