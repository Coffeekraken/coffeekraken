import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var STheme_exports = {};
__export(STheme_exports, {
  default: () => STheme
});
module.exports = __toCommonJS(STheme_exports);
var import_SThemeBase = __toESM(require("../shared/SThemeBase"));
var import_s_sugar_config = __toESM(require("@coffeekraken/s-sugar-config"));
var import_s_color = __toESM(require("@coffeekraken/s-color"));
var import_clearTransmations = __toESM(require("@coffeekraken/sugar/js/dom/transmation/clearTransmations"));
class STheme extends import_SThemeBase.default {
  static setTheme(theme, variant, $context = document.querySelector("html")) {
    (0, import_clearTransmations.default)(document.body, {
      timeout: 100
    });
    if (theme && variant) {
      $context.setAttribute("theme", `${theme}-${variant}`);
    } else if (theme) {
      $context.setAttribute("theme", theme);
    } else if (variant) {
      $context.setAttribute("theme", variant);
    }
    return this.getCurrentTheme($context);
  }
  static setThemeVariant(variant, $context = document.querySelector("html")) {
    return this.setTheme(void 0, variant, $context);
  }
  static getCurrentTheme($context = document.body) {
    var _a;
    const theme = import_s_sugar_config.default.get("theme.theme");
    const variant = import_s_sugar_config.default.get("theme.variant");
    if (!$context.hasAttribute("theme")) {
      return this.getTheme(theme, variant);
    }
    let attr = (_a = $context.getAttribute("theme")) != null ? _a : "", parts = attr.split("-").map((l) => l.trim());
    if (parts.length === 2) {
      return this.getTheme(parts[0], parts[1]);
    }
    const themes = import_s_sugar_config.default.get("theme.themes");
    for (let [key, value] of Object.entries(themes)) {
      if (key === `${parts[0]}-${variant}` || key === `${theme}-${parts[0]}`) {
        const p = key.split("-").map((l) => l.trim()), t = p[0], v = p[1];
        console.log("AA", t, v);
        return this.getTheme(t, v);
      }
    }
    throw new Error(`The requested current theme with the "theme" attribute "${$context.getAttribute("theme")}" on the context "${$context}" does not exists...`);
  }
  constructor(theme, variant) {
    super(theme, variant);
  }
  static applyCurrentColor(color, $context = document.body) {
    const vars = this.remapCssColor("current", color);
    for (let [key, value] of Object.entries(vars.properties)) {
      $context.style.setProperty(key, value);
    }
  }
  setColor(color, value, $context = document.body) {
    const colorInstance = new import_s_color.default(value);
    $context.style.setProperty(`--s-theme-color-${color}-h`, colorInstance.h);
    $context.style.setProperty(`--s-theme-color-${color}-s`, colorInstance.s);
    $context.style.setProperty(`--s-theme-color-${color}-l`, colorInstance.l);
  }
  getColor(name, variant, $context = document.body) {
    const $elm = document.createElement("p");
    $elm.classList.add(`s-bg--${name}${variant ? `-${variant}` : ""}`);
    const $wrapper = document.createElement("div");
    $wrapper.setAttribute("hidden", "true");
    $wrapper.setAttribute("theme", this.name);
    $wrapper.setAttribute("variant", this.variant);
    $wrapper.appendChild($elm);
    $context.appendChild($wrapper);
    const style = getComputedStyle($elm);
    const color = new import_s_color.default(style.backgroundColor);
    $wrapper.remove();
    return color;
  }
}
