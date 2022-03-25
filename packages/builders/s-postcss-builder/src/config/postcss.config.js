import __loadConfigFile from "@coffeekraken/sugar/node/config/loadConfigFile";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
async function preprocess(env, rawPostcssConfig, rawConfig) {
  var _a, _b;
  return __deepMerge(Object.assign({}, rawPostcssConfig), (_a = await __loadConfigFile("postcss.config.js")) != null ? _a : {}, (_b = await __loadConfigFile(".postcssrc.json")) != null ? _b : {});
}
function postcss_config_default(env, config) {
  if (env.platform !== "node")
    return;
  return {
    plugins: [
      "@coffeekraken/s-postcss-sugar-plugin",
      "postcss-import",
      "postcss-nested",
      "postcss-atroot",
      "postcss-extend-rule",
      "postcss-property-lookup",
      "autoprefixer"
    ],
    pluginsOptions: {}
  };
}
export {
  postcss_config_default as default,
  preprocess
};
