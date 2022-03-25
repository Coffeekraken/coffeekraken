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
class postcssSugarPluginFormatTextlMixinInterface extends __SInterface {
  static get _definition() {
    return {};
  }
}
function text_default({
  params,
  atRule,
  unwrap,
  postcssApi
}) {
  var _a;
  const finalParams = __spreadValues({}, params != null ? params : {});
  (_a = atRule.nodes) == null ? void 0 : _a.forEach((node) => {
    if (node.selector && !node.selector.match(/^\.s-format--text/)) {
      node.selector = node.selector.split(",").map((sel) => {
        return `.s-format--text ${sel}:not(.s-format--none ${sel}), .preview .s-format--text ${sel}`;
      }).join(",");
    }
  });
  atRule.replaceWith(atRule.nodes);
}
export {
  text_default as default,
  postcssSugarPluginFormatTextlMixinInterface as interface
};
