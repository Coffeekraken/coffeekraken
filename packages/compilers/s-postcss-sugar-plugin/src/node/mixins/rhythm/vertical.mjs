import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
class postcssSugarPluginRhythmVerticalMixinInterface extends __SInterface {
  static get _definition() {
    return {};
  }
}
function vertical_default({
  params,
  atRule,
  postcssApi
}) {
  var _a;
  const finalParams = __spreadValues({}, params != null ? params : {});
  (_a = atRule.nodes) == null ? void 0 : _a.forEach((node) => {
    if (!node.selector)
      return;
    node.selector = node.selector.split(",").map((sel) => {
      return `.s-rhythm--vertical > ${sel}`;
    }).join(",");
  });
  atRule.replaceWith(atRule.nodes);
}
export {
  vertical_default as default,
  postcssSugarPluginRhythmVerticalMixinInterface as interface
};
