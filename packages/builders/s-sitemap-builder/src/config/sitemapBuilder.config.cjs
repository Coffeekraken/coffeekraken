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
var sitemapBuilder_config_exports = {};
__export(sitemapBuilder_config_exports, {
  default: () => sitemapBuilder_config_default
});
module.exports = __toCommonJS(sitemapBuilder_config_exports);
var import_path = __toESM(require("path"), 1);
var import_dirname = __toESM(require("@coffeekraken/sugar/node/fs/dirname"), 1);
var sitemapBuilder_config_default = (env, config) => {
  if (env.platform !== "node")
    return;
  return {
    build: {
      output: `[config.storage.package.rootDir]/sitemap.xml`
    },
    sources: {
      docmap: {
        active: true,
        settings: {},
        path: import_path.default.resolve(`${(0, import_dirname.default)()}/../node/sources/SSitemapBuilderDocmapSource`)
      }
    }
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
