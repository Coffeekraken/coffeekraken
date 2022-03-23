import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
class postcssSugarPluginFormatTextlMixinInterface extends __SInterface {
  static get _definition() {
    return {};
  }
}
function text_default({
  params,
  atRule,
  unwrap,
  postcssApi
}) {
  var _a;
  const finalParams = __spreadValues({}, params != null ? params : {});
  (_a = atRule.nodes) == null ? void 0 : _a.forEach((node) => {
    if (node.selector && !node.selector.match(/^\.s-format--text/)) {
      node.selector = node.selector.split(",").map((sel) => {
        return `.s-format--text ${sel}:not(.s-format--none ${sel}), .preview .s-format--text ${sel}`;
      }).join(",");
    }
  });
  atRule.replaceWith(atRule.nodes);
}
export {
  text_default as default,
  postcssSugarPluginFormatTextlMixinInterface as interface
};
