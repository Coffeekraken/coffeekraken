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
class postcssSugarPluginUiFormSelectInterface extends __SInterface {
  static get _definition() {
    return {
      style: {
        type: "String",
        values: ["solid"],
        default: __STheme.config("ui.select.defaultStyle")
      },
      shape: {
        type: "String",
        values: ["default", "square", "pill"],
        default: __STheme.config("ui.select.defaultShape")
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
function select_default({
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
            @sugar.ui.base(select, $scope: bare);
          position: relative;
          -webkit-appearance: none;
          appearance: none;
          line-height: 1;
          outline: 0;
      `);
  }
  switch (finalParams.style) {
    case "solid":
    default:
      if (finalParams.scope.indexOf("lnf") !== -1) {
        vars.push(`
                @sugar.ui.base(select, $scope: lnf);
                overflow: hidden;

                &[multiple] option:checked,
                &[multiple] option[selected] {
                    -moz-appearance: none;
                    -webkit-appearance: none;
                    appearance: none;
                    background: sugar.color(current, --alpha 0.5);
                    color: sugar.color(current, uiForeground);
                }
                &[multiple]:focus option:checked,
                &[multiple]:focus option[selected] {
                    -moz-appearance: none;
                    -webkit-appearance: none;
                    appearance: none;
                    background: sugar.color(current, ui);
                    color: sugar.color(current, uiForeground);
                }

                &:not([multiple]) {
                    padding-inline-end: calc(sugar.theme(ui.select.paddingInline) + 1.5em);

                    --padding-inline: sugar.theme(ui.select.paddingInline);

                    background-repeat: no-repeat;
                    background-image: linear-gradient(45deg, transparent 50%, sugar.color(current) 50%), linear-gradient(135deg, sugar.color(current) 50%, transparent 50%);
                    background-position: right calc(var(--padding-inline) + 5px) top 50%, right var(--padding-inline) top 50%;
                    background-size: sugar.scalable(5px) sugar.scalable(5px), sugar.scalable(5px) sugar.scalable(5px);
                
                    [dir="rtl"] &,
                    &[dir="rtl"] {
                        background-position: left var(--padding-inline) top 50%, left calc(var(--padding-inline) + sugar.scalable(5px)) top 50%;
                    }
                }

                `);
        break;
      }
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
                    border-radius: sugar.theme(ui.select.borderRadius);
                `);
        break;
    }
  }
  return vars;
}
export {
  select_default as default,
  postcssSugarPluginUiFormSelectInterface as interface
};
