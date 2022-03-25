var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
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
