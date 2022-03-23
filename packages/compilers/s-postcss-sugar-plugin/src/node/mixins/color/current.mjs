import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
class postcssSugarPluginColorCurrentMixinInterface extends __SInterface {
  static get _definition() {
    return {
      color: {
        type: "String",
        required: true
      }
    };
  }
}
function current_default({
  params,
  atRule,
  CssVars,
  replaceWith
}) {
  const finalParams = __spreadValues({
    color: ""
  }, params);
  const vars = new CssVars(`
        @sugar.color.remap(current, ${finalParams.color});
    `);
  return vars;
}
export {
  current_default as default,
  postcssSugarPluginColorCurrentMixinInterface as interface
};
