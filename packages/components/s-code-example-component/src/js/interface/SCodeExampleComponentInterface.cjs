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
var SCodeExampleComponentInterface_exports = {};
__export(SCodeExampleComponentInterface_exports, {
  default: () => SCodeExampleComponentInterface
});
module.exports = __toCommonJS(SCodeExampleComponentInterface_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"));
class SCodeExampleComponentInterface extends import_s_interface.default {
  static get _definition() {
    return {
      active: {
        description: 'Specify which "tab" is active in case of multiple languages examples',
        type: "String"
      },
      toolbar: {
        description: 'Specify what you want in the toolbar. Currently available item is "copy"',
        type: "Array<String>",
        values: ["copy"],
        default: ["copy"]
      },
      toolbarPosition: {
        description: 'Specify the toolbar position. Can be "content" or "nav"',
        type: "String",
        values: ["content", "nav"],
        default: "nav"
      },
      languages: {
        description: 'Specify some languages that you want to support. Must be "[key]: language" object syntax. See [highlight.js doc](https://github.com/highlightjs/highlight.js/blob/main/SUPPORTED_LANGUAGES.md) for supported languages',
        type: "Object",
        default: {}
      },
      lines: {
        description: "Specify how many lines to display at max",
        type: "Number"
      },
      moreLabel: {
        description: 'Specify the "show more" button label',
        type: "String",
        default: "Show more"
      },
      lessLabel: {
        description: 'Specigy the "show less" button label',
        type: "String",
        default: "Show less"
      },
      moreAction: {
        type: "String",
        default: "toggle"
      },
      more: {
        description: "Specify if you want to expand the more feature at start or not",
        type: "Boolean",
        default: false
      },
      scrollOnMore: {
        description: 'Specify if you want to scroll to the code when clicking on the "show more/less" button',
        type: "Boolean",
        default: true
      },
      scrollToSettings: {
        description: "Specify some scrollTo settings",
        type: "IScrollToSettings",
        default: {}
      }
    };
  }
}
