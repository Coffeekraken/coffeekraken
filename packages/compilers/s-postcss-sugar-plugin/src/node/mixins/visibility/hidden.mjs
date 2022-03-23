import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
class postcssSugarPluginVisuallyHiddenMixinInterface extends __SInterface {
  static get _definition() {
    return {};
  }
}
function hidden_default({
  params,
  atRule,
  replaceWith
}) {
  const finalParams = __spreadValues({}, params != null ? params : {});
  const vars = [
    `
        clip: rect(0 0 0 0);
        clip-path: inset(50%);
        height: 1px;
        overflow: hidden;
        position: absolute;
        white-space: nowrap;
        width: 1px;
    `
  ];
  return vars;
}
export {
  hidden_default as default,
  postcssSugarPluginVisuallyHiddenMixinInterface as interface
};
