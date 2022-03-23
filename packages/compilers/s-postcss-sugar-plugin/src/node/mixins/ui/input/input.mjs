import {
  __spreadValues
} from "../../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
import __STheme from "@coffeekraken/s-theme";
class postcssSugarPluginUiFormInputInterface extends __SInterface {
  static get _definition() {
    return {
      style: {
        type: "String",
        values: ["solid"],
        default: __STheme.config("ui.input.defaultStyle")
      },
      shape: {
        type: "String",
        values: ["default", "square", "pill"],
        default: __STheme.config("ui.input.defaultShape")
      },
      outline: {
        type: "Boolean",
        default: __STheme.config("ui.input.outline")
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
function input_default({
  params,
  atRule,
  replaceWith
}) {
  const finalParams = __spreadValues({
    style: "solid",
    shape: "default",
    outline: true,
    scope: []
  }, params);
  const vars = [];
  if (finalParams.scope.indexOf("lnf") !== -1) {
    if (finalParams.outline) {
      vars.push(`
            @sugar.outline;
`);
    }
    vars.push(`
            @sugar.ui.base(input);
  `);
  }
  if (finalParams.scope.indexOf("bare") !== -1) {
    vars.push(`
            width: 100%;
        `);
  }
  switch (finalParams.style) {
    case "solid":
    default:
      break;
  }
  if (finalParams.scope.includes("shape")) {
    switch (finalParams.shape) {
      case "square":
        vars.push(`
                    border-radius: 0;
                `);
        break;
      case "pill":
        vars.push(`
                    border-radius: 9999px;
                `);
        break;
      default:
        vars.push(`
                    border-radius: sugar.theme(ui.input.borderRadius);
                `);
        break;
    }
  }
  return vars;
}
export {
  input_default as default,
  postcssSugarPluginUiFormInputInterface as interface
};
