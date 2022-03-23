import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
import __astNodesToString from "../../utils/astNodesToString";
class postcssSugarPluginStateDisabledMixinInterface extends __SInterface {
  static get _definition() {
    return {};
  }
}
function disabled_default({
  params,
  atRule,
  replaceWith
}) {
  const finalParams = __spreadValues({
    className: ""
  }, params != null ? params : {});
  const vars = [];
  vars.push(`&:disabled, &[disabled] {`);
  vars.push(__astNodesToString(atRule.nodes));
  vars.push(`}`);
  return vars;
}
export {
  disabled_default as default,
  postcssSugarPluginStateDisabledMixinInterface as interface
};
