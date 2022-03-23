import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
import __STheme from "@coffeekraken/s-theme";
class postcssSugarPluginUiBaseInterface extends __SInterface {
  static get _definition() {
    return {
      name: {
        type: "String",
        required: true
      },
      scope: {
        type: "String",
        default: ["bare", "lnf"]
      }
    };
  }
}
function base_default({
  params,
  atRule,
  replaceWith
}) {
  const finalParams = __spreadValues({
    name: "",
    scope: ["bare", "lnf"]
  }, params);
  if (!finalParams.name)
    return;
  const vars = [];
  if (finalParams.scope.indexOf("bare") !== -1) {
    vars.push(`
            font-size: sugar.scalable(1rem);
            display: inline-block;
            padding-inline: sugar.theme(ui.${finalParams.name}.paddingInline);
            padding-block: sugar.theme(ui.${finalParams.name}.paddingBlock);
        `);
  }
  if (finalParams.scope.indexOf("lnf") !== -1) {
    vars.push(`
            color: sugar.color(main, uiForeground);
            background-color: sugar.color(main, ui);
            font-size: sugar.scalable(1rem);
            border: sugar.color(current, --alpha 0.5) solid sugar.theme(ui.${finalParams.name}.borderWidth);
            border-radius: sugar.theme(ui.${finalParams.name}.borderRadius);
            transition: sugar.theme(ui.${finalParams.name}.transition);
            @sugar.depth(${__STheme.config(`ui.${finalParams.name}.depth`)});
            cursor: auto !important;

            &::placeholder {
                color: sugar.color(main, placeholder);
            }

            &::selection {
                color: sugar.color(current, 100);
                background-color: sugar.color(current);
            }

            @sugar.state.hover {
                border: sugar.color(current, --alpha 0.7) solid 1px;
            }
            @sugar.state.focus {
                border: sugar.color(current) solid 1px;
            }
            @sugar.state.active {
                border: sugar.color(current) solid 1px;
            }
    `);
  }
  return vars;
}
export {
  base_default as default,
  postcssSugarPluginUiBaseInterface as interface
};
