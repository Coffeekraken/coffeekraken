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
class postcssSugarPluginPaddingFunctionInterface extends __SInterface {
  static get _definition() {
    return {
      padding: {
        type: "String",
        values: Object.keys(__STheme.config("padding")),
        default: "default",
        required: true
      },
      scalable: {
        type: "Boolean",
        default: __STheme.config("scalable.padding")
      }
    };
  }
}
function padding_default({
  params
}) {
  const finalParams = __spreadValues({
    padding: "",
    scalable: true
  }, params);
  const padding = finalParams.padding;
  let paddings = padding.split(" ").map((s) => {
    if (s === `${parseInt(s)}`)
      return `sugar.theme(padding.${s}, ${finalParams.scalable})`;
    return s;
  });
  return paddings.join(" ");
}
export {
  padding_default as default,
  postcssSugarPluginPaddingFunctionInterface as interface
};
