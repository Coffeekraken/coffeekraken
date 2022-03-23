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
var SParallaxFeatureInterface_exports = {};
__export(SParallaxFeatureInterface_exports, {
  default: () => SParallaxFeatureInterface
});
module.exports = __toCommonJS(SParallaxFeatureInterface_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"), 1);
class SParallaxFeatureInterface extends import_s_interface.default {
  static get _definition() {
    return {
      amount: {
        description: "Specify the amount of parallax you want to apply",
        type: "Number",
        default: 1
      },
      amountX: {
        description: "Specify the amount of parallax you want for the x axis. This will be applied on top of the global amount",
        type: "Number",
        default: 1
      },
      amountY: {
        description: "Specify the amount of parallax you want for the y axis. This will be applied on top of the global amount",
        type: "Number",
        default: 1
      },
      amountTranslateX: {
        description: "Specify the amount of parallax you want for the translate x axis. This will be applied on top of the global amount",
        type: "Number",
        default: 1
      },
      amountTranslateY: {
        description: "Specify the amount of parallax you want for the translate y axis. This will be applied on top of the global amount",
        type: "Number",
        default: 1
      },
      amountRotateX: {
        description: "Specify the amount of parallax you want for the rotate x axis. This will be applied on top of the global amount",
        type: "Number",
        default: 1
      },
      amountRotateY: {
        description: "Specify the amount of parallax you want for the rotate y axis. This will be applied on top of the global amount",
        type: "Number",
        default: 1
      }
    };
  }
}
