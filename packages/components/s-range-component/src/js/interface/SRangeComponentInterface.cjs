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
var SRangeComponentInterface_exports = {};
__export(SRangeComponentInterface_exports, {
  default: () => SRangeComponentInterface
});
module.exports = __toCommonJS(SRangeComponentInterface_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"));
class SRangeComponentInterface extends import_s_interface.default {
  static get _definition() {
    return {
      name: {
        type: "String",
        description: 'Specify the name to assign to the internal input[type="range"]'
      },
      value: {
        type: "String",
        description: "Specify the initial range value"
      },
      min: {
        type: "Number",
        description: "Specify the minimal value or the range",
        default: 0
      },
      max: {
        type: "Number",
        description: "Specify the maximal value of the range",
        default: 100
      },
      step: {
        type: "Number",
        description: "Specify the steps between each values"
      },
      target: {
        type: "String",
        description: "Specify a css selector of any HTMLElement or HTMLInputElement in which to inject the value when the range is updated"
      },
      tooltip: {
        type: "Boolean",
        description: "Specify if you want to display the value inside a tooltip on top of the thumb",
        default: false
      },
      disabled: {
        type: "Boolean",
        description: "Specify if this range is disabled",
        default: false
      }
    };
  }
}
