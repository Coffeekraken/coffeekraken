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
import __STheme from "@coffeekraken/s-theme";
class postcssSugarPluginBorderwidthMixinInterface extends __SInterface {
  static get _definition() {
    return {
      width: {
        type: "Number|String",
        required: true,
        default: __STheme.config("border.width.default")
      }
    };
  }
}
function width_default({
  params,
  atRule,
  CssVars,
  replaceWith
}) {
  const finalParams = __spreadValues({
    width: 0
  }, params);
  const vars = new CssVars(`border-width: sugar.border.width(${finalParams.width});`);
  return vars;
}
export {
  width_default as default,
  postcssSugarPluginBorderwidthMixinInterface as interface
};
