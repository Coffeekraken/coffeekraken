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
var theme_exports = {};
__export(theme_exports, {
  default: () => theme_default,
  interface: () => postcssSugarPluginThemeinInterface
});
module.exports = __toCommonJS(theme_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"), 1);
var import_s_theme = __toESM(require("@coffeekraken/s-theme"), 1);
class postcssSugarPluginThemeinInterface extends import_s_interface.default {
  static get _definition() {
    return {
      variant: {
        type: "String"
      },
      theme: {
        type: "String"
      },
      scope: {
        type: "Boolean",
        default: false
      }
    };
  }
}
function theme_default({
  params,
  atRule,
  replaceWith
}) {
  const finalParams = __spreadValues({
    variant: void 0,
    theme: void 0,
    scope: false
  }, params);
  const vars = import_s_theme.default.toCssVars(finalParams.theme, finalParams.variant);
  const selectors = [];
  if (finalParams.theme)
    selectors.push(`[theme^="${finalParams.theme}"]`);
  if (finalParams.variant)
    selectors.push(`[theme$="${finalParams.variant}"]`);
  if (finalParams.scope) {
    vars.unshift(`${selectors.length === 2 ? `${selectors[0]}${selectors[1]}` : selectors.join(",")} {`);
    vars.push(`@sugar.lnf.base;`);
    vars.push("}");
  } else if (atRule.parent.type === "root") {
    vars.unshift(":root {");
    vars.push(`@sugar.lnf.base;`);
    vars.push("}");
  } else {
    vars.push(`@sugar.lnf.base;`);
  }
  return vars;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  interface
});
