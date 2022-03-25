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
import __isValidUnitValue from "@coffeekraken/sugar/shared/css/isValidUnitValue";
class postcssSugarPluginFontSizeInterface extends __SInterface {
  static get _definition() {
    return {
      name: {
        type: "String",
        required: true,
        alias: "n"
      },
      scalable: {
        type: "Boolean",
        default: __STheme.config("scalable.font")
      }
    };
  }
}
function size_default({
  params
}) {
  const finalParams = __spreadValues({
    name: "",
    scalable: false
  }, params);
  const name = finalParams.name;
  if (__isValidUnitValue(name)) {
    if (finalParams.scalable)
      return `sugar.scalable(${name})`;
    return name;
  }
  return `sugar.theme(font.size.${name}, ${finalParams.scalable})`;
}
export {
  size_default as default,
  postcssSugarPluginFontSizeInterface as interface
};
