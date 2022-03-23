import {
  __spreadValues
} from "../../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
import __STheme from "@coffeekraken/s-theme";
class postcssSugarPluginUiTerminalInterface extends __SInterface {
  static get _definition() {
    return {};
  }
}
function terminal_default({
  params,
  atRule,
  replaceWith
}) {
  const finalParams = __spreadValues({}, params);
  const vars = [`@sugar.ui.base(terminal);`];
  vars.push(`
      &:before {
          content: '$';
          color: sugar.color(complementary);
      }

      @sugar.rhythm.vertical {
        ${__STheme.jsObjectToCssProperties(__STheme.config("ui.terminal.rhythmVertical"))}
    } 

    `);
  return vars;
}
export {
  terminal_default as default,
  postcssSugarPluginUiTerminalInterface as interface
};
