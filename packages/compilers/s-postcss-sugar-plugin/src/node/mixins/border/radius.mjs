import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
import __STheme from "@coffeekraken/s-theme";
class postcssSugarPluginBorderRadiusMixinInterface extends __SInterface {
  static get _definition() {
    return {
      radius: {
        type: "Number|String",
        required: true,
        default: __STheme.config("border.radius.default")
      }
    };
  }
}
function radius_default({
  params,
  atRule,
  CssVars,
  replaceWith
}) {
  const finalParams = __spreadValues({
    radius: 0
  }, params);
  const vars = new CssVars(`
        border-radius: sugar.border.radius(${finalParams.radius});
    `);
  return vars;
}
export {
  radius_default as default,
  postcssSugarPluginBorderRadiusMixinInterface as interface
};
