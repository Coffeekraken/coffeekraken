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
