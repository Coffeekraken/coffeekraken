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
var spinner_exports = {};
__export(spinner_exports, {
  default: () => spinner_default,
  interface: () => postcssSugarPluginUiLoaderSpinnerMixinInterface
});
module.exports = __toCommonJS(spinner_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"), 1);
var import_s_theme = __toESM(require("@coffeekraken/s-theme"), 1);
class postcssSugarPluginUiLoaderSpinnerMixinInterface extends import_s_interface.default {
  static get _definition() {
    return {
      name: {
        type: "String",
        default: "s-loader-spinner"
      },
      duration: {
        type: "String",
        default: import_s_theme.default.config("ui.loaderSpinner.duration")
      },
      easing: {
        type: "String",
        default: import_s_theme.default.config("ui.loaderSpinner.easing")
      }
    };
  }
}
function spinner_default({
  params,
  atRule,
  replaceWith
}) {
  const finalParams = __spreadValues({
    name: "",
    duration: "",
    easing: ""
  }, params);
  const vars = [];
  vars.push(`
    display: inline-block;
    pointer-events: none;
    text-indent: -9999em;
    border-top: 0.3em solid sugar.color(current, --alpha 0.8);
    border-right: 0.3em solid sugar.color(current, --alpha 0.8);
    border-bottom: 0.3em solid sugar.color(current, --alpha 0.8);
    border-left: 0.3em solid rgba(0,0,0,0);
    border-radius: 50%;
    width: sugar.scalable(1em);
    height: sugar.scalable(1em);
    animation: ${finalParams.name} ${finalParams.duration} ${finalParams.easing} infinite;
    
    @keyframes ${finalParams.name} {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
  `);
  return vars;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  interface
});
