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
var SConductorSettingsInterface_exports = {};
__export(SConductorSettingsInterface_exports, {
  default: () => SConductorSettingsInterface
});
module.exports = __toCommonJS(SConductorSettingsInterface_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"), 1);
class SConductorSettingsInterface extends import_s_interface.default {
  static get _definition() {
    return {
      idleTimeout: {
        description: "Specify after how many milliseconds of inactity the SConductor has to be considered as idle ",
        type: "Number",
        default: 500
      },
      logTimeout: {
        description: "Specify after how many milliseconds of inactity the SConductor has to log the small analysis",
        type: "Number",
        default: 2e3
      },
      log: {
        description: "Specify if you want to log the small analysis when the SConductor is idle",
        type: "Boolean",
        default: false
      }
    };
  }
}
