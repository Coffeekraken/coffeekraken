var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var staticBuilder_config_exports = {};
__export(staticBuilder_config_exports, {
  default: () => staticBuilder_config_default
});
module.exports = __toCommonJS(staticBuilder_config_exports);
function staticBuilder_config_default(env, config) {
  if (env.platform !== "node")
    return;
  return {
    input: "[config.storage.package.rootDir]/sitemap.xml",
    outDir: "[config.storage.package.rootDir]/static",
    host: "http://[config.frontendServer.hostname]:[config.frontendServer.port]",
    failAfter: -1,
    requestTimeout: 5e3,
    requestRetry: 5,
    requestRetryTimeout: 1e3,
    clean: false,
    incremental: true,
    assets: {
      docmap: {
        from: "[config.staticBuilder.host]/docmap.json",
        to: "[config.staticBuilder.outDir]/docmap.json"
      },
      manifest: {
        from: "[config.storage.package.rootDir]/manifest.json",
        to: "[config.staticBuilder.outDir]/manifest.json"
      },
      sitemap: {
        from: "[config.storage.package.rootDir]/sitemap.xml",
        to: "[config.staticBuilder.outDir]/sitemap.xml"
      },
      favicon: {
        from: "[config.storage.package.rootDir]/favicon.ico",
        to: "[config.staticBuilder.outDir]/favicon.ico"
      },
      dist: {
        from: "[config.storage.dist.rootDir]",
        to: "[config.staticBuilder.outDir]"
      }
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
