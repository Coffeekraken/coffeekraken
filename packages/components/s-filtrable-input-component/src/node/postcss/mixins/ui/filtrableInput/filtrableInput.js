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
class postcssUiFiltrableInputInterface extends __SInterface {
  static get _definition() {
    return {
      style: {
        type: "String",
        values: ["solid", "gradient", "outline", "text"],
        default: __STheme.config("ui.button.defaultStyle")
      },
      outline: {
        type: "Boolean",
        default: __STheme.config("ui.button.outline")
      },
      scope: {
        type: {
          type: "Array<String>",
          splitChars: [",", " "]
        },
        values: ["bare", "lnf"],
        default: ["bare", "lnf"]
      }
    };
  }
}
function filtrableInput_default({
  params,
  atRule,
  applyNoScopes,
  sharedData,
  replaceWith
}) {
  const finalParams = __spreadValues({
    style: __STheme.config("ui.button.defaultStyle"),
    outline: true,
    scope: ["bare", "lnf"]
  }, params);
  finalParams.scope = applyNoScopes(finalParams.scope);
  const vars = [];
  if (finalParams.scope.indexOf("bare") !== -1) {
    vars.push(`
    `);
  }
  if (finalParams.scope.indexOf("lnf") !== -1) {
    vars.push(`
        
            .s-filtrable-input__dropdown {
                overflow: hidden;
                @sugar.depth(sugar.theme.value(ui.filtrableInput.depth));
                transition: sugar.theme(ui.filtrableInput.transition);
            }
            .s-filtrable-input__list {
                width: 100%;
                transition: sugar.theme(ui.filtrableInput.transition);
                @sugar.scrollbar;
            }
            .s-filtrable-input__list-item {
                transition: sugar.theme(ui.filtrableInput.transition);
            }
        `);
    switch (finalParams.style) {
      case "solid":
      default:
        vars.push(`

                .s-filtrable-input__dropdown {
                    background-color: sugar.color(secondary, background);
                    border-radius: sugar.theme(ui.filtrableInput.borderRadius);
                }

                .s-filtrable-input__list-item {
                    background-color: sugar.color(secondary, surface);  
                    padding-inline: sugar.theme(ui.filtrableInput.paddingInline);
                    padding-block: sugar.theme(ui.filtrableInput.paddingBlock);
                    border-top: 1px solid sugar.color(secondary, surface, --darken 5);

                    &:hover,
                    &:focus,
                    &:focus:not(.active),
                    &:focus:not(:active) {
                        &:not(.s-filtrable-input__list-no-item):not(.s-filtrable-input__list-loading) {
                            border-top: 1px solid sugar.color(secondary, --alpha 0);
                            background-color: sugar.color(secondary, --alpha 0.6);
                            color: sugar.color(secondary, foreground);
                        }
                    }

                    &.active,
                    &:active {
                        &:not(.s-filtrable-input__list-no-item):not(.s-filtrable-input__list-loading) {
                            border-top: 1px solid sugar.color(primary) !important;
                            background-color: sugar.color(primary) !important;
                            color: sugar.color(primary, foreground) !important;
                        }
                    }
                }
        `);
        break;
    }
    if (finalParams.outline) {
      vars.push(`
            

          `);
    }
  }
  return vars;
}
export {
  filtrableInput_default as default,
  postcssUiFiltrableInputInterface as interface
};
