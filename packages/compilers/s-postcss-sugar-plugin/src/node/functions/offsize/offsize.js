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
class postcssSugarPluginOffsizeFunctionInterface extends __SInterface {
  static get _definition() {
    return {
      offsize: {
        type: "String",
        values: Object.keys(__STheme.config("offsize")),
        default: "default",
        required: true
      },
      scalable: {
        type: "Boolean",
        default: __STheme.config("scalable.offsize")
      }
    };
  }
}
function offsize_default({
  params
}) {
  const finalParams = __spreadValues({
    offsize: "",
    scalable: false
  }, params);
  const offsize = finalParams.offsize;
  let offsizes = offsize.split(" ").map((s) => {
    if (s === `${parseInt(s)}`)
      return `sugar.theme(offsize.${s}, ${finalParams.scalable})`;
    return s;
  });
  return offsizes.join(" ");
}
export {
  offsize_default as default,
  postcssSugarPluginOffsizeFunctionInterface as interface
};
