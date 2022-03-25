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
var SStdioSettingsInterface_exports = {};
__export(SStdioSettingsInterface_exports, {
  default: () => SStdioSettingsInterface
});
module.exports = __toCommonJS(SStdioSettingsInterface_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"));
class SStdioSettingsInterface extends import_s_interface.default {
  static get _definition() {
    return {
      filter: {
        description: "Specify a function that will be used to filter the logs. It will take the log object as parameter and MUST return a boolean.",
        type: "Function"
      },
      processor: {
        description: "Specify a function that will be used to process the logs. It will take the log object and MUST return it, updated or not...",
        type: "Function"
      },
      defaultLogObj: {
        description: "Specify a default log object that will be used as base for each received logs",
        type: "Object",
        default: {}
      },
      defaultAskObj: {
        description: "Specify a default ask object that will be used as base for each received questions (ask)",
        type: "Object",
        default: {}
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
