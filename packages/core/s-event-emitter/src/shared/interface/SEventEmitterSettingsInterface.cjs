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
var SEventEmitterSettingsInterface_exports = {};
__export(SEventEmitterSettingsInterface_exports, {
  default: () => SEventEmitterSettingsInterface
});
module.exports = __toCommonJS(SEventEmitterSettingsInterface_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"));
var import_s_log = __toESM(require("@coffeekraken/s-log"));
class SEventEmitterSettingsInterface extends import_s_interface.default {
  static get _definition() {
    return {
      asyncStart: {
        description: "Specify if you want to start the event emitting process by yourself using the `start()` method",
        type: "Boolean",
        default: false
      },
      bufferTimeout: {
        description: "Specify how many ms to wait when the emitter is started to emit the buffered events",
        type: "Number",
        default: 1e3
      },
      defaults: {
        description: "Specify some default object values for events. The property define the event name (of minimatch pattern) and the value is the default that will be applied at each emit",
        type: "Object",
        default: {}
      },
      castByEvent: {
        description: 'Specify a class by event name in which the value will be casted automatically. For example, the "log" event value is casted into an SLog instance',
        type: "Object",
        default: {
          log: import_s_log.default
        }
      },
      bind: {
        description: "Specify another object that will be used as the event emitter in the events metas. This do the same as using the `emitter.bind(...)` method",
        type: "Object"
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
