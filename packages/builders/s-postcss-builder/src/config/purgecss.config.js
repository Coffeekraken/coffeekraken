import __loadConfigFile from "@coffeekraken/sugar/node/config/loadConfigFile";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
async function preprocess(env, rawPurgecssConfig, rawConfig) {
  var _a;
  const config = (_a = await __loadConfigFile("purgecss.config.js")) != null ? _a : {};
  return __deepMerge(rawPurgecssConfig, config);
}
function purgecss_config_default(env, config) {
  if (env.platform !== "node")
    return;
  return {
    content: [
      "index.html",
      "[config.storage.src.rootDir]/ ** / *.js",
      "[config.storage.src.rootDir]/ ** / *.jsx",
      "[config.storage.src.rootDir]/ ** / *.html",
      "[config.storage.src.rootDir]/ ** / *.vue",
      "[config.storage.src.rootDir]/ ** / *.riot",
      "[config.storage.src.rootDir]/ ** / *.svelte",
      "[config.storage.src.rootDir]/**/*.blade.php",
      "[config.storage.src.rootDir]/**/*.twig"
    ]
  };
}
export {
  purgecss_config_default as default,
  preprocess
};
