import {
  __spreadProps,
  __spreadValues
} from "../../../../chunk-JETN4ZEY.mjs";
import __SClass from "@coffeekraken/s-class";
import __SColor from "@coffeekraken/s-color";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
import __get from "@coffeekraken/sugar/shared/object/get";
import __flatten from "@coffeekraken/sugar/shared/object/flatten";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
import __dashCase from "@coffeekraken/sugar/shared/string/dashCase";
import __knownCssProperties from "known-css-properties";
import __objectHash from "object-hash";
import __isColor from "@coffeekraken/sugar/shared/is/color";
class SThemeBase extends __SClass {
  get id() {
    return `${this.name}-${this.variant}`;
  }
  static get theme() {
    return __SSugarConfig.get("theme.theme");
  }
  static get variant() {
    return __SSugarConfig.get("theme.variant");
  }
  static get themes() {
    return Object.keys(__SSugarConfig.get("theme.themes"));
  }
  static getTheme(theme, variant) {
    if (!theme) {
      theme = __SSugarConfig.get("theme.theme");
    }
    if (!variant) {
      variant = __SSugarConfig.get("theme.variant");
    }
    if (this._instanciatedThemes[`${theme}-${variant}`])
      return this._instanciatedThemes[`${theme}-${variant}`];
    const themes = __SSugarConfig.get("theme.themes");
    if (!themes[`${theme}-${variant}`])
      throw new Error(`<red>[${this.name}]</red> Sorry but the requested theme "<yellow>${theme}-${variant}</yellow>" does not exists. Here's the available themes: <green>${Object.keys(themes).join(",")}</green>`);
    this._instanciatedThemes[`${theme}-${variant}`] = new this(theme, variant);
    return this._instanciatedThemes[`${theme}-${variant}`];
  }
  static hash(dotPath = "") {
    const config = this.config(dotPath);
    return __objectHash(config);
  }
  static cssVar(dotPath, fallback = true) {
    let fb = this.getTheme().config(dotPath);
    if (!fallback || typeof fb === "string" && fb.includes(","))
      fb = 0;
    const v = `var(${`--s-theme-${dotPath.replace(/\./gm, "-").replace(/:/gm, "-").replace(/\?/gm, "").replace(/--/gm, "-")}`}, ${fb})`;
    return v;
  }
  static buildMediaQuery(queryString) {
    const currentQueryList = [this.config("media.defaultQuery"), "and"];
    const queryAr = queryString.split(" ").map((l) => l.trim());
    queryAr.forEach((query, i) => {
      if (query === "and" || query === "or") {
        currentQueryList.push(query);
        return;
      }
      const firstChar = query.slice(0, 1);
      const firstTwoChar = query.slice(0, 2);
      const lastChar = query.slice(-1);
      let action = this.config("media.defaultAction");
      let mediaName = query;
      if (lastChar === "-" || lastChar === "|")
        mediaName = mediaName.slice(0, -1);
      if (firstTwoChar === ">=" || firstTwoChar === "<=" || firstTwoChar === "==") {
        mediaName = mediaName.slice(2);
        action = firstTwoChar;
      } else if (firstChar === "<" || firstChar === ">" || firstChar === "=") {
        mediaName = mediaName.slice(1);
        action = firstChar;
      }
      const mediaQueryConfig = this.config("media.queries")[mediaName];
      if (!mediaQueryConfig)
        throw new Error(`<red>[postcssSugarPlugin.media]</red> Sorry but the requested media "<yellow>${mediaName}</yellow>" does not exists in the config. Here's the available medias: ${Object.keys(this.config("media.queries")).map((l) => `<green>${l}</green>`).join(",")}`);
      const queryList = [];
      Object.keys(mediaQueryConfig).forEach((prop) => {
        const value = mediaQueryConfig[prop];
        if (!value)
          return;
        if ([
          "min-width",
          "max-width",
          "min-device-width",
          "max-device-width"
        ].indexOf(prop) !== -1) {
          if (action === ">") {
            if (prop === "max-width" || prop === "max-device-width") {
              let argName = "min-width";
              if (prop.includes("-device"))
                argName = "min-device-width";
              queryList.push(`(${argName}: ${value + 1}px)`);
            }
          } else if (action === "<") {
            if (prop === "min-width" || prop === "min-device-width") {
              let argName = "max-width";
              if (prop.includes("-device"))
                argName = "max-device-width";
              queryList.push(`(${argName}: ${value}px)`);
            }
          } else if (action === "=") {
            queryList.push(`(${prop}: ${value}px)`);
          } else if (action === ">=") {
            if (prop === "min-width" || prop === "min-device-width") {
              queryList.push(`(${prop}: ${value}px)`);
            }
          } else if (action === "<=") {
            if (prop === "max-width" || prop === "max-device-width") {
              queryList.push(`(${prop}: ${value}px)`);
            }
          } else {
            queryList.push(`(${prop}: ${value}px)`);
          }
        } else {
          queryList.push(`(${prop}: ${value}px)`);
        }
      });
      if (lastChar === "-") {
        queryList.push("(orientation: landscape)");
      } else if (lastChar === "|") {
        queryList.push("(orientation: portrait)");
      }
      currentQueryList.push(queryList.join(" and "));
    });
    return `@media ${currentQueryList.join(" ")}`;
  }
  static jsObjectToCssProperties(jsObject, settings) {
    const finalSettings = __deepMerge({
      exclude: [],
      only: []
    }, settings);
    const propsStack = [];
    Object.keys(jsObject).forEach((prop) => {
      if (finalSettings.exclude.indexOf(prop) !== -1)
        return;
      if (finalSettings.exclude.indexOf(__dashCase(prop)) !== -1)
        return;
      const originalProp = prop;
      prop = __dashCase(prop).trim();
      if (finalSettings.exclude.length && finalSettings.exclude.indexOf(prop) !== -1)
        return;
      if (finalSettings.only.length && finalSettings.only.indexOf(prop) === -1)
        return;
      const value = jsObject[originalProp];
      if (!value)
        return;
      let color, modifier;
      const medias = Object.keys(this.config("media.queries"));
      if (medias.includes(originalProp)) {
        propsStack.push(`@sugar.media(${prop.replace(/^@/, "")}) {`);
        propsStack.push(this.jsObjectToCssProperties(value, finalSettings));
        propsStack.push(`}`);
      } else {
        switch (prop) {
          case "font-family":
            propsStack.push(`@sugar.font.family(${value});`);
            break;
          case "font-size":
            propsStack.push(`@sugar.font.size(${value});`);
            break;
          case "color":
            color = value;
            modifier = "";
            if (Array.isArray(value)) {
              color = value[0];
              modifier = value[1];
            }
            propsStack.push(`color: sugar.color(${color}, ${modifier});`);
            break;
          case "background-color":
            color = value;
            modifier = "";
            if (Array.isArray(value)) {
              color = value[0];
              modifier = value[1];
            }
            propsStack.push(`background-color: sugar.color(${color}, ${modifier});`);
            break;
          case "border-radius":
          case "border-top-left-radius":
          case "border-top-right-radius":
          case "border-bottom-right-radius":
          case "border-bottom-left-radius":
            propsStack.push(`border-radius: sugar.border.radius(${value});`);
            break;
          case "border-width":
            propsStack.push(`border-width: sugar.border.width(${value});`);
            break;
          case "transition":
            propsStack.push(`transition: sugar.transition(${value});`);
            break;
          case "margin-inline":
          case "margin-block":
          case "margin-inline-start":
          case "margin-inline-end":
          case "margin-block-start":
          case "margin-block-end":
          case "margin":
          case "margin-top":
          case "margin-bottom":
          case "margin-left":
          case "margin-right":
            propsStack.push(`${prop}: sugar.margin(${value});`);
            break;
          case "padding-inline":
          case "padding-block":
          case "padding-inline-start":
          case "padding-inline-end":
          case "padding-block-start":
          case "padding-block-end":
          case "padding":
          case "padding-top":
          case "padding-bottom":
          case "padding-left":
          case "padding-right":
            propsStack.push(`${prop}: sugar.padding(${value});`);
            break;
          case "depth":
            propsStack.push(`@sugar.depth(${value});`);
            break;
          case "default-color":
            propsStack.push(`@sugar.color(${value});`);
            break;
          default:
            const props = __knownCssProperties.all;
            if (props.indexOf(prop) === -1)
              return;
            propsStack.push(`${prop}: ${value};`);
            break;
        }
      }
    });
    return propsStack.join("\n");
  }
  static remapCssColor(from, to) {
    const result = {
      vars: [],
      properties: {}
    };
    if (__isColor(to)) {
      const color = new __SColor(to);
      result.vars = [
        `--s-theme-color-${from}-h: ${color.h};`,
        `--s-theme-color-${from}-s: ${color.s};`,
        `--s-theme-color-${from}-l: ${color.l};`,
        `--s-theme-color-${from}-a: ${color.a};`
      ];
      result.properties[`--s-theme-color-${from}-h`] = color.h;
      result.properties[`--s-theme-color-${from}-s`] = color.s;
      result.properties[`--s-theme-color-${from}-l`] = color.l;
      result.properties[`--s-theme-color-${from}-a`] = color.a;
    } else {
      const toColorName = to.split("-").slice(0, 1)[0], fromColorName = from.split("-").slice(0, 1)[0];
      let toColorVariant = to.split("-").pop(), fromColorVariant = from.split("-").pop();
      if (toColorName === toColorVariant)
        toColorVariant = void 0;
      if (fromColorName === fromColorVariant)
        fromColorVariant = void 0;
      let fromVariable = `--s-theme-color-${fromColorName}`, toVariable = `--s-theme-color-${toColorName}`;
      this.getTheme().loopOnColors((colorObj) => {
        if (colorObj.name === toColorName) {
          if (toColorVariant) {
            if (colorObj.variant === toColorVariant) {
              result.vars.push(`${fromVariable}-saturation-offset: var(${toVariable}-${colorObj.variant}-saturation-offset, 0);`);
              result.properties[`${fromVariable}-saturation-offset`] = `var(${toVariable}-${colorObj.variant}-saturation-offset, 0)`;
              result.vars.push(`${fromVariable}-lightness-offset: var(${toVariable}-${colorObj.variant}-lightness-offset, 0);`);
              result.properties[`${fromVariable}-lightness-offset`] = `var(${toVariable}-${colorObj.variant}-lightness-offset, 0)`;
              result.vars.push(`${fromVariable}-a: var(${toVariable}-a, 1);`);
              result.properties[`${fromVariable}-a`] = `var(${toVariable}-a, 1)`;
            }
          } else {
            if (!colorObj.state && !colorObj.variant && colorObj.value.color) {
              result.vars.push(`${fromVariable}-h: var(${toVariable}-h);`);
              result.properties[`${fromVariable}-h`] = `var(${toVariable}-h)`;
              result.vars.push(`${fromVariable}-s: var(${toVariable}-s);`);
              result.properties[`${fromVariable}-s`] = `var(${toVariable}-s)`;
              result.vars.push(`${fromVariable}-l: var(${toVariable}-l);`);
              result.properties[`${fromVariable}-l`] = `var(${toVariable}-l)`;
            } else if (!colorObj.value.color) {
              result.vars.push(`${fromVariable}-${colorObj.variant}-saturation-offset: var(${toVariable}-${colorObj.variant}-saturation-offset, 0);`);
              result.properties[`${fromVariable}-${colorObj.variant}-saturation-offset`] = `var(${toVariable}-${colorObj.variant}-saturation-offset, 0)`;
              result.vars.push(`${fromVariable}-${colorObj.variant}-lightness-offset: var(${toVariable}-${colorObj.variant}-lightness-offset, 0);`);
              result.properties[`${fromVariable}-${colorObj.variant}-lightness-offset`] = `var(${toVariable}-${colorObj.variant}-lightness-offset, 0)`;
              result.vars.push(`${fromVariable}-a: var(${toVariable}-a, 1);`);
              result.properties[`${fromVariable}-a`] = `var(${toVariable}-a, 1)`;
            }
          }
        }
      });
    }
    return result;
  }
  static toCssVars(theme, variant) {
    const themeInstance = this.getTheme(theme, variant);
    if (!themeInstance)
      throw new Error(`Sorry but the requested theme "<yellow>${theme}-${variant}</yellow>" does not exists...`);
    let vars = [];
    themeInstance.loopOnColors((colorObj) => {
      const baseVariable = colorObj.value.variable;
      if (!colorObj.state && !colorObj.variant && colorObj.value.color) {
        vars.push(`${baseVariable}-h: ${colorObj.value.h};`);
        vars.push(`${baseVariable}-s: ${colorObj.value.s};`);
        vars.push(`${baseVariable}-l: ${colorObj.value.l};`);
        vars.push(`${baseVariable}-a: ${colorObj.value.a};`);
        vars.push(`${baseVariable}-origin-h: ${colorObj.value.h};`);
        vars.push(`${baseVariable}-origin-s: ${colorObj.value.s};`);
        vars.push(`${baseVariable}-origin-l: ${colorObj.value.l};`);
        vars.push(`${baseVariable}-origin-a: ${colorObj.value.a};`);
      } else if (!colorObj.value.color) {
        if (colorObj.value.saturate) {
          vars.push(`${baseVariable}-saturation-offset: ${colorObj.value.saturate};`);
        } else if (colorObj.value.desaturate) {
          vars.push(`${baseVariable}-saturation-offset: ${colorObj.value.desaturate * -1};`);
        } else {
          vars.push(`${baseVariable}-saturation-offset: 0;`);
        }
        if (colorObj.value.lighten) {
          vars.push(`${baseVariable}-lightness-offset: ${colorObj.value.lighten};`);
        } else if (colorObj.value.darken) {
          vars.push(`${baseVariable}-lightness-offset: ${colorObj.value.darken * -1};`);
        } else {
          vars.push(`${baseVariable}-lightness-offset: 0;`);
        }
        if (colorObj.value.alpha >= 0 && colorObj.value.alpha <= 1) {
          vars.push(`${baseVariable}-a: ${colorObj.value.alpha};`);
        }
      }
    });
    const themeObjWithoutColors = Object.assign({}, themeInstance.config("."));
    delete themeObjWithoutColors.color;
    const flattenedTheme = __flatten(themeObjWithoutColors);
    Object.keys(flattenedTheme).forEach((key) => {
      const value = flattenedTheme[key];
      const varKey = key.replace(/\./gm, "-").replace(/:/gm, "-").replace(/\?/gm, "").replace(/--/gm, "-");
      let variable = `--s-theme-${varKey}`;
      if (`${value}`.match(/:/)) {
        vars.push(`${variable}: "${flattenedTheme[key]}";`);
      } else {
        vars.push(`${variable}: ${flattenedTheme[key]};`);
      }
    });
    return vars;
  }
  static config(dotPath, theme, variant) {
    const instance = this.getTheme(theme, variant);
    return instance.config(dotPath);
  }
  constructor(theme, variant) {
    super({});
    this.name = theme != null ? theme : __SSugarConfig.get("theme.theme");
    this.variant = variant != null ? variant : __SSugarConfig.get("theme.variant");
    if (!__SSugarConfig.get(`theme.themes.${this.name}-${this.variant}`)) {
      throw new Error(`Sorry but the requested theme "<yellow>${this.name}-${this.variant}</yellow>" does not exists...`);
    }
  }
  get themes() {
    return __SSugarConfig.get("theme.themes");
  }
  get _config() {
    return __SSugarConfig.get("theme.themes")[this.id];
  }
  config(dotPath) {
    const value = __get(this._config, dotPath);
    if (value === void 0) {
      throw new Error(`<red>[${this.constructor.name}]</red> Sorry but the requested "<yellow>${this.id}</yellow>" theme config "<cyan>${dotPath}</cyan>" does not exists...`);
    }
    return value;
  }
  hash(dotPath = "") {
    const config = this.config(dotPath);
    return __objectHash(config);
  }
  themesConfig() {
    return __SSugarConfig.get("theme");
  }
  baseColors() {
    const map = {};
    Object.keys(this._config.color).forEach((color) => {
      const colorObj = this._config.color[color];
      if (!colorObj.color)
        return;
      const c = new __SColor(colorObj.color);
      map[color] = {
        color: colorObj.color,
        variable: `--s-theme-color-${color}`,
        r: c.r,
        g: c.g,
        b: c.b,
        h: c.h,
        s: c.s,
        l: c.l,
        a: c.a
      };
    });
    return map;
  }
  async loopOnColors(callback) {
    var _a;
    const colorsObj = this.config("color");
    let triggeredStop = false;
    for (let [colorName, colorObj] of Object.entries(colorsObj)) {
      const colorObj2 = colorsObj[colorName];
      const defaultColorObj = Object.assign({}, (_a = colorObj2.default) != null ? _a : {});
      if (!colorObj2.color) {
        throw new Error(`Sorry but your color "<yellow>${colorName}</yellow>" does not provide a "<cyan>color</cyan>" property and this is required...`);
      }
      const c = new __SColor(colorObj2.color);
      const _res = callback({
        name: colorName,
        variant: "",
        state: "",
        value: {
          color: colorObj2.color,
          variable: `--s-theme-color-${colorName}`,
          r: c.r,
          g: c.g,
          b: c.b,
          h: c.h,
          s: c.s,
          l: c.l,
          a: c.a
        }
      });
      if (_res === false || _res === -1) {
        return true;
      }
      for (let [stateName, stateObj] of Object.entries(colorObj2)) {
        const originalStateName = stateName;
        if (stateName === "default")
          stateName = ":default";
        let state = stateName.match(/^:/) ? stateName.slice(1) : "", variant = !stateName.match(/^:/) ? stateName : "", res;
        let variantColorObj = Object.assign({}, colorObj2[originalStateName]);
        if (state !== "default")
          variantColorObj = __spreadValues(__spreadValues({}, defaultColorObj), variantColorObj);
        if (stateName === "color") {
        } else if (stateName.match(/^:/)) {
          for (let [variant2, variantObj] of Object.entries(variantColorObj)) {
            const newColor = c.apply(variantObj, true);
            res = callback({
              name: colorName,
              state: state === "default" ? "" : state,
              variant: variant2,
              value: __spreadProps(__spreadValues({
                variable: state && state !== "default" ? `--s-theme-color-${colorName}-${state}-${variant2}` : `--s-theme-color-${colorName}-${variant2}`
              }, variantColorObj[variant2]), {
                r: newColor.r,
                g: newColor.g,
                b: newColor.b,
                h: newColor.h,
                s: newColor.s,
                l: newColor.l,
                a: newColor.a
              })
            });
            if (res === false || res === -1) {
              return true;
            }
          }
        } else {
          const newColor = c.apply(variantColorObj, true);
          res = callback({
            name: colorName,
            variant,
            state,
            value: __spreadProps(__spreadValues({
              variable: state ? `--s-theme-color-${colorName}-${state}-${variant}` : `--s-theme-color-${colorName}-${variant}`
            }, variantColorObj), {
              r: newColor.r,
              g: newColor.g,
              b: newColor.b,
              h: newColor.h,
              s: newColor.s,
              l: newColor.l,
              a: newColor.a
            })
          });
          if (res === false || res === -1) {
            return true;
          }
        }
      }
    }
    return true;
  }
}
SThemeBase._instanciatedThemes = {};
export {
  SThemeBase as default
};
