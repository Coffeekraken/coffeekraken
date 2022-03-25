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
var switch_exports = {};
__export(switch_exports, {
  default: () => switch_default,
  interface: () => postcssSugarPluginUiSwitchMixinInterface
});
module.exports = __toCommonJS(switch_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"), 1);
var import_s_theme = __toESM(require("@coffeekraken/s-theme"), 1);
class postcssSugarPluginUiSwitchMixinInterface extends import_s_interface.default {
  static get _definition() {
    return {
      style: {
        type: "String",
        values: ["solid"],
        default: import_s_theme.default.config("ui.switch.defaultShape")
      },
      shape: {
        type: "String",
        values: ["default", "square", "pill"],
        default: import_s_theme.default.config("ui.switch.defaultShape")
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
function switch_default({
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
        
        font-size: sugar.scalable(0.8rem);

        --thumb-size: 1em;
        --thumb-color-active: sugar.color(main, surface);
        --thumb-color-inactive: sugar.color(current);
        --thumb-color-highlight: sugar.color(current, --alpha 0.2);

        --track-size: calc(var(--thumb-size) * 2);
        --track-padding: 0.2em;
        --track-color-active: sugar.color(current);
        --track-color-inactive: sugar.color(current, --alpha 0.1);

        --isLTR: 1;

        @sugar.direction.rtl {
            --isLTR: -1;
        }

        --thumb-position: 0%;
        --thumb-transition-duration: .25s;
        
        padding: var(--track-padding);
        inline-size: var(--track-size);
        block-size: var(--thumb-size);
        
        -webkit-appearance: none !important;
        -moz-appearance: none !important;
        appearance: none !important;
        pointer-events: all;
        cursor: pointer;
        touch-action: pan-y;
        outline-offset: 5px;
        box-sizing: content-box;

        flex-shrink: 0;
        display: grid;
        align-items: center;
        grid: [track] 1fr / [track] 1fr;

        &:checked {
            &::before {
            }
            &::after {
            }
        }

        &::before {
            --highlight-size: 0;

            content: "";
            cursor: pointer;
            pointer-events: none;
            grid-area: track;
            inline-size: var(--thumb-size);
            block-size: var(--thumb-size);
        }

        &::after {
            content: "";
            cursor: pointer;
            pointer-events: none;
            grid-area: track;
            inline-size: var(--thumb-size);
            block-size: var(--thumb-size);
        }

        &:not(:disabled):hover::before {
        }
        &:not(:disabled):focus::before {
        }

        &:checked {
            --thumb-position: calc((var(--track-size) - 100%) * var(--isLTR));
        }

        &:indeterminate {
            --thumb-position: calc(
                calc(calc(var(--track-size) / 2) - calc(var(--thumb-size) / 2))
                * var(--isLTR)
            );
        }

        @sugar.state.disabled {
            --thumb-color: transparent;
            @sugar.disabled;
        }

    `);
  }
  switch (finalParams.style) {
    case "solid":
      if (finalParams.scope.indexOf("lnf") !== -1) {
        vars.push(`
        
                    font-size: sugar.scalable(0.8rem);        
                    background: var(--track-color-inactive);

                    border: sugar.color(current, border) solid sugar.theme(ui.switch.borderWidth);
                    outline-offset: 5px;
                    
                    transition: sugar.theme(ui.switch.transition);

                    &:checked {
                        &::before {
                            background: var(--thumb-color-active) !important;
                        }
                        &::after {
                        }
                    }

                    &::before {
                        --highlight-size: 0;

                        background: var(--thumb-color-inactive);
                        box-shadow: 0 0 0 var(--highlight-size) var(--thumb-color-highlight);
                        transform: translateX(var(--thumb-position));
                        transition: sugar.theme(ui.switch.transition);
                    }

                    &::after {
                        background: rgba(255,255,25,0);
                        box-shadow: 0;
                        transition: sugar.theme(ui.switch.transition);
                    }

                    &:not(:disabled):hover::before {
                        --highlight-size: .5rem;
                    }
                    &:not(:disabled):focus::before {
                        --highlight-size: .25rem;
                    }

                    &:checked {
                        background: var(--track-color-active);
                    }

                `);
      }
      break;
  }
  if (finalParams.scope.includes("shape")) {
    switch (finalParams.shape) {
      case "square":
        vars.push(`
                    border-radius: 0;

                    &:after,
                    &:before {
                        border-radius: 0;
                    }
                `);
        break;
      case "pill":
        vars.push(`
                    border-radius: 9999px;

                    &:after,
                    &:before {
                        border-radius: 9999px;
                    }
                `);
        break;
      default:
        vars.push(`
                    border-radius: sugar.theme(ui.switch.borderRadius);

                    &:after,
                    &:before {
                        border-radius: sugar.theme(ui.switch.borderRadius);
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
