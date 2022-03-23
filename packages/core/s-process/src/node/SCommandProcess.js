var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
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
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var SCommandProcess_exports = {};
__export(SCommandProcess_exports, {
  default: () => SCommandProcess
});
module.exports = __toCommonJS(SCommandProcess_exports);
var import_spawn = __toESM(require("@coffeekraken/sugar/node/process/spawn"), 1);
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"), 1);
var import_SCommandProcessInterface = __toESM(require("./interface/SCommandProcessInterface"), 1);
var import_SProcess = __toESM(require("./SProcess"), 1);
class SCommandProcess extends import_SProcess.default {
  get commandProcessSettings() {
    return this._settings.commandProcess;
  }
  constructor(initialParams, settings) {
    super(initialParams != null ? initialParams : {}, (0, import_deepMerge.default)({
      commandProcess: {}
    }, settings != null ? settings : {}, {
      process: {
        runAsChild: false
      }
    }));
  }
  process(params, settings) {
    const set = (0, import_deepMerge.default)(this.commandProcessSettings, settings != null ? settings : {});
    return (0, import_spawn.default)(params.command, [], __spreadValues({
      returnValueOnly: true
    }, set.spawnSettings));
  }
}
SCommandProcess.interfaces = {
  params: import_SCommandProcessInterface.default
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
