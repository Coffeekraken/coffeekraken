import {
  __toESM
} from "../../../../chunk-TD77TI6B.mjs";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
import __SSitemapBuilderBuildParamsInterface from "./interface/SSitemapBuilderBuildParamsInterface";
import __upperFirst from "@coffeekraken/sugar/shared/string/upperFirst";
import __SPromise from "@coffeekraken/s-promise";
import __SDuration from "@coffeekraken/s-duration";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
import __path from "path";
import __isClass from "@coffeekraken/sugar/shared/is/class";
import __packageRoot from "@coffeekraken/sugar/node/path/packageRoot";
import __extension from "@coffeekraken/sugar/node/fs/extension";
import __writeFileSync from "@coffeekraken/sugar/node/fs/writeFileSync";
import __SBuilder from "@coffeekraken/s-builder";
class SSitemapBuilder extends __SBuilder {
  get sitemapSettings() {
    var _a;
    return (_a = this._settings.sitemapBuilder) != null ? _a : {};
  }
  constructor(settings) {
    super(__deepMerge({
      sitemapBuilder: {
        sources: {}
      }
    }, settings != null ? settings : {}));
    var _a;
    const config = __SSugarConfig.get("sitemapBuilder");
    this.sitemapSettings.sources = __deepMerge((_a = config.sources) != null ? _a : {}, this.sitemapSettings.sources);
  }
  _build(params = {}) {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
      var _a, _b, _c;
      let sitemap = [];
      const finalParams = __SSitemapBuilderBuildParamsInterface.apply(params);
      const duration = new __SDuration();
      let sourcesId = finalParams.source.length ? finalParams.source : Object.keys(this.sitemapSettings.sources);
      for (let i = 0; i < sourcesId.length; i++) {
        const sourceId = sourcesId[i];
        if (!this.sitemapSettings.sources[sourceId]) {
          throw new Error(`Sorry but the source "<yellow>${sourceId}</yellow>" is not available. Here's the sources you can use: ${Object.keys(this.sitemapSettings.sources).join(",")}`);
        }
        const sourceObj = this.sitemapSettings.sources[sourceId];
        const importedSource = (await Promise.resolve().then(() => __toESM(require(sourceObj.path)))).default;
        let settingsId = (_a = importedSource.settingsId) != null ? _a : `sitemap${__upperFirst(sourceId)}Source`;
        let buildFn;
        if (__isClass(importedSource)) {
          const sourceInstance = new importedSource({
            [settingsId]: __deepMerge((_b = sourceObj.settings) != null ? _b : {}, (_c = finalParams.sourcesSettings[sourceId]) != null ? _c : {})
          });
          buildFn = sourceInstance.build.bind(sourceInstance);
        } else if (typeof importedSource === "function") {
          buildFn = importedSource;
        }
        const sourceDuration = new __SDuration();
        const buildResultPromise = buildFn(params);
        if (buildResultPromise instanceof __SPromise) {
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
          value: `<yellow>[save]</yellow> Saving your sitemap under "<cyan>${__path.relative(__packageRoot(), finalParams.output)}</cyan>"`
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
    switch (__extension(path)) {
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
        __writeFileSync(path, xmlStr.join("\n"));
        break;
    }
  }
}
export {
  SSitemapBuilder as default
};
