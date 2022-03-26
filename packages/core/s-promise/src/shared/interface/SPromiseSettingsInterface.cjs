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
var SPromiseSettingsInterface_exports = {};
__export(SPromiseSettingsInterface_exports, {
  default: () => SPromiseSettingsInterface
});
module.exports = __toCommonJS(SPromiseSettingsInterface_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"), 1);
class SPromiseSettingsInterface extends import_s_interface.default {
  static get _definition() {
    return {
      treatCancelAs: {
        description: 'Specify if a "cancel" event/call has to be treated like a "resolve", or like a "reject" a promise level',
        type: "String",
        values: ["resolve", "reject"],
        default: "resolve"
      },
      destroyTimeout: {
        description: 'Specify after how many milliseconds the promise will be destroyed after a "finally" event',
        type: "Number",
        default: 1
      },
      preventRejectOnThrow: {
        description: 'Specify if you prefer your promise to be "resolved" when an underlying error is catched, or if is has to be rejected normally',
        type: "Boolean",
        default: true
      },
      emitLogErrorEventOnThrow: {
        description: 'Specify if you want a "log" of type "error" to be emitted when an underlying error is catched',
        type: "Boolean",
        default: true
      },
      resolveAtResolveEvent: {
        description: 'Specify if youw promise has to be resolved when catching a "resolve" event from deeper emitter',
        type: "Boolean",
        default: false
      },
      rejectAtRejectEvent: {
        description: 'Specify if youw promise has to be rejected when catching a "reject" event from deeper emitter',
        type: "Boolean",
        default: false
      },
      resolveProxies: {
        description: "Specify some functions to be called just before resolving the promise. This function will take the current promise resolve value and must return the updated value",
        type: "Array<Function>",
        default: []
      },
      rejectProxies: {
        description: "Specify some functions to be called just before rejecting the promise. This function will take the current promise resolve value and must return the updated value",
        type: "Array<Function>",
        default: []
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
