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
var SProcessSettingsInterface_exports = {};
__export(SProcessSettingsInterface_exports, {
  default: () => SProcessSettingsInterface_default
});
module.exports = __toCommonJS(SProcessSettingsInterface_exports);
var import_s_sugar_config = __toESM(require("@coffeekraken/s-sugar-config"));
var import_s_interface = __toESM(require("@coffeekraken/s-interface"));
class SProcessSettingsInterface extends import_s_interface.default {
  static get _definition() {
    return {
      killOnError: {
        description: "Specify if you want to kill the process when an error occurs",
        type: "Boolean",
        default: import_s_sugar_config.default.get("process.killOnError")
      },
      stdio: {
        description: "Specify the stdio to use for your process",
        type: "String|SStdio|Boolean",
        alias: "s",
        default: import_s_sugar_config.default.get("process.stdio")
      },
      throw: {
        description: "Specify if you want to throw error when an error occurs",
        type: "Boolean",
        alias: "t",
        default: import_s_sugar_config.default.get("process.throw")
      },
      exitAtEnd: {
        description: "Specify if you want to kill the process at his end",
        type: "Boolean",
        alias: "e",
        default: import_s_sugar_config.default.get("process.exitAtEnd")
      },
      runAsChild: {
        description: "Specify if you want to run your process as a child one",
        type: "Boolean",
        alias: "c",
        default: import_s_sugar_config.default.get("process.runAsChild")
      },
      processPath: {
        description: "Specify a path to a process file that exports a process supported type like an SProcess based class, a function, etc...",
        type: "String",
        default: import_s_sugar_config.default.get("process.processPath")
      }
    };
  }
}
var SProcessSettingsInterface_default = SProcessSettingsInterface;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
