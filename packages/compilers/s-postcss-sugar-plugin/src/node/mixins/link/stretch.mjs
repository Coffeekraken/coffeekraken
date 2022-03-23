import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
class postcssSugarPluginLinkStretchInterface extends __SInterface {
  static get _definition() {
    return {};
  }
}
function stretch_default({
  params,
  atRule,
  CssVars,
  replaceWith
}) {
  const finalParams = __spreadValues({}, params);
  const vars = new CssVars();
  vars.comment(() => `
    `).code(() => `
        &:after {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 1;
            pointer-events: auto;
            content: '';
            background-color: rgba(0, 0, 0, 0);
        }
    `);
  return vars;
}
export {
  stretch_default as default,
  postcssSugarPluginLinkStretchInterface as interface
};
