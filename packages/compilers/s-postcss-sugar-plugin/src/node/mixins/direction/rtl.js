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
class postcssSugarPluginDirectionRtlMixinInterface extends __SInterface {
  static get _definition() {
    return {};
  }
}
function rtl_default({
  params,
  atRule,
  postcssApi,
  replaceWith
}) {
  const finalParams = __spreadValues({
    className: ""
  }, params != null ? params : {});
  const rule = new postcssApi.Rule({
    selector: '[dir="rtl"] &, &[dir="rtl"]'
  });
  atRule.nodes.forEach((node) => {
    rule.append(node);
  });
  atRule.replaceWith(rule);
}
export {
  rtl_default as default,
  postcssSugarPluginDirectionRtlMixinInterface as interface
};
