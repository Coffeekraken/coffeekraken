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
var SSitemapBuilderSource_exports = {};
__export(SSitemapBuilderSource_exports, {
  default: () => SSitemapSource
});
module.exports = __toCommonJS(SSitemapBuilderSource_exports);
var import_s_class = __toESM(require("@coffeekraken/s-class"), 1);
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"), 1);
class SSitemapSource extends import_s_class.default {
  get sitemapSourceSettings() {
    var _a;
    return (_a = this._settings.sitemapSource) != null ? _a : {};
  }
  constructor(id, settings) {
    super((0, import_deepMerge.default)({
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
