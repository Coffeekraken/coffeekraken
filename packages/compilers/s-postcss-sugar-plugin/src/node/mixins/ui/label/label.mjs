import {
  __spreadValues
} from "../../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
import __STheme from "@coffeekraken/s-theme";
class postcssSugarPluginUiLabelInterface extends __SInterface {
  static get _definition() {
    return {
      style: {
        type: "String",
        values: ["inline", "block", "float"],
        default: __STheme.config("ui.label.defaultStyle")
      },
      shape: {
        type: "String",
        values: ["default", "square", "pill"],
        default: __STheme.config("ui.label.defaultShape")
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
function label_default({
  params,
  atRule,
  applyNoScopes,
  replaceWith
}) {
  const finalParams = __spreadValues({
    style: __STheme.config("ui.label.defaultStyle"),
    shape: __STheme.config("ui.label.defaultShape"),
    scope: ["bare", "lnf", "shape"]
  }, params);
  finalParams.scope = applyNoScopes(finalParams.scope);
  const vars = [];
  if (finalParams.scope.indexOf("bare") !== -1) {
    vars.push(`
          width: 100%;
          font-size: sugar.font.size(30);

          > * {
            cursor: pointer;
          }
    `);
    switch (finalParams.style) {
      case "float":
        vars.push(`
                  display: block;
                  line-height: 1;
                  position: relative;

                  & > *:first-child {
                    margin-inline-start: 0;
                  }

                  --delta: 0.1em;
                  --top: sugar.theme(ui.form.paddingBlock);
                  --left: sugar.theme(ui.form.paddingInline);

                  & > *:not(input):not(textarea):not(select) {
                    top: calc(var(--top) + 0.6em + var(--delta));
                    left: 0;
                    padding-inline: sugar.theme(ui.form.paddingInline);
                    position: absolute;
                    z-index: 1;
                    transform: scale(1);
                    transform-origin: 0 0;
                    user-select: none;
                  }

                  &:focus,
                  &:focus-within {
                    & > *:not(input):not(textarea):not(select) {
                      top: calc(var(--top) + 0.2em);
                      left: 0.2em;
                      transform: scale(0.6);
                      opacity: 0.6;
                    }
                  }
                  & > input:not(:placeholder-shown):not([type="checkbox"]):not([type="radio"]) + *,
                  & > textarea:not(:placeholder-shown) + * {
                    top: calc(var(--top) + 0.2em);
                    left: 0.2em;
                    transform: scale(0.6);
                    opacity: 0.6;
                  }

                  [dir="rtl"] &,
                  &[dir="rtl"] {
                    & > *:not(input):not(textarea):not(select) {
                      left: auto;
                      right: 0;
                      transform-origin: 100% 0;
                    }
                    &:focus,
                    &:focus-within {
                      & > *:not(input):not(textarea):not(select) {
                        left: auto;
                        right: 0.2em;
                        opacity: 0.6;
                      }
                    }
                    & > input:not(:placeholder-shown):not([type="checkbox"]):not([type="radio"]) + *,
                    & > textarea:not(:placeholder-shown) + * {
                      left: auto;
                      right: 0.2em;
                      opacity: 0.6;
                    }
                  }

                  & > input:not([type="checkbox"]):not([type="radio"]),
                  & > textarea,
                  & > select {
                    width: 100%;
                    margin: 0;
                    padding-block-start: calc(sugar.theme(ui.form.paddingBlock, true) + 0.35em + var(--delta));
                    padding-block-end: calc(sugar.theme(ui.form.paddingBlock, true) + 0.35em + var(--delta));
                    
                  }

                  &:focus,
                  &:focus-within {
                    & > input:not([type="checkbox"]):not([type="radio"]),
                    & > textarea,
                    & > select {
                      padding-block-start: calc(sugar.theme(ui.form.paddingBlock, true) + 0.7em + calc(var(--delta) * 2));
                      padding-block-end: sugar.theme(ui.form.paddingBlock, true);
                    }
                  }
                  & > input:not(:placeholder-shown):not([type="checkbox"]):not([type="radio"]),
                  & > textarea:not(:placeholder-shown) {
                    padding-block-start: calc(sugar.theme(ui.form.paddingBlock, true) + 0.7em + calc(var(--delta) * 2));
                    padding-block-end: sugar.theme(ui.form.paddingBlock, true);
                  }

                  & > .disabled + *,
                  & > [disabled] + * {
                    @sugar.disabled();
                  }

                `);
        break;
      case "block":
        vars.push(`
                  display: flex;
                  justify-content: space-between;
                  gap: sugar.margin(20);
                  flex-direction: column;

                  & > *:first-child {
                    order: 2;
                  }
                  & > *:first-child:not([type="checkbox"]):not([type="radio"]) {
                    width: 100%;
                  }
                `);
        break;
      case "inline":
      default:
        vars.push(`
                  display: flex;
                  justify-content: space-between;    
                  gap: sugar.margin(20);

                  & > *:first-child {
                    order: 2;
                  }

                `);
        break;
    }
  }
  if (finalParams.scope.indexOf("lnf") !== -1) {
    switch (finalParams.style) {
      case "float":
        vars.push(`
                  
                  & > *:not(input):not(textarea):not(select) {
                    transition: sugar.theme(ui.label.transition);
                  }

                  & > *:not(input):not(textarea):not(select) {
                    color: sugar.color(current);
                  }

                  & > input:not([type="checkbox"]):not([type="radio"]),
                  & > textarea,
                  & > select {
                    transition: sugar.theme(ui.label.transition);

                    &::placeholder {
                      color: sugar.color(current, --alpha 0);
                    }
                  }

                  &:focus,
                  &:focus-within {
                    & > input:not([type="checkbox"]):not([type="radio"]),
                    & > textarea,
                    & > select {
                      &::placeholder {
                        color: sugar.color(current, placeholder);
                      }
                    }
                  }
                  & > input:not(:placeholder-shown):not([type="checkbox"]):not([type="radio"]),
                  & > textarea:not(:placeholder-shown) {
                    &::placeholder {
                      color: sugar.color(current, placeholder);
                    }
                  }

                `);
        break;
      case "inline":
      case "block":
      default:
        break;
    }
  }
  return vars;
}
export {
  label_default as default,
  postcssSugarPluginUiLabelInterface as interface
};
