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
var SClipboardCopyComponentInterface_exports = {};
__export(SClipboardCopyComponentInterface_exports, {
  default: () => SClipboardCopyComponentInterface
});
module.exports = __toCommonJS(SClipboardCopyComponentInterface_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"));
class SClipboardCopyComponentInterface extends import_s_interface.default {
  static get _definition() {
    return {
      successTimeout: {
        description: 'Specify the duration for displaying the "success" icon',
        type: "Number",
        default: 1500
      },
      errorTimeout: {
        description: 'Specify the duration for displaying the "error" icon',
        type: "Number",
        default: 3e3
      }
    };
  }
}
