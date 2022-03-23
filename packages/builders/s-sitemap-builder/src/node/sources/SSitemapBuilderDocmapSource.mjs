import "../../../../../chunk-TD77TI6B.mjs";
import __SSitemapBuilderSource from "../SSitemapBuilderSource";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
import __SPromise from "@coffeekraken/s-promise";
import __SDocmap from "@coffeekraken/s-docmap";
import __pad from "@coffeekraken/sugar/shared/number/pad";
import __fileHash from "@coffeekraken/sugar/node/fs/fileHash";
class SSitemapBuilderDocmapSource extends __SSitemapBuilderSource {
  get sitemapDocmapSourceSettings() {
    var _a;
    return (_a = this._settings.sitemapDocmapSource) != null ? _a : {};
  }
  constructor(settings) {
    super("docmap", __deepMerge({
      sitemapDocmapSource: {}
    }, settings != null ? settings : {}));
  }
  build(params = {}) {
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
      const docmapInstance = new __SDocmap();
      const docmap = await docmapInstance.read();
      const items = [];
      const date = new Date();
      const lastmod = `${date.getFullYear()}-${__pad(date.getMonth(), 2)}-${__pad(date.getDate(), 2)}`;
      for (let [slug, docmapObj] of Object.entries(docmap.menu.slug)) {
        const hash = __fileHash(docmapObj.docmap.path);
        items.push({
          loc: slug,
          lastmod,
          integrity: hash
        });
      }
      for (let [packageName, packageObj] of Object.entries(docmap.menu.packages)) {
        for (let [slug, docmapObj] of Object.entries(packageObj.slug)) {
          const hash = __fileHash(docmapObj.docmap.path);
          items.push({
            loc: slug,
            lastmod,
            integrity: hash
          });
        }
      }
      resolve(items);
    });
  }
}
SSitemapBuilderDocmapSource.id = "docmap";
SSitemapBuilderDocmapSource.settingsId = "sitemapDocmapSource";
export {
  SSitemapBuilderDocmapSource as default
};
