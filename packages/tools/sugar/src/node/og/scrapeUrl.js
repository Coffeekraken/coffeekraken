var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
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
import __deepMerge from "../../shared/object/deepMerge";
import __openGraphScraper from "open-graph-scraper";
import __packageCacheDir from "@coffeekraken/sugar/node/path/packageCacheDir";
import __readJsonSync from "@coffeekraken/sugar/node/fs/readJsonSync";
import __writeJsonSync from "@coffeekraken/sugar/node/fs/writeJsonSync";
import __fs from "fs";
function srapeUrl(url, settings = {}) {
  return new Promise(async (resolve, reject) => {
    const finalSettings = __deepMerge({
      id: void 0,
      scraper: {},
      cache: {
        ttl: "1w"
      }
    }, settings);
    const cacheFilePath = `${__packageCacheDir()}/sugar/scrapeUrl.json`;
    let cacheJson = {};
    if (finalSettings.cache && __fs.existsSync(cacheFilePath)) {
      cacheJson = __readJsonSync(cacheFilePath);
      if (cacheJson[url]) {
        return resolve(cacheJson[url]);
      }
    }
    const data = await __openGraphScraper(__spreadProps(__spreadValues({}, finalSettings.scraper), {
      url
    }));
    if (data.error) {
      return reject(data.result);
    }
    if (finalSettings.cache && data.result) {
      cacheJson[url] = data.result;
      __writeJsonSync(cacheFilePath, cacheJson);
    }
    return resolve(data.result);
  });
}
export {
  srapeUrl as default
};
