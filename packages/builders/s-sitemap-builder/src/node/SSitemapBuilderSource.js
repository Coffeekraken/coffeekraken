import __SClass from "@coffeekraken/s-class";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
class SSitemapSource extends __SClass {
  get sitemapSourceSettings() {
    var _a;
    return (_a = this._settings.sitemapSource) != null ? _a : {};
  }
  constructor(id, settings) {
    super(__deepMerge({
      metas: {
        id
      },
      sitemapSource: {}
    }, settings != null ? settings : {}));
  }
  build(params = {}) {
    throw new Error(`This "<yellow>build</yellow>" method must be overrided by your SitemapSource class implementation...`);
  }
}
export {
  SSitemapSource as default
};
