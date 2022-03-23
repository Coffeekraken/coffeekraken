import {
  __spreadValues
} from "../../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
import __STheme from "@coffeekraken/s-theme";
class postcssSugarPluginUiBlockquoteInterface extends __SInterface {
  static get _definition() {
    return {
      style: {
        type: "String",
        values: ["solid"],
        default: __STheme.config("ui.blockquote.defaultStyle")
      },
      shape: {
        type: "String",
        values: ["default", "square"],
        default: __STheme.config("ui.blockquote.defaultShape")
      },
      scope: {
        type: {
          type: "Array<String>",
          splitChars: [",", " "]
        },
        values: ["bare", "lnf", "shape"],
        default: ["bare", "lnf", "shape"]
      }
    };
  }
}
function blockquote_default({
  params,
  atRule,
  applyNoScopes,
  replaceWith
}) {
  const finalParams = __spreadValues({
    style: "solid",
    shape: "default",
    scope: ["bare", "lnf", "shape"]
  }, params);
  finalParams.scope = applyNoScopes(finalParams.scope);
  const vars = [];
  if (finalParams.scope.indexOf("bare") !== -1) {
    vars.push(`
            font-size: sugar.scalable(1rem);
        `);
  }
  switch (finalParams.style) {
    case "solid":
    default:
      if (finalParams.scope.indexOf("bare") !== -1) {
        vars.push(`
                            display: block;
                            padding-inline: sugar.theme(ui.blockquote.paddingInline);
                            padding-block: sugar.theme(ui.blockquote.paddingBlock);
                    `);
      }
      if (finalParams.scope.indexOf("lnf") !== -1) {
        vars.push(`
                            border-inline-start: sugar.theme(ui.blockquote.borderWidth) solid sugar.color(current);
                            color: sugar.color(current, surfaceForeground);
                            background-color: sugar.color(current, surface);
                            @sugar.depth(sugar.theme.value(ui.blockquote.depth));
                            font-size: sugar.scalable(1rem);

                            @sugar.font.family(quote);
                    `);
      }
      break;
  }
  if (finalParams.scope.includes("shape")) {
    switch (finalParams.shape) {
      case "square":
        vars.push(`
                    border-radius: 0;
                `);
        break;
      default:
        vars.push(`
                    border-radius: sugar.theme(ui.blockquote.borderRadius);
                `);
        break;
    }
  }
  return vars;
}
export {
  blockquote_default as default,
  postcssSugarPluginUiBlockquoteInterface as interface
};
