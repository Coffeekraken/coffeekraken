import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
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
