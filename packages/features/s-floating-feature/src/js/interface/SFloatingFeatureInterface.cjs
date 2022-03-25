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
var SFloatingFeatureInterface_exports = {};
__export(SFloatingFeatureInterface_exports, {
  default: () => SFloatingFeatureInterface
});
module.exports = __toCommonJS(SFloatingFeatureInterface_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"), 1);
class SFloatingFeatureInterface extends import_s_interface.default {
  static get _definition() {
    return {
      ref: {
        description: "Specify the reference HTMLElement from which to position the floating one. If not specified, will take the previous element in the DOM",
        type: "String"
      },
      placement: {
        description: "Specify the placement of your floating element. By default it will try to be placed as good as possible.",
        type: "String",
        values: ["top", "right", "bottom", "left", "top-start", "top-end", "right-start", "right-end", "bottom-start", "bottom-end", "left-start", "left-end", "auto"],
        default: "top"
      },
      shift: {
        description: "Specify a space between the floating element and the viewport side to respect",
        type: "Number",
        default: 10
      },
      offset: {
        description: "Specify a space between the floating element and the reference one to respect",
        type: "Number"
      },
      arrow: {
        description: "Specify if you want an arrow or not",
        type: "Boolean",
        default: true
      },
      arrowSize: {
        description: "Specify the size of the arrow in px",
        type: "Number",
        default: 15
      },
      arrowPadding: {
        description: "Specify the padding of the arrow in px",
        type: "Number",
        default: 10
      }
    };
  }
}
