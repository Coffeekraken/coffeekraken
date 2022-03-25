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
class postcssSugarPluginColorRemapMixinInterface extends __SInterface {
  static get _definition() {
    return {
      color: {
        type: "String",
        required: true
      },
      toColor: {
        type: "String",
        required: true
      }
    };
  }
}
function remap_default({
  params,
  atRule,
  replaceWith
}) {
  const finalParams = __spreadValues({
    color: "",
    toColor: ""
  }, params);
  const vars = [
    ...__STheme.remapCssColor(finalParams.color, finalParams.toColor).vars
  ];
  if (atRule.parent.type === "root") {
    vars.unshift(":root {");
    vars.push("}");
  }
  return vars;
}
export {
  remap_default as default,
  postcssSugarPluginColorRemapMixinInterface as interface
};
