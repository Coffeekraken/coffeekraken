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
class postcssSugarPluginmountedMixinInterface extends __SInterface {
  static get _definition() {
    return {
      state: {
        type: "String",
        values: ["mounted"],
        required: true
      },
      sibling: {
        type: "Boolean",
        default: false
      }
    };
  }
}
function mounted_default({
  params,
  atRule,
  postcssApi
}) {
  const finalParams = __spreadValues({
    state: "mounted",
    sibling: false
  }, params != null ? params : {});
  let selector;
  switch (finalParams.state) {
    case "mounted":
      if (finalParams.sibling) {
        selector = "*:not([mounted]):not(.mounted) &";
      } else {
        selector = "&:not([mounted]):not(.mounted)";
      }
      break;
  }
  const wrapperRule = new postcssApi.Rule({
    selector
  });
  atRule.nodes.forEach((node) => {
    wrapperRule.append(node);
  });
  atRule.replaceWith(wrapperRule);
}
export {
  mounted_default as default,
  postcssSugarPluginmountedMixinInterface as interface
};
