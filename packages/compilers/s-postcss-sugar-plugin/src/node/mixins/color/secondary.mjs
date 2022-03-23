import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
class postcssSugarPluginColorSecondaryMixinInterface extends __SInterface {
  static get _definition() {
    return {
      color: {
        type: "String",
        required: true
      }
    };
  }
}
function secondary_default({
  params,
  atRule,
  replaceWith
}) {
  const finalParams = __spreadValues({
    color: ""
  }, params);
  const vars = [
    `
        @sugar.color.remap(secondary, ${finalParams.color});
    `
  ];
  return vars;
}
export {
  secondary_default as default,
  postcssSugarPluginColorSecondaryMixinInterface as interface
};
