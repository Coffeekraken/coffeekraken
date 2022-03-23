import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
class postcssSugarPluginColorPrimaryMixinInterface extends __SInterface {
  static get _definition() {
    return {
      color: {
        type: "String",
        required: true
      }
    };
  }
}
function primary_default({
  params,
  atRule,
  CssVars,
  replaceWith
}) {
  const finalParams = __spreadValues({
    color: ""
  }, params);
  const vars = [
    `
        @sugar.color.remap(primary, ${finalParams.color});
    `
  ];
  return vars;
}
export {
  primary_default as default,
  postcssSugarPluginColorPrimaryMixinInterface as interface
};
