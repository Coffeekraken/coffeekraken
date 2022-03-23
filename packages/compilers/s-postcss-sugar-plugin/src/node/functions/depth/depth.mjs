import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
import __STheme from "@coffeekraken/s-theme";
class postcssSugarPluginDepthFunctionInterface extends __SInterface {
  static get _definition() {
    return {
      depth: {
        type: "Number|String",
        required: true
      }
    };
  }
}
function depth({
  params
}) {
  const finalParams = __spreadValues({}, params);
  return __STheme.cssVar(`depth.${finalParams.depth}`, false);
}
export {
  depth as default,
  postcssSugarPluginDepthFunctionInterface as interface
};
