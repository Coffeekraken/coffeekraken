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
var SRefocusFeatureInterface_exports = {};
__export(SRefocusFeatureInterface_exports, {
  default: () => SRefocusFeatureInterface
});
module.exports = __toCommonJS(SRefocusFeatureInterface_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"));
class SRefocusFeatureInterface extends import_s_interface.default {
  static get _definition() {
    return {
      trigger: {
        description: "Specify some trigger(s) on which to refocus a particular element like `event:actual`, `anchor`, `history`, etc...",
        type: {
          type: "Array<String>",
          splitChars: [","]
        },
        values: ["event:eventName", "anchor", "history"],
        default: []
      },
      scrollToSettings: {
        description: "Specify some `scrollTo` settings to override the default ones",
        type: "IScrollToSettings",
        default: {}
      },
      timeout: {
        description: "Specify a timeout to wait before refocus the element",
        type: "Number",
        default: 500
      }
    };
  }
}
