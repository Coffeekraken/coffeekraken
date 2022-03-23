import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
import __STheme from "@coffeekraken/s-theme";
class postcssSugarPluginScrollbarInterface extends __SInterface {
  static get _definition() {
    return {
      color: {
        type: "String",
        default: __STheme.config("ui.scrollbar.defaultColor")
      },
      background: {
        type: "String",
        default: __STheme.config("ui.scrollbar.defaultColor")
      },
      size: {
        type: "String",
        default: __STheme.config("ui.scrollbar.size")
      }
    };
  }
}
function scrollbar_default({
  params,
  atRule,
  replaceWith
}) {
  const finalParams = __spreadValues({
    size: "5px",
    color: "accent",
    background: "main"
  }, params);
  const vars = [];
  vars.push(`
      &::-webkit-scrollbar {
          width: ${finalParams.size};
          height: ${finalParams.size};
      }
      &::-webkit-scrollbar-track {
          background-color: sugar.color(${finalParams.background}, --alpha 0.1);
      }
      &::-webkit-scrollbar-thumb {
          background-color: sugar.color(${finalParams.color});
      }
  `);
  return vars;
}
export {
  scrollbar_default as default,
  postcssSugarPluginScrollbarInterface as interface
};
