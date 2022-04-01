import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
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
var WhenInteractSettingsInterface_exports = {};
__export(WhenInteractSettingsInterface_exports, {
  default: () => WhenInteractSettingsInterface
});
module.exports = __toCommonJS(WhenInteractSettingsInterface_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"), 1);
class WhenInteractSettingsInterface extends import_s_interface.default {
  static get _definition() {
    return {
      mouseover: {
        description: "Specify if the mouseover event has to be used",
        type: "Boolean",
        default: true
      },
      mouseout: {
        description: "Specify if the mouseout event has to be used",
        type: "Boolean",
        default: true
      },
      click: {
        description: "Specify if the click event has to be used",
        type: "Boolean",
        default: true
      },
      touchstart: {
        description: "Specify if the touchstart event has to be used",
        type: "Boolean",
        default: true
      },
      touchend: {
        description: "Specify if the touchend event has to be used",
        type: "Boolean",
        default: true
      },
      focus: {
        description: "Specify if the focus event has to be used",
        type: "Boolean",
        default: true
      }
    };
  }
}
