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
class postcssSugarPluginThemeWhenMixinInterface extends __SInterface {
  static get _definition() {
    return {
      variant: {
        type: "String"
      },
      theme: {
        type: "String"
      }
    };
  }
}
function when_default({
  params,
  atRule,
  postcssApi
}) {
  const finalParams = __spreadValues({}, params != null ? params : {});
  let theme = finalParams.theme, variant = finalParams.variant;
  let container;
  if (theme && variant) {
    container = new postcssApi.Rule({
      selectors: [
        `[theme^="${theme}"][theme$="${variant}"] &`,
        `&[theme^="${theme}"][theme$="${variant}"]`
      ]
    });
  } else if (theme) {
    container = new postcssApi.Rule({
      selectors: [
        `[theme^="${theme}"] &`,
        `&[theme^="${theme}"]`
      ]
    });
  } else if (variant) {
    container = new postcssApi.Rule({
      selectors: [
        `[theme$="${variant}"] &`,
        `&[theme$="${variant}"]`
      ]
    });
  }
  atRule.nodes.forEach((n) => {
    container.append(n.clone());
  });
  atRule.replaceWith(container);
}
export {
  when_default as default,
  postcssSugarPluginThemeWhenMixinInterface as interface
};
