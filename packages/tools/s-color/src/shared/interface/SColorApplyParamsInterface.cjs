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
var SColorApplyParamsInterface_exports = {};
__export(SColorApplyParamsInterface_exports, {
  default: () => SColorApplyParamsInterface_default
});
module.exports = __toCommonJS(SColorApplyParamsInterface_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"));
class SColorApplyParamsInterface extends import_s_interface.default {
  static get _definition() {
    return {
      desaturate: {
        type: "Number",
        default: 0,
        alias: "d",
        description: "Allows you to desaturate the color using a percentage"
      },
      saturate: {
        type: "Number",
        default: 0,
        alias: "s",
        description: "Allows you to saturate the color using a percentage"
      },
      greyscale: {
        type: "Boolean",
        default: false,
        alias: "g",
        description: "Allows you to get back the grayscale version of your color"
      },
      spin: {
        type: "Number",
        default: 0,
        description: "Spin the hue on the passed value (max 360)"
      },
      transparentize: {
        type: "Number",
        default: 0,
        description: "The amount of transparency to apply between 0-100|0-1"
      },
      alpha: {
        type: "Number",
        default: 0,
        alias: "a",
        description: "The new alpha value to apply between 0-100|0-1"
      },
      opacity: {
        type: "Number",
        default: 0,
        alias: "o",
        description: "The new alpha value to apply between 0-100|0-1"
      },
      opacify: {
        type: "Number",
        default: 0,
        description: "The amount of transparence to remove between 0-100|0-1"
      },
      darken: {
        type: "Number",
        default: 0,
        description: "The amount of darkness (of the nightmare of the shadow) to apply between 0-100"
      },
      lighten: {
        type: "Number",
        default: 0,
        alias: "l",
        description: "The amount of lightness (of the sky of the angels) to apply between 0-100"
      },
      invert: {
        type: "Boolean",
        default: false,
        alias: "i",
        description: "Specify if you want to invert the color to keep a good contrast ratio with a background for example"
      }
    };
  }
}
var SColorApplyParamsInterface_default = SColorApplyParamsInterface;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
