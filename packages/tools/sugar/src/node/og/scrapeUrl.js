var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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
var scrapeUrl_exports = {};
__export(scrapeUrl_exports, {
  default: () => srapeUrl
});
module.exports = __toCommonJS(scrapeUrl_exports);
var import_deepMerge = __toESM(require("../../shared/object/deepMerge"), 1);
var import_open_graph_scraper = __toESM(require("open-graph-scraper"), 1);
var import_packageCacheDir = __toESM(require("@coffeekraken/sugar/node/path/packageCacheDir"), 1);
var import_readJsonSync = __toESM(require("@coffeekraken/sugar/node/fs/readJsonSync"), 1);
var import_writeJsonSync = __toESM(require("@coffeekraken/sugar/node/fs/writeJsonSync"), 1);
var import_fs = __toESM(require("fs"), 1);
function srapeUrl(url, settings = {}) {
  return new Promise(async (resolve, reject) => {
    const finalSettings = (0, import_deepMerge.default)({
      id: void 0,
      scraper: {},
      cache: {
        ttl: "1w"
      }
    }, settings);
    const cacheFilePath = `${(0, import_packageCacheDir.default)()}/sugar/scrapeUrl.json`;
    let cacheJson = {};
    if (finalSettings.cache && import_fs.default.existsSync(cacheFilePath)) {
      cacheJson = (0, import_readJsonSync.default)(cacheFilePath);
      if (cacheJson[url]) {
        return resolve(cacheJson[url]);
      }
    }
    const data = await (0, import_open_graph_scraper.default)(__spreadProps(__spreadValues({}, finalSettings.scraper), {
      url
    }));
    if (data.error) {
      return reject(data.result);
    }
    if (finalSettings.cache && data.result) {
      cacheJson[url] = data.result;
      (0, import_writeJsonSync.default)(cacheFilePath, cacheJson);
    }
    return resolve(data.result);
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
