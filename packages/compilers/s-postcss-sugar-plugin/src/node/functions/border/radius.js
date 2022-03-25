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
class postcssSugarPluginBorderRadiusFunctionInterface extends __SInterface {
  static get _definition() {
    return {
      radius: {
        type: "String",
        values: Object.keys(__STheme.config("border.radius")),
        default: "default",
        required: true
      }
    };
  }
}
function radius_default({
  params
}) {
  const finalParams = __spreadValues({
    radius: ""
  }, params);
  const radius = finalParams.radius;
  if (__STheme.config("border.radius")[radius] === void 0)
    return radius;
  const radiuses = radius.split(" ").map((s) => {
    return `var(${`--s-theme-border-radius-${s}`}) ${finalParams.radius !== "default" ? "!important" : ""}`;
  });
  return radiuses.join(" ");
}
export {
  radius_default as default,
  postcssSugarPluginBorderRadiusFunctionInterface as interface
};
