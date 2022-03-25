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
var color_exports = {};
__export(color_exports, {
  default: () => color_default,
  interface: () => postcssSugarPluginColorMixinInterface
});
module.exports = __toCommonJS(color_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"), 1);
class postcssSugarPluginColorMixinInterface extends import_s_interface.default {
  static get _definition() {
    return {
      current: {
        type: "String",
        required: true
      },
      primary: {
        type: "String"
      },
      secondary: {
        type: "String"
      }
    };
  }
}
function color_default({
  params,
  atRule,
  CssVars,
  replaceWith
}) {
  const finalParams = __spreadValues({
    current: "",
    primary: void 0,
    secondary: void 0
  }, params);
  const vars = new CssVars(`
        @sugar.color.remap(current, ${finalParams.current});`);
  if (finalParams.primary) {
    vars.code(`@sugar.color.remap(primary, ${finalParams.primary});`);
  } else {
    vars.code(`@sugar.color.remap(primary, ${finalParams.current});`);
  }
  if (finalParams.secondary) {
    vars.code(`@sugar.color.remap(secondary, ${finalParams.secondary});`);
  } else {
    vars.code(`@sugar.color.remap(secondary, ${finalParams.current});`);
  }
  return vars;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  interface
});
