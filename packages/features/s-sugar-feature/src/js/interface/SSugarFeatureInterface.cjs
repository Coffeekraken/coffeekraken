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
var SSugarFeatureInterface_exports = {};
__export(SSugarFeatureInterface_exports, {
  default: () => SSugarFeatureInterface
});
module.exports = __toCommonJS(SSugarFeatureInterface_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"));
class SSugarFeatureInterface extends import_s_interface.default {
  static get _definition() {
    return {
      scrolled: {
        description: "Specify if you want the `scrolled` class to be applied on the `body` element when the page has been scrolled",
        type: "Boolean",
        default: true
      },
      scrolledDelta: {
        description: "Specify after how many scroll the scrolled class will be applied",
        type: "Number",
        default: 10
      },
      vhvar: {
        description: "Specify if you want the `--vh` css variable to be computed and available",
        type: "Boolean",
        default: true
      },
      inputAdditionalAttributes: {
        description: 'Specify if you want to have the additional attributes on inputs like "has-value", "empty" and "dirty" or not',
        type: "Boolean",
        default: true
      },
      resizeTransmations: {
        description: "Specify if you want all the transitions and animations cleared during window resize",
        type: "Boolean",
        default: true
      },
      linksStateAttributes: {
        description: 'Specify if you want to have the state attributes on links like "actual" and "actual-child" or not',
        type: "Boolean",
        default: true
      },
      preventScrollRestoration: {
        description: "Specify if you want to prevent the scroll restoration behavior on chrome that can usually be anoying",
        type: "Boolean",
        default: true
      }
    };
  }
}
