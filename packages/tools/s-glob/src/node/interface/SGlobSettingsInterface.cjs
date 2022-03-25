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
var SGlobSettingsInterface_exports = {};
__export(SGlobSettingsInterface_exports, {
  default: () => SGlobSettingsInterface
});
module.exports = __toCommonJS(SGlobSettingsInterface_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"));
class SGlobSettingsInterface extends import_s_interface.default {
  static get _definition() {
    return {
      cwd: {
        description: "Specify the working directory to run the command in.",
        type: "String",
        default: process.cwd()
      },
      symlinks: {
        description: "Specify if you want to follow symlinks or not",
        type: "Boolean",
        default: true
      },
      nodir: {
        description: "Specify if you want to ignore directories or not",
        type: "Boolean",
        default: false
      },
      contentRegExp: {
        description: "Specify a regex to use on the file content to filter resolved files",
        type: "RegExp"
      },
      SFile: {
        description: "Specify if you want back some SFile instances or simple string path",
        type: "Boolean",
        default: true
      },
      exclude: {
        description: "Specify some paths or patterns you want to exclude from your resolve process",
        type: "Array<String>",
        default: []
      },
      defaultExcludes: {
        description: "Specfy if you want to use the default excludes globs setted under the config.storage.exclude configuration",
        type: "Boolean",
        default: true
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
