import {
  __spreadValues
} from "../../../../../../../chunk-TD77TI6B.mjs";
import __SInterface from "@coffeekraken/s-interface";
import __STheme from "@coffeekraken/s-theme";
class postcssSugarPluginUiTabInterface extends __SInterface {
  static get _definition() {
    return {
      style: {
        type: "String",
        description: "Specify the style you want for your tabs",
        values: ["solid"],
        default: __STheme.config("ui.tabs.defaultStyle")
      },
      shape: {
        type: "String",
        description: "Specify the shape you want for your tabs",
        values: ["default", "square", "pill"],
        default: __STheme.config("ui.tabs.defaultShape")
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
        default: __STheme.config("ui.tabs.outline")
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
export {
  tabs_default as default,
  postcssSugarPluginUiTabInterface as interface
};
