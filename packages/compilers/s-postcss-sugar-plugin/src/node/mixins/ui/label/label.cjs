var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
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
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var label_exports = {};
__export(label_exports, {
  default: () => label_default,
  interface: () => postcssSugarPluginUiLabelInterface
});
module.exports = __toCommonJS(label_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"), 1);
var import_s_theme = __toESM(require("@coffeekraken/s-theme"), 1);
class postcssSugarPluginUiLabelInterface extends import_s_interface.default {
  static get _definition() {
    return {
      style: {
        type: "String",
        values: ["inline", "block", "float"],
        default: import_s_theme.default.config("ui.label.defaultStyle")
      },
      shape: {
        type: "String",
        values: ["default", "square", "pill"],
        default: import_s_theme.default.config("ui.label.defaultShape")
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
    style: import_s_theme.default.config("ui.label.defaultStyle"),
    shape: import_s_theme.default.config("ui.label.defaultShape"),
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  interface
});
