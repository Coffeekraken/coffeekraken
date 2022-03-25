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
class postcssSugarPluginDisabledInterface extends __SInterface {
  static get _definition() {
    return {};
  }
}
function disabled_default({
  params,
  atRule,
  replaceWith
}) {
  const finalParams = __spreadValues({}, params);
  const vars = [];
  vars.push(`
        opacity: ${__STheme.cssVar("helpers.disabled.opacity")} !important;
        
        &:hover, &:focus, &:active {
            opacity: ${__STheme.cssVar("helpers.disabled.opacity")} !important;
        }

        &, * {
            cursor: not-allowed !important;
            user-select: none !important;
        }

    `);
  return vars;
}
export {
  disabled_default as default,
  postcssSugarPluginDisabledInterface as interface
};
