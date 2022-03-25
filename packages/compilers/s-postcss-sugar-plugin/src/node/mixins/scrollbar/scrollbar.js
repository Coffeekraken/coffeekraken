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
class postcssSugarPluginScrollbarInterface extends __SInterface {
  static get _definition() {
    return {
      color: {
        type: "String",
        default: __STheme.config("ui.scrollbar.defaultColor")
      },
      background: {
        type: "String",
        default: __STheme.config("ui.scrollbar.defaultColor")
      },
      size: {
        type: "String",
        default: __STheme.config("ui.scrollbar.size")
      }
    };
  }
}
function scrollbar_default({
  params,
  atRule,
  replaceWith
}) {
  const finalParams = __spreadValues({
    size: "5px",
    color: "accent",
    background: "main"
  }, params);
  const vars = [];
  vars.push(`
      &::-webkit-scrollbar {
          width: ${finalParams.size};
          height: ${finalParams.size};
      }
      &::-webkit-scrollbar-track {
          background-color: sugar.color(${finalParams.background}, --alpha 0.1);
      }
      &::-webkit-scrollbar-thumb {
          background-color: sugar.color(${finalParams.color});
      }
  `);
  return vars;
}
export {
  scrollbar_default as default,
  postcssSugarPluginScrollbarInterface as interface
};
