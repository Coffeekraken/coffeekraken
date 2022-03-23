var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var SEventEmitterPipeSettingsInterface_exports = {};
__export(SEventEmitterPipeSettingsInterface_exports, {
  default: () => SEventEmitterPipeSettingsInterface
});
module.exports = __toCommonJS(SEventEmitterPipeSettingsInterface_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"), 1);
class SEventEmitterPipeSettingsInterface extends import_s_interface.default {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
