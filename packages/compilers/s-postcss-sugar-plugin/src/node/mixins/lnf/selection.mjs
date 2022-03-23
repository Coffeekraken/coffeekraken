import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
class postcssSugarPluginLiikAndFeelSelectionInterface extends __SInterface {
  static get _definition() {
    return {};
  }
}
function selection_default({
  params,
  atRule,
  replaceWith
}) {
  const finalParams = __spreadValues({}, params);
  const vars = [];
  const css = `
    ::selection {
        color: sugar.color(accent, 100);
        background-color: sugar.color(accent);
    }
  `;
  vars.push(css);
  return vars;
}
export {
  selection_default as default,
  postcssSugarPluginLiikAndFeelSelectionInterface as interface
};
