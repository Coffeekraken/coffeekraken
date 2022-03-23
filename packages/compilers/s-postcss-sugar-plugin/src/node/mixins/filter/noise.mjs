import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
class postcssSugarPluginDisabledInterface extends __SInterface {
  static get _definition() {
    return {
      frequency: {
        type: "Number",
        required: true,
        default: 0.65
      },
      width: {
        type: "String",
        required: true,
        default: "5000px"
      },
      height: {
        type: "String",
        required: true,
        default: "5000px"
      }
    };
  }
}
function noise_default({
  params,
  atRule,
  replaceWith
}) {
  const finalParams = __spreadValues({
    frequency: 0.65,
    width: "5000px",
    height: "5000px"
  }, params);
  const vars = [];
  vars.push(`
            filter: sugar.filter.noise($frequency: ${finalParams.frequency}, $width: ${finalParams.width}, $height: ${finalParams.height})#filter;
    `);
  return vars;
}
export {
  noise_default as default,
  postcssSugarPluginDisabledInterface as interface
};
