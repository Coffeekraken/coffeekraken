import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
class postcssSugarPluginDirectionRtlMixinInterface extends __SInterface {
  static get _definition() {
    return {};
  }
}
function rtl_default({
  params,
  atRule,
  postcssApi,
  replaceWith
}) {
  const finalParams = __spreadValues({
    className: ""
  }, params != null ? params : {});
  const rule = new postcssApi.Rule({
    selector: '[dir="rtl"] &, &[dir="rtl"]'
  });
  atRule.nodes.forEach((node) => {
    rule.append(node);
  });
  atRule.replaceWith(rule);
}
export {
  rtl_default as default,
  postcssSugarPluginDirectionRtlMixinInterface as interface
};
