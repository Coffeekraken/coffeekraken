import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
import __STheme from "@coffeekraken/s-theme";
class postcssSugarPluginBorderwidthMixinInterface extends __SInterface {
  static get _definition() {
    return {
      width: {
        type: "Number|String",
        required: true,
        default: __STheme.config("border.width.default")
      }
    };
  }
}
function width_default({
  params,
  atRule,
  CssVars,
  replaceWith
}) {
  const finalParams = __spreadValues({
    width: 0
  }, params);
  const vars = new CssVars(`border-width: sugar.border.width(${finalParams.width});`);
  return vars;
}
export {
  width_default as default,
  postcssSugarPluginBorderwidthMixinInterface as interface
};
