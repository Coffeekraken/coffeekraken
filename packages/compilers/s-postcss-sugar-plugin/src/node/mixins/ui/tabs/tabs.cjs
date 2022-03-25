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
var tabs_exports = {};
__export(tabs_exports, {
  default: () => tabs_default,
  interface: () => postcssSugarPluginUiTabInterface
});
module.exports = __toCommonJS(tabs_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"), 1);
var import_s_theme = __toESM(require("@coffeekraken/s-theme"), 1);
class postcssSugarPluginUiTabInterface extends import_s_interface.default {
  static get _definition() {
    return {
      style: {
        type: "String",
        description: "Specify the style you want for your tabs",
        values: ["solid"],
        default: import_s_theme.default.config("ui.tabs.defaultStyle")
      },
      shape: {
        type: "String",
        description: "Specify the shape you want for your tabs",
        values: ["default", "square", "pill"],
        default: import_s_theme.default.config("ui.tabs.defaultShape")
      },
      grow: {
        type: "Boolean",
        description: "Specify if you want your tabs to take all the available place of not",
        default: false
      },
      direction: {
        type: "String",
        description: "Specigy the direction of your tabs",
        values: ["vertical", "horizontal"],
        default: "horizontal"
      },
      outline: {
        type: "Boolean",
        description: "Specify if you want your tabs to have an outline on focus",
        default: import_s_theme.default.config("ui.tabs.outline")
      },
      scope: {
        type: {
          type: "Array<String>",
          splitChars: [",", " "]
        },
        description: "Specify the scope(s) you want to generate",
        values: ["bare", "lnf", "shape", "grow", "direction"],
        default: ["bare", "lnf", "shape", "grow", "direction"]
      }
    };
  }
}
function tabs_default({
  params,
  atRule,
  applyNoScopes,
  replaceWith
}) {
  const finalParams = __spreadValues({
    style: "solid",
    shape: "default",
    grow: false,
    direction: "horizontal",
    outline: true,
    scope: ["bare", "lnf", "grow", "direction"]
  }, params);
  finalParams.scope = applyNoScopes(finalParams.scope);
  const vars = [];
  if (finalParams.outline) {
    vars.push(`
        & > *:focus:not(:hover) {
          @sugar.outline;
        }
      `);
  }
  if (finalParams.scope.indexOf("bare") !== -1) {
    vars.push(`
        font-size: sugar.scalable(1rem);
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
    `);
  }
  if (finalParams.grow && finalParams.scope.indexOf("grow") !== -1) {
    vars.push(`
      ${finalParams.grow && finalParams.scope.indexOf("grow") !== -1 ? `
        & > * {
          flex-grow: 1;
        }
      ` : ""}
    `);
  }
  if (finalParams.scope.indexOf("lnf") !== -1) {
    vars.push(`
          user-select: none;

          & > * > * {
            @sugar.color(main);
          }

          & > * {
            text-align: center;
            padding-inline: sugar.theme(ui.tabs.paddingInline);
            padding-block: sugar.theme(ui.tabs.paddingBlock);
            transition: sugar.theme(ui.tabs.transition);
            cursor: pointer;
            display: block;      
          }
      `);
  }
  if (finalParams.scope.indexOf("lnf") !== -1) {
    switch (finalParams.style) {
      case "solid":
      default:
        vars.push(`
          & > * {
            @sugar.state.active {
              background-color: sugar.color(current);
              color: sugar.color(current, foreground);
            }
            @sugar.state.hover {
              background-color: sugar.color(current, --lighten 5);
              color: sugar.color(current, foreground);
            }       
          }
        `);
        break;
    }
  }
  if (finalParams.direction === "vertical" && finalParams.scope.indexOf("direction") !== -1) {
    vars.push(`
          display: block;

          & > * {
            display: block;
            text-align: inherit;
          }
        `);
  }
  if (finalParams.scope.includes("shape")) {
    switch (finalParams.shape) {
      case "square":
        vars.push(`
                border-radius: 0 !important;
                & > * {
                  border-radius: 0 !important;
                }
              `);
        break;
      case "pill":
        vars.push(`

                border-radius: 9999px;

                & > *:first-child {
                  border-top-left-radius: 9999px;
                  border-bottom-left-radius: 9999px;
                  border-top-right-radius: 0;
                  border-bottom-right-radius: 0;
                }
                & > *:last-child {
                  border-top-left-radius: 0;
                  border-bottom-left-radius: 0;
                  border-top-right-radius: 9999px;
                  border-bottom-right-radius: 9999px;
                }

                [dir="rtl"] & > *:first-child,
                &[dir="rtl"] > *:first-child {
                  border-top-left-radius: 0;
                  border-bottom-left-radius: 0;
                  border-top-right-radius: 9999px;
                  border-bottom-right-radius: 9999px;
                }
                [dir="rtl"] & > *:last-child,
                &[dir="rtl"] > *:last-child {
                  border-top-left-radius: 9999px;
                  border-bottom-left-radius: 9999px;
                  border-top-right-radius: 0;
                  border-bottom-right-radius: 0;
                }

                & > *:first-child:last-child {
                  border-top-left-radius: 9999px !important;
                  border-bottom-left-radius: 9999px !important;
                  border-top-right-radius: 9999px !important;
                  border-bottom-right-radius: 9999px !important;
                }

              `);
        if (finalParams.direction === "vertical") {
          vars.push(`
                    & > *:first-child {
                      border-top-left-radius: 9999px !important;
                      border-bottom-left-radius: 0 !important;
                      border-top-right-radius: 9999px !important;
                      border-bottom-right-radius: 0 !important;
                    }
                    & > *:last-child {
                      border-top-left-radius: 0 !important;
                      border-bottom-left-radius: 9999px !important;
                      border-top-right-radius: 0 !important;
                      border-bottom-right-radius: 9999px !important;
                    }
                  `);
        }
        break;
      default:
        vars.push(`

                border-radius: sugar.theme(ui.tabs.borderRadius);

                & > *:first-child {
                  border-top-left-radius: sugar.theme(ui.tabs.borderRadius);
                  border-bottom-left-radius: sugar.theme(ui.tabs.borderRadius);
                  border-top-right-radius: 0;
                  border-bottom-right-radius: 0;
                }
                & > *:last-child {
                  border-top-left-radius: 0;
                  border-bottom-left-radius: 0;
                  border-top-right-radius: sugar.theme(ui.tabs.borderRadius);
                  border-bottom-right-radius: sugar.theme(ui.tabs.borderRadius);
                }

                [dir="rtl"] & > *:first-child,
                &[dir="rtl"] > *:first-child {
                  border-top-left-radius: 0;
                  border-bottom-left-radius: 0;
                  border-top-right-radius: sugar.theme(ui.tabs.borderRadius);
                  border-bottom-right-radius: sugar.theme(ui.tabs.borderRadius);
                }
                [dir="rtl"] & > *:last-child,
                &[dir="rtl"] > *:last-child {
                  border-top-left-radius: sugar.theme(ui.tabs.borderRadius);
                  border-bottom-left-radius: sugar.theme(ui.tabs.borderRadius);
                  border-top-right-radius: 0;
                  border-bottom-right-radius: 0;
                }

                & > *:first-child:last-child {
                  border-top-left-radius: sugar.theme(ui.tabs.borderRadius) !important;
                  border-bottom-left-radius: sugar.theme(ui.tabs.borderRadius) !important;
                  border-top-right-radius: sugar.theme(ui.tabs.borderRadius) !important;
                  border-bottom-right-radius: sugar.theme(ui.tabs.borderRadius) !important;
                }
              `);
        if (finalParams.direction === "vertical") {
          vars.push(`
                    & > *:first-child {
                      border-top-left-radius: sugar.theme(ui.tabs.borderRadius) !important;
                      border-bottom-left-radius: 0 !important;
                      border-top-right-radius: sugar.theme(ui.tabs.borderRadius) !important;
                      border-bottom-right-radius: 0 !important;
                    }
                    & > *:last-child {
                      border-top-left-radius: 0 !important;
                      border-bottom-left-radius: sugar.theme(ui.tabs.borderRadius) !important;
                      border-top-right-radius: 0 !important;
                      border-bottom-right-radius: sugar.theme(ui.tabs.borderRadius) !important;
                    }
                  `);
        }
        break;
    }
  }
  return vars;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  interface
});
