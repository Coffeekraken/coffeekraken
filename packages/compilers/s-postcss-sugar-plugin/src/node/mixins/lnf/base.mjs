import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
class postcssSugarPluginLiikAndFeelBaseInterface extends __SInterface {
  static get _definition() {
    return {};
  }
}
function base_default({
  params,
  atRule,
  replaceWith
}) {
  const finalParams = __spreadValues({}, params);
  const vars = [];
  const css = `
        color: sugar.color(main, text);
        @sugar.font.family(default);
        @sugar.font.size(default);
        @sugar.lnf.selection;

  `;
  vars.push(css);
  return vars;
}
export {
  base_default as default,
  postcssSugarPluginLiikAndFeelBaseInterface as interface
};
