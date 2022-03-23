import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
import __STheme from "@coffeekraken/s-theme";
class postcssSugarPluginDisabledInterface extends __SInterface {
  static get _definition() {
    return {};
  }
}
function disabled_default({
  params,
  atRule,
  replaceWith
}) {
  const finalParams = __spreadValues({}, params);
  const vars = [];
  vars.push(`
        opacity: ${__STheme.cssVar("helpers.disabled.opacity")} !important;
        
        &:hover, &:focus, &:active {
            opacity: ${__STheme.cssVar("helpers.disabled.opacity")} !important;
        }

        &, * {
            cursor: not-allowed !important;
            user-select: none !important;
        }

    `);
  return vars;
}
export {
  disabled_default as default,
  postcssSugarPluginDisabledInterface as interface
};
