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
var opacity_exports = {};
__export(opacity_exports, {
  default: () => opacity_default,
  interface: () => postcssSugarPluginOpacityFunctionInterface
});
module.exports = __toCommonJS(opacity_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"), 1);
var import_s_theme = __toESM(require("@coffeekraken/s-theme"), 1);
class postcssSugarPluginOpacityFunctionInterface extends import_s_interface.default {
  static get _definition() {
    return {
      opacity: {
        type: "String",
        values: Object.keys(import_s_theme.default.config("opacity")),
        default: "100",
        required: true
      }
    };
  }
}
function opacity_default({
  params
}) {
  const finalParams = __spreadValues({
    opacity: "100"
  }, params);
  const opacity = finalParams.opacity;
  if (import_s_theme.default.config("opacity")[opacity] === void 0)
    return opacity;
  const opacityRes = opacity.split(" ").map((s) => {
    const size = import_s_theme.default.config(`opacity.${s}`);
    if (!size)
      return size;
    return `var(${`--s-theme-opacity-${s}`}, ${size})`;
  });
  return opacityRes.join(" ");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  interface
});
