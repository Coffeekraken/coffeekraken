var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
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
