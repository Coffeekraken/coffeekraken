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
var SNpmBinCliInterface_exports = {};
__export(SNpmBinCliInterface_exports, {
  default: () => SNpmBinInterface
});
module.exports = __toCommonJS(SNpmBinCliInterface_exports);
var import_SInterface = __toESM(require("../../../node/class/SInterface"), 1);
class SNpmBinInterface extends import_SInterface.default {
  static get _definition() {
    return {
      action: {
        type: "String",
        required: true,
        alias: "a",
        values: ["install", "i", "uninstall", "u", "un"],
        description: 'Specify which action you want to execute in the "bin" module'
      },
      global: {
        type: "Boolean",
        required: true,
        alias: "g",
        description: "Specify if you want to symlink the passed bin in the global scope or in local one",
        default: false
      },
      package: {
        type: "String",
        alias: "p",
        description: "Specify the package you want to install the bin from. If not specified, will take the current package where you're in using ```process.cwd``` function",
        default: null
      },
      bin: {
        type: "String",
        alias: "b",
        description: "Specify the bin you want to symlink",
        default: null
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
