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
        values: ["mounted", "active", "dark", "light"],
        required: true
      },
      context: {
        type: "String",
        values: ["self", "sibling", "parent", "ancestor", "theme"],
        default: "self",
        required: true
      }
    };
  }
}
function when_default({
  params,
  atRule,
  postcssApi
}) {
  const finalParams = __spreadValues({
    state: "mounted",
    context: "self"
  }, params != null ? params : {});
  let selector;
  switch (finalParams.state) {
    case "mounted":
      if (finalParams.context === "parent") {
        selector = "*[mounted] > &, *.mounted > &";
      } else if (finalParams.context === "ancestor") {
        selector = "*[mounted] &, *.mounted &";
      } else if (finalParams.context === "sibling") {
        selector = "*[mounted] + &, *.mounted + &";
      } else {
        selector = "&[mounted], &.mounted";
      }
      break;
    case "active":
      if (finalParams.context === "parent") {
        selector = "*[active] > &. *.active > &";
      } else if (finalParams.context === "ancestor") {
        selector = "*[active] &. *.active &";
      } else if (finalParams.context === "sibling") {
        selector = "*[active] + &. *.active + &";
      } else {
        selector = "&[active], &.active";
      }
      break;
    case "dark":
      selector = `@media (prefers-color-scheme: dark)`;
      break;
    case "light":
      selector = `@media (prefers-color-scheme: light)`;
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
  when_default as default,
  postcssSugarPluginmountedMixinInterface as interface
};
