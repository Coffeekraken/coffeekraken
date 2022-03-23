import "../../../../chunk-PG3ZPS4G.mjs";
import __SThemeBase from "../shared/SThemeBase";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
import __SColor from "@coffeekraken/s-color";
import __clearTransmations from "@coffeekraken/sugar/js/dom/transmation/clearTransmations";
class STheme extends __SThemeBase {
  static setTheme(theme, variant, $context = document.querySelector("html")) {
    __clearTransmations(document.body, {
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
    const theme = __SSugarConfig.get("theme.theme");
    const variant = __SSugarConfig.get("theme.variant");
    if (!$context.hasAttribute("theme")) {
      return this.getTheme(theme, variant);
    }
    let attr = (_a = $context.getAttribute("theme")) != null ? _a : "", parts = attr.split("-").map((l) => l.trim());
    if (parts.length === 2) {
      return this.getTheme(parts[0], parts[1]);
    }
    const themes = __SSugarConfig.get("theme.themes");
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
    const colorInstance = new __SColor(value);
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
    const color = new __SColor(style.backgroundColor);
    $wrapper.remove();
    return color;
  }
}
export {
  STheme as default
};
