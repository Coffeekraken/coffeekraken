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
var filtrableInput_exports = {};
__export(filtrableInput_exports, {
  default: () => filtrableInput_default,
  interface: () => postcssUiFiltrableInputInterface
});
module.exports = __toCommonJS(filtrableInput_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"));
var import_s_theme = __toESM(require("@coffeekraken/s-theme"));
class postcssUiFiltrableInputInterface extends import_s_interface.default {
  static get _definition() {
    return {
      style: {
        type: "String",
        values: ["solid", "gradient", "outline", "text"],
        default: import_s_theme.default.config("ui.button.defaultStyle")
      },
      outline: {
        type: "Boolean",
        default: import_s_theme.default.config("ui.button.outline")
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
    style: import_s_theme.default.config("ui.button.defaultStyle"),
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  interface
});
