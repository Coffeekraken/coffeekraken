import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
class postcssSugarPluginScalableFunctionInterface extends __SInterface {
  static get _definition() {
    return {
      value: {
        type: "String|Number",
        required: true
      }
    };
  }
}
function scalable_default({
  params
}) {
  const finalParams = __spreadValues({
    value: ""
  }, params);
  return `calc(${finalParams.value} * var(--s-scale, 1))`;
}
export {
  scalable_default as default,
  postcssSugarPluginScalableFunctionInterface as interface
};
