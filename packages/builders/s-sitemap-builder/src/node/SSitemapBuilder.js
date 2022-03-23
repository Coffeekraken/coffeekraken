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
var SSitemapBuilder_exports = {};
__export(SSitemapBuilder_exports, {
  default: () => SSitemapBuilder
});
module.exports = __toCommonJS(SSitemapBuilder_exports);
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"), 1);
var import_SSitemapBuilderBuildParamsInterface = __toESM(require("./interface/SSitemapBuilderBuildParamsInterface"), 1);
var import_upperFirst = __toESM(require("@coffeekraken/sugar/shared/string/upperFirst"), 1);
var import_s_promise = __toESM(require("@coffeekraken/s-promise"), 1);
var import_s_duration = __toESM(require("@coffeekraken/s-duration"), 1);
var import_s_sugar_config = __toESM(require("@coffeekraken/s-sugar-config"), 1);
var import_path = __toESM(require("path"), 1);
var import_class = __toESM(require("@coffeekraken/sugar/shared/is/class"), 1);
var import_packageRoot = __toESM(require("@coffeekraken/sugar/node/path/packageRoot"), 1);
var import_extension = __toESM(require("@coffeekraken/sugar/node/fs/extension"), 1);
var import_writeFileSync = __toESM(require("@coffeekraken/sugar/node/fs/writeFileSync"), 1);
var import_s_builder = __toESM(require("@coffeekraken/s-builder"), 1);
class SSitemapBuilder extends import_s_builder.default {
  get sitemapSettings() {
    var _a;
    return (_a = this._settings.sitemapBuilder) != null ? _a : {};
  }
  constructor(settings) {
    super((0, import_deepMerge.default)({
      sitemapBuilder: {
        sources: {}
      }
    }, settings != null ? settings : {}));
    var _a;
    const config = import_s_sugar_config.default.get("sitemapBuilder");
    this.sitemapSettings.sources = (0, import_deepMerge.default)((_a = config.sources) != null ? _a : {}, this.sitemapSettings.sources);
  }
  _build(params = {}) {
    return new import_s_promise.default(async ({ resolve, reject, emit, pipe }) => {
      var _a, _b, _c;
      let sitemap = [];
      const finalParams = import_SSitemapBuilderBuildParamsInterface.default.apply(params);
      const duration = new import_s_duration.default();
      let sourcesId = finalParams.source.length ? finalParams.source : Object.keys(this.sitemapSettings.sources);
      for (let i = 0; i < sourcesId.length; i++) {
        const sourceId = sourcesId[i];
        if (!this.sitemapSettings.sources[sourceId]) {
          throw new Error(`Sorry but the source "<yellow>${sourceId}</yellow>" is not available. Here's the sources you can use: ${Object.keys(this.sitemapSettings.sources).join(",")}`);
        }
        const sourceObj = this.sitemapSettings.sources[sourceId];
        const importedSource = (await Promise.resolve().then(() => __toESM(require(sourceObj.path)))).default;
        let settingsId = (_a = importedSource.settingsId) != null ? _a : `sitemap${(0, import_upperFirst.default)(sourceId)}Source`;
        let buildFn;
        if ((0, import_class.default)(importedSource)) {
          const sourceInstance = new importedSource({
            [settingsId]: (0, import_deepMerge.default)((_b = sourceObj.settings) != null ? _b : {}, (_c = finalParams.sourcesSettings[sourceId]) != null ? _c : {})
          });
          buildFn = sourceInstance.build.bind(sourceInstance);
        } else if (typeof importedSource === "function") {
          buildFn = importedSource;
        }
        const sourceDuration = new import_s_duration.default();
        const buildResultPromise = buildFn(params);
        if (buildResultPromise instanceof import_s_promise.default) {
          pipe(buildResultPromise);
        }
        const buildResult = await buildResultPromise;
        sitemap = [...sitemap, ...buildResult != null ? buildResult : []];
        emit("log", {
          value: `<yellow>[build]</yellow> "<magenta>${sourceId}</magenta>" sitemap builded with <magenta>${buildResult.length}</magenta> item(s) <green>successfully</green> in <yellow>${sourceDuration.end().formatedDuration}</yellow>`
        });
      }
      if (finalParams.save) {
        emit("log", {
          value: `<yellow>[save]</yellow> Saving your sitemap under "<cyan>${import_path.default.relative((0, import_packageRoot.default)(), finalParams.output)}</cyan>"`
        });
        this.save(sitemap, finalParams.output);
      }
      emit("log", {
        value: `<yellow>[build]</yellow> Sitemap builded <green>successfully</green> in <yellow>${duration.end().formatedDuration}</yellow>`
      });
      resolve(sitemap);
    });
  }
  save(items, path) {
    switch ((0, import_extension.default)(path)) {
      case "xml":
      default:
        let xmlStr = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          "   <url>",
          "       <loc>/</loc>",
          "   </url>"
        ];
        items.forEach((item) => {
          const itemStr = [];
          itemStr.push(`  <url>`);
          if (item.loc)
            itemStr.push(`        <loc>${item.loc}</loc>`);
          if (item.lastmod)
            itemStr.push(`      <lastmod>${item.lastmod}</lastmod>`);
          if (item.changefreq)
            itemStr.push(`       <changefreq>${item.changefreq}</changefreq>`);
          if (item.priority)
            itemStr.push(`      <priority>${item.priority}</priority>`);
          if (item.integrity)
            itemStr.push(`       <integrity>${item.integrity}</integrity>`);
          itemStr.push("  </url>");
          xmlStr.push(itemStr.join("\n"));
        });
        xmlStr.push("</urlset>");
        (0, import_writeFileSync.default)(path, xmlStr.join("\n"));
        break;
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
