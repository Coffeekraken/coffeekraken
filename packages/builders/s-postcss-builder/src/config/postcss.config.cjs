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
var postcss_config_exports = {};
__export(postcss_config_exports, {
  default: () => postcss_config_default,
  preprocess: () => preprocess
});
module.exports = __toCommonJS(postcss_config_exports);
var import_loadConfigFile = __toESM(require("@coffeekraken/sugar/node/config/loadConfigFile"), 1);
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"), 1);
async function preprocess(env, rawPostcssConfig, rawConfig) {
  var _a, _b;
  return (0, import_deepMerge.default)(Object.assign({}, rawPostcssConfig), (_a = await (0, import_loadConfigFile.default)("postcss.config.js")) != null ? _a : {}, (_b = await (0, import_loadConfigFile.default)(".postcssrc.json")) != null ? _b : {});
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  preprocess
});
