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
var fsTree_exports = {};
__export(fsTree_exports, {
  default: () => fsTree_default,
  interface: () => postcssSugarPluginUiFsTreeInterface
});
module.exports = __toCommonJS(fsTree_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"), 1);
var import_s_theme = __toESM(require("@coffeekraken/s-theme"), 1);
class postcssSugarPluginUiFsTreeInterface extends import_s_interface.default {
  static get _definition() {
    return {
      style: {
        type: "String",
        values: ["solid"],
        default: import_s_theme.default.config("ui.fsTree.defaultStyle")
      },
      shape: {
        type: "String",
        values: ["default", "square", "pill"],
        default: import_s_theme.default.config("ui.fsTree.defaultShape")
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
function fsTree_default({
  params,
  atRule,
  atRootStart,
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
  atRootStart(`
         :root {
            --s-fs-tree-inline-space-ratio: 1;
        }
    `);
  if (finalParams.scope.indexOf("bare") !== -1) {
    vars.push(`
            font-size: sugar.font.size(30);
            user-select: none;


            li > div {
                position: relative;
                margin-inline-start: cale(1em * var(--s-fs-tree-inline-space-ratio, 1));
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;

                > a {
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                &:before {
                    content: '';
                    display: block;
                    font-weight:bold;
                    position: absolute;
                    z-index: -1;
                    top: 0;
                    left: calc(0.5em * var(--s-fs-tree-inline-space-ratio, 1));
                    width: 1px; height: 100%;
                    background-color: sugar.color(current, border);
                }

                &:after {
                    content: '';
                    display: block;
                    font-weight:bold;
                    position: absolute;
                    z-index: -1;
                    bottom: 0;
                    left: calc(0.5em * var(--s-fs-tree-inline-space-ratio, 1));
                    width: 1em;
                    height: 1px;
                    background-color: sugar.color(current, border);
                }


            }


            li {
                position: relative;

                > div {
                    padding-inline: sugar.theme(ui.fsTree.paddingInline);
                    padding-block: sugar.theme(ui.fsTree.paddingBlock);
                    border-radius: sugar.theme(ui.fsTree.borderRadius);
                    text-overflow: ellipsis;
                }

                &:not(.s-disabled &) {
                    cursor: pointer;
                }

                & > i.s-when--active,
                & > div > i.s-when--active {
                    display: none;
                }
                &.active, &[active] {
                    & > i.s-when--active,
                    & > div i.s-when--active {
                        display: inline-block;

                        & + i {
                            display: none;
                        }
                    }
                }

                &.active, &[active] {
                    & > div {
                        font-weight: bold;
                    }
                }

                &:not(.active, [active]) > ul,
                &:not(.active, [active]) > ol {
                    display: none;
                }


                & > [tabindex]:focus:not(:hover):not(.s-disabled &) {
                    @sugar.outline;
                }

                & > ul,
                & > ol {
                    margin-inline-start: calc(0.5em * var(--s-fs-tree-inline-space-ratio, 1));
                }

                &:hover, &:focus, &:focus-within {

                    > ul > li:before,
                    > ol > li:before {
                        background-color: sugar.color(current, --alpha 0.5);
                    }
                }
            }

            @sugar.direction.rtl {
                ul, ol {
                    li {
                        &:before {
                            top: 0;
                            right: calc(0.15em * var(--s-fs-tree-inline-space-ratio, 1));
                            left: auto;
                        }
                    }
                }
            }

        `);
  }
  if (finalParams.scope.indexOf("lnf") !== -1) {
    vars.push(`
            
        `);
    switch (finalParams.style) {
      case "solid":
      default:
        vars.push(`
                    li:not(.s-disabled) {
                        > div:hover {
                            background-color: sugar.color(current, surface);
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
                    li {
                        & > div {
                            border-radius: 0;
                        }
                    }
                `);
        break;
      case "pill":
        vars.push(`
                    li {
                        & > div {
                            border-radius: 9999px;
                        }
                    }
                `);
        break;
      default:
        vars.push(`
                    li {
                        & > div {
                            border-radius: sugar.theme(ui.fsTree.borderRadius);
                        }
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
