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
class postcssSugarPluginOpacityFunctionInterface extends __SInterface {
  static get _definition() {
    return {
      opacity: {
        type: "String",
        values: Object.keys(__STheme.config("opacity")),
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
  if (__STheme.config("opacity")[opacity] === void 0)
    return opacity;
  const opacityRes = opacity.split(" ").map((s) => {
    const size = __STheme.config(`opacity.${s}`);
    if (!size)
      return size;
    return `var(${`--s-theme-opacity-${s}`}, ${size})`;
  });
  return opacityRes.join(" ");
}
export {
  opacity_default as default,
  postcssSugarPluginOpacityFunctionInterface as interface
};
