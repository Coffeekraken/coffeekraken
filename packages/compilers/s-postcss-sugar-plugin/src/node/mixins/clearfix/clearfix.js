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
class postcssSugarPluginClearfixInterface extends __SInterface {
  static get _definition() {
    return {
      clearfix: {
        type: "String",
        values: ["overflow", "facebook", "micro", "after"],
        default: __STheme.config("helpers.clearfix.default")
      }
    };
  }
}
function clearfix_default({
  params,
  atRule,
  CssVars,
  replaceWith
}) {
  const finalParams = __spreadValues({
    clearfix: "overflow"
  }, params);
  const vars = new CssVars();
  switch (finalParams.clearfix) {
    case "facebook":
      vars.code(`
                display: table-cell;
                vertical-align: top;
                width: 10000px !important;
            `);
      break;
    case "micro":
      vars.code(`
                zoom: 1;
                &:before,
                &:after {
                    content: ' ';
                    display: table;
                }
                &:after {
                    clear: both;
                }
            `);
      break;
    case "after":
      vars.code(`
                &:after {
                    content: "";
                    clear: both;
                    display: table;
                }
            `);
      break;
    case "overflow":
      vars.code(`
                overflow: hidden;
            `);
      break;
  }
  return vars;
}
export {
  clearfix_default as default,
  postcssSugarPluginClearfixInterface as interface
};
