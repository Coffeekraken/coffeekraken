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
class postcssSugarPluginUiListInterface extends __SInterface {
  static get _definition() {
    return {
      style: {
        type: "String",
        values: ["dl", "ul", "ol", "icon"],
        default: __STheme.config("ui.list.defaultStyle")
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
function list_default({
  params,
  atRule,
  applyNoScopes,
  replaceWith
}) {
  const finalParams = __spreadValues({
    style: "dl",
    scope: ["bare", "lnf"]
  }, params);
  finalParams.scope = applyNoScopes(finalParams.scope);
  const vars = [];
  let bulletSelector = "&:before";
  if (finalParams.style === "icon") {
    bulletSelector = "& > i:first-child";
  }
  if (finalParams.scope.indexOf("bare") !== -1) {
    vars.push(`
        position: relative;
        font-size: sugar.font.size(30);

        ${finalParams.style === "ol" ? "counter-reset: s-ol-list;" : ""}

        & > * {
            display: block !important;
            padding-inline-start: 1em;
            margin-bottom: 0.3em;
            margin-top: 0.3em;
            line-height: 1.8;
        }
        `);
  }
  if (finalParams.scope.indexOf("lnf") !== -1) {
    vars.push(`
            & > * {
                ${bulletSelector} {
                    display: inline-block;
                    position: absolute;
                    left: 0.5em;
                    transform: translateX(-50%);
                    color: sugar.color(current);
                }

                & > *:not(i) {
                    @sugar.color(main);
                }
            }

            [dir="rtl"] & > *,
            &[dir="rtl"] > * {
                ${bulletSelector} {
                    left: auto;
                    right: 0;
                    transform: none;
                }
            }

        `);
    switch (finalParams.style) {
      case "ol":
        vars.push(`
                    & > * {
                        counter-increment: s-ol-list;

                        ${bulletSelector} {
                            content: counter(s-ol-list);
                            margin-top: 0.25em;
                            font-size: 0.7em;
                        }
                    }
                    `);
        break;
      case "icon":
        vars.push(`
                    & > * {
                        padding-inline-start: 1.5em;
                        &:before {
                            content: ' ' !important;
                        }

                        ${bulletSelector} {
                            margin-top: 0.25em;
                            font-size: 0.8em;
                        }
                    }

                `);
        break;
      case "ul":
        vars.push(`
                    & > * {
                        ${bulletSelector} {
                            content: "${__STheme.config("ui.list.bulletChar")}";
                            margin-top: 0.25em;
                            font-size: 0.7em;
                        }
                    }
                `);
        break;
      case "dl":
      default:
        vars.push(`
                    & > * {
                        padding-inline-start: 0;
                    }
                    `);
        break;
    }
  }
  return vars;
}
export {
  list_default as default,
  postcssSugarPluginUiListInterface as interface
};
