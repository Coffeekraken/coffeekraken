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
class postcssSugarPluginUiButtonInterface extends __SInterface {
  static get _definition() {
    return {
      style: {
        type: "String",
        values: ["solid", "gradient", "outline", "text"],
        default: __STheme.config("ui.button.defaultStyle")
      },
      shape: {
        type: "String",
        values: ["default", "square", "pill"],
        default: __STheme.config("ui.button.defaultShape")
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
        values: ["bare", "lnf", "shape"],
        default: ["bare", "lnf", "shape"]
      }
    };
  }
}
function button_default({
  params,
  atRule,
  applyNoScopes,
  sharedData,
  replaceWith
}) {
  const finalParams = __spreadValues({
    style: "solid",
    shape: "default",
    outline: true,
    scope: ["bare", "lnf", "shape"]
  }, params);
  finalParams.scope = applyNoScopes(finalParams.scope);
  const vars = [];
  if (finalParams.scope.indexOf("bare") !== -1) {
    vars.push(`
        font-size: sugar.scalable(1rem);
        position: relative;
        display: inline-block;
        cursor: pointer;
        white-space: nowrap;
        vertical-align: middle;
        padding-inline: sugar.theme(ui.button.paddingInline);
        padding-block: sugar.theme(ui.button.paddingBlock);

        & > * {
          pointer-events: none;
        }
        & > i,
        & > .s-icon {
          font-size: 1em;
        }
    `);
  }
  if (finalParams.scope.indexOf("lnf") !== -1) {
    vars.push(`
          font-size: sugar.scalable(1rem);
        `);
    switch (finalParams.style) {
      case "gradient":
        vars.push(`
                    background: none !important;
                    color: sugar.color(current, foreground);
                    transition: sugar.theme(ui.button.transition);
                    border: sugar.color(current, border) solid sugar.theme(ui.button.borderWidth);

                    --borderWidth: sugar.theme(ui.button.borderWidth);

                    & > * {
                      position: relative;
                      z-index: 1;
                    }

                    &:before {
                      content: '';
                      position: absolute;
                      top: 0;
                      left: 0;
                      width: 100%;
                      height: 100%;
                      @sugar.gradient(sugar.color(current, gradientStart), sugar.color(current, gradientEnd), $angle: 90);
                      transition: sugar.theme(ui.button.transition);
                    }

                    &:after {
                      content: '';
                      position: absolute;
                      top: 0;
                      left: 0;
                      width: 100%;
                      height: 100%;
                      @sugar.gradient(sugar.color(current,gradientEnd), sugar.color(current, gradientStart), $angle: 90);
                      opacity: 0;
                      transition: sugar.theme(ui.button.transition);
                    }

                    &:hover, &:focus {
                      color: sugar.color(current, foreground);

                      &:after {
                        opacity: 1;
                      }
                    }
                `);
        break;
      case "outline":
        vars.push(`
                background-color: sugar.color(current, --alpha 0);
                border: sugar.color(current) solid sugar.theme(ui.button.borderWidth);
                color: sugar.color(current);

                &:hover, &:focus {
                  background-color: sugar.color(current);
                  color: sugar.color(current, foreground);
                }
              `);
        break;
      case "text":
        vars.push(`
                  background: none !important;
                  border: rgba(0,0,0,0) solid sugar.theme(ui.button.borderWidth);
                  color: sugar.color(current);
                  box-shadow: none !important;

                  &:hover, &:focus {
                    color: sugar.color(current);
                    transform: scale(1.1);
                  }

                  @sugar.state.disabled {
                    transform: scale(1) !important;
                  }
                `);
        break;
      case "solid":
      default:
        vars.push(`
                  background-color: sugar.color(current);
                  border: sugar.color(current, border) solid sugar.theme(ui.button.borderWidth);
                  color: sugar.color(current, foreground);

                  &:hover, &:focus {
                    background-color: sugar.color(current, 60);
                    color: sugar.color(current, foreground);
                  }
        `);
        break;
    }
    if (finalParams.outline) {
      vars.push(`
              &:focus:not(:hover) {
                @sugar.outline;
              }
          `);
    }
  }
  if (finalParams.scope.includes("shape")) {
    switch (finalParams.shape) {
      case "square":
        vars.push(`
                    border-radius: 0;

                    &:before,
                    &:after {
                      border-radius: 0;
                    }
                  `);
        break;
      case "pill":
        vars.push(`
                    border-radius: 9999px;

                    &:before,
                    &:after {
                      border-radius: 9999px;
                    }
                  `);
        break;
      default:
        vars.push(`
                    border-radius: sugar.theme(ui.button.borderRadius);

                    &:before,
                    &:after {
                      border-radius: sugar.theme(ui.button.borderRadius);
                    }
                  `);
        break;
    }
  }
  return vars;
}
export {
  button_default as default,
  postcssSugarPluginUiButtonInterface as interface
};
