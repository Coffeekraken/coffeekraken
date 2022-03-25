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
var purgecss_config_exports = {};
__export(purgecss_config_exports, {
  default: () => purgecss_config_default,
  preprocess: () => preprocess
});
module.exports = __toCommonJS(purgecss_config_exports);
var import_loadConfigFile = __toESM(require("@coffeekraken/sugar/node/config/loadConfigFile"), 1);
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"), 1);
async function preprocess(env, rawPurgecssConfig, rawConfig) {
  var _a;
  const config = (_a = await (0, import_loadConfigFile.default)("purgecss.config.js")) != null ? _a : {};
  return (0, import_deepMerge.default)(rawPurgecssConfig, config);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  preprocess
});
