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
class postcssSugarPluginUtilsConfigToCssInterface extends __SInterface {
  static get _definition() {
    return {
      dotPath: {
        type: "String",
        required: true
      },
      exclude: {
        type: "Array<String>"
      },
      only: {
        type: "Array<String>"
      }
    };
  }
}
function configToCss_default({
  params,
  atRule,
  replaceWith
}) {
  const finalParams = __spreadValues({
    dotPath: "",
    exclude: [],
    only: []
  }, params);
  const configObj = __STheme.config(params.dotPath);
  const vars = [
    __STheme.jsObjectToCssProperties(configObj, {
      exclude: finalParams.exclude,
      only: finalParams.only
    })
  ];
  return vars;
}
export {
  configToCss_default as default,
  postcssSugarPluginUtilsConfigToCssInterface as interface
};
