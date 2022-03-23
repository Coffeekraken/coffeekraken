import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
class postcssSugarPluginRatioInterface extends __SInterface {
  static get _definition() {
    return {
      ratio: {
        type: "Number",
        required: true,
        alias: "d"
      }
    };
  }
}
function ratio_default({
  params,
  atRule,
  replaceWith
}) {
  const finalParams = __spreadValues({
    ratio: 1
  }, params);
  const vars = [
    `
      aspect-ratio: ${finalParams.ratio};
  `
  ];
  return vars;
}
export {
  ratio_default as default,
  postcssSugarPluginRatioInterface as interface
};
