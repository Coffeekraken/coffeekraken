var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
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
var margin_exports = {};
__export(margin_exports, {
  default: () => margin_default,
  interface: () => postcssSugarPluginMarginFunctionInterface
});
module.exports = __toCommonJS(margin_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"));
var import_s_theme = __toESM(require("@coffeekraken/s-theme"));
class postcssSugarPluginMarginFunctionInterface extends import_s_interface.default {
  static get _definition() {
    return {
      margin: {
        type: "String",
        values: Object.keys(import_s_theme.default.config("margin")),
        default: "default",
        required: true
      },
      scalable: {
        type: "Boolean",
        default: import_s_theme.default.config("scalable.margin")
      }
    };
  }
}
function margin_default({
  params
}) {
  const finalParams = __spreadValues({
    margin: "",
    scalable: false
  }, params);
  const margin = finalParams.margin;
  let margins = margin.split(" ").map((s) => {
    if (s === `${parseInt(s)}`)
      return `sugar.theme(margin.${s}, ${finalParams.scalable})`;
    return s;
  });
  return margins.join(" ");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  interface
});
