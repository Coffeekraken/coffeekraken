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
class postcssSugarPluginScopeNoMixinInterface extends __SInterface {
  static get _definition() {
    return {
      scopes: {
        type: {
          type: "Array<String>",
          splitChars: [",", " "]
        },
        required: true
      }
    };
  }
}
const _noScopesStack = [];
function no_default({
  params,
  sharedData,
  atRule,
  replaceWith,
  postcssApi
}) {
  const finalParams = __spreadValues({
    scopes: []
  }, params != null ? params : {});
}
export {
  no_default as default,
  postcssSugarPluginScopeNoMixinInterface as interface
};
