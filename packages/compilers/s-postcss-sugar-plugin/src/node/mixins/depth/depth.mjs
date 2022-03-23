import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
class postcssSugarPluginDepthInterface extends __SInterface {
  static get _definition() {
    return {
      depth: {
        type: "Number|String",
        required: true,
        alias: "d"
      },
      type: {
        type: "String",
        values: ["box", "text"],
        default: "box"
      }
    };
  }
}
function depth_default({
  params,
  atRule,
  replaceWith
}) {
  const finalParams = __spreadValues({
    depth: 0,
    type: "box"
  }, params);
  const vars = [`${finalParams.type}-shadow: sugar.depth(${finalParams.depth});`];
  return vars;
}
export {
  depth_default as default,
  postcssSugarPluginDepthInterface as interface
};
