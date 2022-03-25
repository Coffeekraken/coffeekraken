import __SSugarJson from "@coffeekraken/s-sugar-json";
function preprocess(env, rawThemeConfig, rawConfig) {
  const sugarJsonInstance = new __SSugarJson();
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
export {
  theme_config_default as default,
  postprocess,
  preprocess
};
