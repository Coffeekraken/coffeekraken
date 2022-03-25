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
var theme_config_exports = {};
__export(theme_config_exports, {
  default: () => theme_config_default,
  postprocess: () => postprocess,
  preprocess: () => preprocess
});
module.exports = __toCommonJS(theme_config_exports);
var import_s_sugar_json = __toESM(require("@coffeekraken/s-sugar-json"));
function preprocess(env, rawThemeConfig, rawConfig) {
  const sugarJsonInstance = new import_s_sugar_json.default();
  const sugarJson = sugarJsonInstance.current();
  if (sugarJson.theme)
    rawThemeConfig.theme = sugarJson.theme;
  if (sugarJson.variant)
    rawThemeConfig.variant = sugarJson.variant;
  Object.keys(rawConfig).forEach((configId) => {
    const configObj = rawConfig[configId];
    if (configObj.themeName && configObj.variants) {
      Object.keys(configObj.variants).forEach((variantName) => {
        const themeId = `${configObj.themeName}-${variantName}`;
        if (!rawThemeConfig.themes[themeId]) {
          rawThemeConfig.themes[themeId] = `[config.${configId}.variants.${variantName}]`;
        }
      });
    }
  });
  return rawThemeConfig;
}
function postprocess(env, themeConfig, config) {
  const themes = themeConfig.themes;
  Object.keys(themes).forEach((themeName) => {
    const themeObj = themes[themeName];
    if (!themeObj.color.current) {
      if (themeObj.defaultColor) {
        themeObj.color.current = Object.assign({}, themeObj.color[themeObj.defaultColor]);
      } else {
        const firstColor = themeObj.color[Object.keys(themeObj.color)[0]];
        themeObj.color.current = Object.assign({}, firstColor);
      }
    }
    if (!themeObj.color.primary) {
      if (themeObj.defaultColor) {
        themeObj.color.primary = Object.assign({}, themeObj.color[themeObj.defaultColor]);
      } else {
        const firstColor = themeObj.color[Object.keys(themeObj.color)[0]];
        themeObj.color.primary = Object.assign({}, firstColor);
      }
    }
    if (!themeObj.color.secondary) {
      if (themeObj.defaultColor) {
        themeObj.color.secondary = Object.assign({}, themeObj.color[themeObj.defaultColor]);
      } else {
        const firstColor = themeObj.color[Object.keys(themeObj.color)[0]];
        themeObj.color.secondary = Object.assign({}, firstColor);
      }
    }
  });
  return themeConfig;
}
function theme_config_default(env, config) {
  return {
    theme: "default",
    variant: "light",
    cssVariables: ["*"],
    themes: {}
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  postprocess,
  preprocess
});
