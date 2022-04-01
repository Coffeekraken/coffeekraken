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
var SSidePanelComponentInterface_exports = {};
__export(SSidePanelComponentInterface_exports, {
  default: () => SSidePanelComponentInterface
});
module.exports = __toCommonJS(SSidePanelComponentInterface_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"));
class SSidePanelComponentInterface extends import_s_interface.default {
  static get _definition() {
    return {
      side: {
        description: 'Specify the side where to display the panel. Can be "top","left","bottom" or "right"',
        type: "String",
        values: ["top", "left", "bottom", "right"],
        default: "left"
      },
      active: {
        description: "Specify the panel initial state",
        type: "Boolean",
        default: false
      },
      overlay: {
        description: 'Specify if you want an "overlay" between the panel and your content',
        type: "Boolean",
        default: false
      },
      triggerer: {
        description: "Specify a css selector that targets the elements in your UI you want to open the panel on click",
        type: "String"
      },
      closeOn: {
        description: 'Specify which "action(s)" close the panel. Valid values are "click" or/and "escape"',
        type: {
          type: "Array<String>",
          splitChars: [","]
        },
        values: ["click", "escape"],
        default: ["click", "escape"]
      }
    };
  }
}
