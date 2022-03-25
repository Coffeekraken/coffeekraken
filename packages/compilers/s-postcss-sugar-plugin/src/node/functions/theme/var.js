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
class postcssSugarPluginThemeInterface extends __SInterface {
  static get _definition() {
    return {
      dotPath: {
        type: "String",
        required: true
      },
      scalable: {
        type: "Boolean",
        default: false
      },
      fallback: {
        type: "Boolean",
        default: true
      }
    };
  }
}
function theme({
  params
}) {
  const finalParams = __spreadValues({}, params);
  if (finalParams.scalable) {
    return `sugar.scalable(${__STheme.cssVar(finalParams.dotPath, finalParams.fallback)})`;
  } else {
    return __STheme.cssVar(finalParams.dotPath, finalParams.fallback);
  }
}
export {
  theme as default,
  postcssSugarPluginThemeInterface as interface
};
