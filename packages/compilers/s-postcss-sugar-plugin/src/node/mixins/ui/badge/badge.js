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
class postcssSugarPluginUiBadgeInterface extends __SInterface {
  static get _definition() {
    return {
      style: {
        type: "String",
        values: ["solid", "outline"],
        default: "solid"
      },
      shape: {
        type: "String",
        values: ["default", "square", "pill"],
        default: "default"
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
function badge_default({
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
        display: inline-block;
        white-space: nowrap;
        user-select: none;
    `);
  }
  if (finalParams.scope.indexOf("lnf") !== -1) {
    vars.push(`
            font-size: sugar.scalable(0.75em);
            padding-inline: sugar.theme(ui.badge.paddingInline);
            padding-block: sugar.theme(ui.badge.paddingBlock);
            vertical-align: baseline;

            & > * {
                @sugar.color(main);
            }

        `);
    switch (finalParams.style) {
      case "outline":
        vars.push(`
                position: relative;
                color: sugar.color(current);
                background: none !important;
                
                &:after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    right: 0;
                    border: sugar.color(current) solid sugar.theme(ui.badge.borderWidth);
                    pointer-events: none;
                }
            `);
        break;
      case "solid":
      default:
        vars.push(`
                     color: sugar.color(current, foreground);
                     background-color: sugar.color(current);
                `);
        break;
    }
  }
  if (finalParams.scope.indexOf("shape") !== -1) {
    switch (finalParams.shape) {
      case "square":
        vars.push(`
                    border-radius: 0;
                    &:after {
                        border-radius: 0;
                    }
            `);
        break;
      case "pill":
        vars.push(`
                    border-radius: 999999px;
                    &:after {
                        border-radius: 999999px;
                    }
                `);
        break;
      case "default":
      default:
        vars.push(`
                    border-radius: 0.5em;
                    &:after {
                        border-radius: 0.5em;
                    }
                `);
        break;
    }
  }
  return vars;
}
export {
  badge_default as default,
  postcssSugarPluginUiBadgeInterface as interface
};
