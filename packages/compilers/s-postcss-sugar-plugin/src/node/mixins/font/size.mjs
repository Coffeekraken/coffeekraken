import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
import __STheme from "@coffeekraken/s-theme";
class postcssSugarPluginFontSizeInterface extends __SInterface {
  static get _definition() {
    return {
      size: {
        type: "String|Number",
        values: Object.keys(__STheme.config("font.size")),
        required: true
      }
    };
  }
}
function size_default({
  params,
  atRule,
  replaceWith
}) {
  const finalParams = __spreadValues({
    size: 50
  }, params);
  const vars = [];
  vars.push(`font-size: sugar.font.size(${finalParams.size})`);
  return vars;
}
export {
  size_default as default,
  postcssSugarPluginFontSizeInterface as interface
};
