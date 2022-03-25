var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
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
import __SInterface from "@coffeekraken/s-interface";
class postcssSugarPluginColorMixinInterface extends __SInterface {
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
export {
  color_default as default,
  postcssSugarPluginColorMixinInterface as interface
};
