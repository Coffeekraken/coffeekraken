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
class postcssSugarPluginFontSizeInterface extends __SInterface {
  static get _definition() {
    return {
      size: {
        type: "String|Number",
        values: Object.keys(__STheme.config("font.size")),
        required: true
      }
    };
  }
}
function size_default({
  params,
  atRule,
  replaceWith
}) {
  const finalParams = __spreadValues({
    size: 50
  }, params);
  const vars = [];
  vars.push(`font-size: sugar.font.size(${finalParams.size})`);
  return vars;
}
export {
  size_default as default,
  postcssSugarPluginFontSizeInterface as interface
};
