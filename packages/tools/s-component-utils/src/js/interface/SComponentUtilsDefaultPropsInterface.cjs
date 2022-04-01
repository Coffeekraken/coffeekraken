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
var SComponentUtilsDefaultPropsInterface_exports = {};
__export(SComponentUtilsDefaultPropsInterface_exports, {
  default: () => SComponentUtilsDefaultPropsInterface
});
module.exports = __toCommonJS(SComponentUtilsDefaultPropsInterface_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"));
var import_when = require("@coffeekraken/sugar/js/dom/detect/when");
class SComponentUtilsDefaultPropsInterface extends import_s_interface.default {
  static get _definition() {
    return {
      id: {
        description: "Specify an id for your component",
        type: "String",
        physical: true
      },
      mounted: {
        description: "Specify if your component is mounted or not",
        type: "Boolean",
        default: false,
        physical: true
      },
      mountWhen: {
        description: "Specify when your component will be mounted",
        type: "String",
        values: import_when.triggers,
        default: "direct"
      },
      adoptStyle: {
        description: "Specify if your component adopt the style of the global DOM. This worts only if you are using a shadowRoot element",
        type: "Boolean",
        default: true,
        physical: true
      },
      lnf: {
        description: "Specify the lnf (look-and-feel) of your component. This is used by the css to style your component",
        type: "String",
        default: "default",
        physical: true
      }
    };
  }
}
