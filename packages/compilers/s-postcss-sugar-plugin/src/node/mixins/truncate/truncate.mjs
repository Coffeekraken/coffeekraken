import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
class postcssSugarPluginRatioInterface extends __SInterface {
  static get _definition() {
    return {
      lines: {
        type: "Number",
        required: true,
        default: 1
      }
    };
  }
}
function truncate_default({
  params,
  atRule,
  replaceWith
}) {
  const finalParams = __spreadValues({
    lines: 1
  }, params);
  const vars = [
    `
        display: block;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: ${finalParams.lines};
        line-clamp: ${finalParams.lines};
        overflow: hidden;
  `
  ];
  return vars;
}
export {
  truncate_default as default,
  postcssSugarPluginRatioInterface as interface
};
