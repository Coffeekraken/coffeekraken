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
var SSitemapBuilderDocmapSource_exports = {};
__export(SSitemapBuilderDocmapSource_exports, {
  default: () => SSitemapBuilderDocmapSource
});
module.exports = __toCommonJS(SSitemapBuilderDocmapSource_exports);
var import_SSitemapBuilderSource = __toESM(require("../SSitemapBuilderSource"), 1);
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"), 1);
var import_s_promise = __toESM(require("@coffeekraken/s-promise"), 1);
var import_s_docmap = __toESM(require("@coffeekraken/s-docmap"), 1);
var import_pad = __toESM(require("@coffeekraken/sugar/shared/number/pad"), 1);
var import_fileHash = __toESM(require("@coffeekraken/sugar/node/fs/fileHash"), 1);
class SSitemapBuilderDocmapSource extends import_SSitemapBuilderSource.default {
  get sitemapDocmapSourceSettings() {
    var _a;
    return (_a = this._settings.sitemapDocmapSource) != null ? _a : {};
  }
  constructor(settings) {
    super("docmap", (0, import_deepMerge.default)({
      sitemapDocmapSource: {}
    }, settings != null ? settings : {}));
  }
  build(params = {}) {
    return new import_s_promise.default(async ({ resolve, reject, emit, pipe }) => {
      const docmapInstance = new import_s_docmap.default();
      const docmap = await docmapInstance.read();
      const items = [];
      const date = new Date();
      const lastmod = `${date.getFullYear()}-${(0, import_pad.default)(date.getMonth(), 2)}-${(0, import_pad.default)(date.getDate(), 2)}`;
      for (let [slug, docmapObj] of Object.entries(docmap.menu.slug)) {
        const hash = (0, import_fileHash.default)(docmapObj.docmap.path);
        items.push({
          loc: slug,
          lastmod,
          integrity: hash
        });
      }
      for (let [packageName, packageObj] of Object.entries(docmap.menu.packages)) {
        for (let [slug, docmapObj] of Object.entries(packageObj.slug)) {
          const hash = (0, import_fileHash.default)(docmapObj.docmap.path);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
