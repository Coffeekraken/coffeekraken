import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
import __astNodesToString from "../../utils/astNodesToString";
class postcssSugarPluginStateActiveMixinInterface extends __SInterface {
  static get _definition() {
    return {};
  }
}
function active_default({
  params,
  atRule,
  replaceWith
}) {
  const finalParams = __spreadValues({
    className: ""
  }, params != null ? params : {});
  const vars = [];
  vars.push(`&:active:not(:hover), &.active, &[active] {`);
  vars.push(__astNodesToString(atRule.nodes));
  vars.push(`}`);
  return vars;
}
export {
  active_default as default,
  postcssSugarPluginStateActiveMixinInterface as interface
};
