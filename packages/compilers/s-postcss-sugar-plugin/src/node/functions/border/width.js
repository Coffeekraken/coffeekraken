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
class postcssSugarPluginBorderWidthFunctionInterface extends __SInterface {
  static get _definition() {
    return {
      width: {
        type: "String",
        values: Object.keys(__STheme.config("border.width")),
        default: "default",
        required: true
      }
    };
  }
}
function width_default({
  params
}) {
  const finalParams = __spreadValues({
    width: ""
  }, params);
  const width = finalParams.width;
  if (__STheme.config("border.width")[width] === void 0)
    return width;
  const widthes = width.split(" ").map((s) => {
    const width2 = __STheme.config(`border.width.${s}`);
    if (!width2)
      return width2;
    return `var(${`--s-theme-border-width-${s}`}) ${finalParams.width !== "default" ? "!important" : ""}`;
  });
  return widthes.join(" ");
}
export {
  width_default as default,
  postcssSugarPluginBorderWidthFunctionInterface as interface
};
