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
var list_exports = {};
__export(list_exports, {
  default: () => list_default,
  interface: () => postcssSugarPluginUiListInterface
});
module.exports = __toCommonJS(list_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"), 1);
var import_s_theme = __toESM(require("@coffeekraken/s-theme"), 1);
class postcssSugarPluginUiListInterface extends import_s_interface.default {
  static get _definition() {
    return {
      style: {
        type: "String",
        values: ["dl", "ul", "ol", "icon"],
        default: import_s_theme.default.config("ui.list.defaultStyle")
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
                            content: "${import_s_theme.default.config("ui.list.bulletChar")}";
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  interface
});
