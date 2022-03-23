import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
import __astNodesToString from "../../utils/astNodesToString";
class postcssSugarPluginStateHoverMixinInterface extends __SInterface {
  static get _definition() {
    return {};
  }
}
function hover_default({
  params,
  atRule,
  replaceWith
}) {
  const finalParams = __spreadValues({
    className: ""
  }, params != null ? params : {});
  const vars = [];
  vars.push(`&:hover {`);
  vars.push(__astNodesToString(atRule.nodes));
  vars.push(`}`);
  return vars;
}
export {
  hover_default as default,
  postcssSugarPluginStateHoverMixinInterface as interface
};
