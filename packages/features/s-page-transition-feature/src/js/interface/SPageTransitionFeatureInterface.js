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
var SPageTransitionFeatureInterface_exports = {};
__export(SPageTransitionFeatureInterface_exports, {
  default: () => SPageTransitionFeatureInterface
});
module.exports = __toCommonJS(SPageTransitionFeatureInterface_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"), 1);
class SPageTransitionFeatureInterface extends import_s_interface.default {
  static get _definition() {
    return {
      patchBody: {
        description: "Specify if you want to patch the body tag with the new page body tag",
        type: "Boolean",
        default: true
      },
      scrollTop: {
        description: "Specify if you want to scroll to the top of the updated element after a transition",
        type: "Boolean",
        default: true
      },
      before: {
        description: "Specify a function to run before the transition",
        type: "Function"
      },
      after: {
        description: "Specify a function to run after the transition",
        type: "Function"
      }
    };
  }
}
