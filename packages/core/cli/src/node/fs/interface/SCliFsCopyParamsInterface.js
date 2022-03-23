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
var SCliFsCopyParamsInterface_exports = {};
__export(SCliFsCopyParamsInterface_exports, {
  default: () => SCliFsCopyParamsInterface
});
module.exports = __toCommonJS(SCliFsCopyParamsInterface_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"), 1);
class SCliFsCopyParamsInterface extends import_s_interface.default {
  static get _definition() {
    return {
      src: {
        description: "Specify the file/folder to copy",
        type: "String",
        required: true
      },
      glob: {
        description: 'Specify a glob pattern to search for files inside the specified src"',
        type: "String"
      },
      dest: {
        description: "Specify the destination file/folder",
        type: "String",
        required: true
      },
      chdir: {
        description: "Specify if you want the process to change directory inside the destination one or not",
        type: "Boolean",
        default: false
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
