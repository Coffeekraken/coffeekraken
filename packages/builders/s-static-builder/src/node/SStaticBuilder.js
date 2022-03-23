var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
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
var SStaticBuilder_exports = {};
__export(SStaticBuilder_exports, {
  default: () => SStaticBuilder
});
module.exports = __toCommonJS(SStaticBuilder_exports);
var import_s_builder = __toESM(require("@coffeekraken/s-builder"), 1);
var import_s_promise = __toESM(require("@coffeekraken/s-promise"), 1);
var import_s_request = __toESM(require("@coffeekraken/s-request"), 1);
var import_s_sugar_config = __toESM(require("@coffeekraken/s-sugar-config"), 1);
var import_writeFileSync = __toESM(require("@coffeekraken/sugar/node/fs/writeFileSync"), 1);
var import_packageRoot = __toESM(require("@coffeekraken/sugar/node/path/packageRoot"), 1);
var import_packageCacheDir = __toESM(require("@coffeekraken/sugar/node/path/packageCacheDir"), 1);
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_s_log = __toESM(require("@coffeekraken/s-log"), 1);
var import_path = __toESM(require("path"), 1);
var import_readJsonSync = __toESM(require("@coffeekraken/sugar/node/fs/readJsonSync"), 1);
var import_xml2js = require("xml2js");
var import_writeJsonSync = __toESM(require("@coffeekraken/sugar/node/fs/writeJsonSync"), 1);
var import_copy = __toESM(require("@coffeekraken/sugar/node/fs/copy"), 1);
var import_formatDuration = __toESM(require("@coffeekraken/sugar/shared/time/formatDuration"), 1);
var import_removeSync = __toESM(require("@coffeekraken/sugar/node/fs/removeSync"), 1);
var import_copySync = __toESM(require("@coffeekraken/sugar/node/fs/copySync"), 1);
var import_wait = __toESM(require("@coffeekraken/sugar/shared/time/wait"), 1);
class SStaticBuilder extends import_s_builder.default {
  get staticBuilderSettings() {
    return this._settings.staticBuilder;
  }
  constructor(settings) {
    super((0, import_deepMerge.default)({
      staticBuilder: __spreadValues({}, import_s_sugar_config.default.get("staticBuilder"))
    }, settings != null ? settings : {}));
  }
  _build(params) {
    return new import_s_promise.default(async ({ resolve, reject, emit }) => {
      var _a, _b, _c;
      emit("log", {
        type: import_s_log.default.TYPE_INFO,
        value: `<yellow>[build]</yellow> Start building your static website`
      });
      const cacheBuildDir = `${(0, import_packageCacheDir.default)()}/s-static-builder/build`;
      let incrementalCache = {};
      const incrementalCachePath = import_path.default.resolve((0, import_packageCacheDir.default)(), "s-static-builder/incremental-cache.json");
      emit("log", {
        type: import_s_log.default.TYPE_INFO,
        value: `<yellow>[build]</yellow> Starting Static Build`
      });
      emit("log", {
        type: import_s_log.default.TYPE_INFO,
        value: `<yellow>\u25CB</yellow> Environment : ${params.prod ? "<green>production</green>" : "<yellow>development</yellow>"}`
      });
      emit("log", {
        type: import_s_log.default.TYPE_INFO,
        value: `<yellow>\u25CB</yellow> Host : <cyan>${params.host}</cyan>`
      });
      let byItemAverage = 0;
      if (params.clean) {
        emit("log", {
          type: import_s_log.default.TYPE_INFO,
          value: `<yellow>[build]</yellow> Cleaning the static builder internal cache (incremental, etc...))`
        });
        try {
          (0, import_removeSync.default)(`${(0, import_packageRoot.default)()}/SStaticBuilderFailedUrls.txt`);
          (0, import_removeSync.default)(params.outDir);
          (0, import_removeSync.default)(cacheBuildDir);
          (0, import_removeSync.default)(incrementalCache);
        } catch (e) {
        }
      }
      if (params.incremental && import_fs.default.existsSync(incrementalCachePath)) {
        incrementalCache = (0, import_readJsonSync.default)(incrementalCachePath);
      }
      if (!import_fs.default.existsSync(params.input)) {
        throw new Error(`Sorry but the specified input file "<cyan>${params.input}</cyan>" does not exists...`);
      }
      const xmlStr = import_fs.default.readFileSync(params.input, "utf8").toString();
      let xml = await (0, import_xml2js.parseStringPromise)(xmlStr);
      let failsCount = 0, failedUrls = [], leftDuration = 0, currentDuration = 0;
      let logsCount = 0;
      for (let i = 0; i < xml.urlset.url.length; i++) {
        const url = xml.urlset.url[i], urlIntegrity = (_a = url.integrity) == null ? void 0 : _a[0], urlLoc = (_b = url.loc) == null ? void 0 : _b[0], urlLastMod = (_c = url.lastmod) == null ? void 0 : _c[0];
        const outPath = `${params.outDir}/${urlLoc === "/" ? "index" : urlLoc}.html`.replace(/\/{2,20}/gm, "/"), cacheOutPath = `${cacheBuildDir}/${urlLoc === "/" ? "index" : urlLoc}.html`.replace(/\/{2,20}/gm, "/");
        emit("log", {
          clear: import_s_log.default.isTypeEnabled(import_s_log.default.TYPE_VERBOSE) ? false : logsCount,
          type: import_s_log.default.TYPE_INFO,
          value: `<yellow>[build]</yellow> Reaching the url "<cyan>${urlLoc}</cyan>"...`
        });
        logsCount = 1;
        emit("log", {
          type: import_s_log.default.TYPE_INFO,
          value: `<yellow>[build]</yellow> <magenta>${xml.urlset.url.length - i}</magenta> url(s), <cyan>~${(0, import_formatDuration.default)(leftDuration)}</cyan> remaining`
        });
        logsCount++;
        if (params.incremental) {
          if (urlIntegrity && incrementalCache[urlLoc] == urlIntegrity) {
            if (import_fs.default.existsSync(cacheOutPath)) {
              emit("log", {
                type: import_s_log.default.TYPE_INFO,
                value: `<yellow>[build]</yellow> Incremental build for url <cyan>${urlLoc}</cyan>`
              });
              logsCount++;
              (0, import_copySync.default)(cacheOutPath, outPath);
              continue;
            }
          }
        }
        const start = Date.now();
        const request = new import_s_request.default({
          url: `${params.host}${urlLoc}`,
          timeout: params.requestTimeout
        });
        let res, tries = 0;
        while (!res && tries < params.requestRetry) {
          if (tries > 0) {
            await (0, import_wait.default)(params.requestRetryTimeout);
          }
          res = await request.send().catch((e) => {
            emit("log", {
              type: import_s_log.default.TYPE_INFO,
              value: `<red>[error]</red> The url "<cyan>${urlLoc}</cyan>" cannot be reached...`
            });
            tries++;
            if (tries >= params.requestRetry) {
              logsCount = 0;
              failsCount++;
              failedUrls.push(urlLoc);
              (0, import_writeFileSync.default)(`${(0, import_packageRoot.default)()}/SStaticBuilderFailedUrls.txt`, failedUrls.join("\n"));
              if (params.failAfter !== -1 && failsCount >= params.failAfter) {
                throw new Error(`<red>[error]</red> The static builder has reached the available issues which is set using the "<yellow>failAfter</yellow>" param that is set to <magenta>${params.failAfter}</magenta>`);
              }
            }
          });
        }
        const end = Date.now();
        currentDuration += end - start;
        leftDuration = (end - start) * (xml.urlset.url.length - i) - currentDuration;
        if (res == null ? void 0 : res.data) {
          emit("log", {
            type: import_s_log.default.TYPE_INFO,
            value: `<green>[build]</green> Saving the page from url "<cyan>${urlLoc}</cyan>"...`
          });
          logsCount++;
          (0, import_writeFileSync.default)(cacheOutPath, res.data);
          (0, import_writeFileSync.default)(outPath, res.data);
          if (urlIntegrity) {
            incrementalCache[urlLoc] = urlIntegrity;
            (0, import_writeJsonSync.default)(incrementalCachePath, incrementalCache);
          }
        }
      }
      if (params.assets) {
        for (let i = 0; i < Object.keys(params.assets).length; i++) {
          const assetObj = params.assets[Object.keys(params.assets)[i]];
          if (assetObj.from.match(/^\//)) {
            const to = `${assetObj.to}/${assetObj.from.split("/").slice(-1)[0]}`;
            if (!import_fs.default.existsSync(assetObj.from)) {
              emit("log", {
                type: import_s_log.default.TYPE_INFO,
                value: `<yellow>[assets]</yellow> No "<yellow>${import_path.default.relative((0, import_packageRoot.default)(), assetObj.from)}</yellow>" file to copy...`
              });
            } else {
              emit("log", {
                type: import_s_log.default.TYPE_INFO,
                value: `<yellow>[assets]</yellow> Copying asset "<yellow>${import_path.default.relative((0, import_packageRoot.default)(), assetObj.from)}</yellow>" to "<cyan>${import_path.default.relative((0, import_packageRoot.default)(), assetObj.to)}</cyan>"`
              });
              await (0, import_copy.default)(assetObj.from, to);
            }
          } else if (assetObj.from.match(/^https?:\/\//)) {
            const req = new import_s_request.default({
              url: assetObj.from
            });
            emit("log", {
              type: import_s_log.default.TYPE_INFO,
              value: `<yellow>[assets]</yellow> Getting asset "<yellow>${import_path.default.relative((0, import_packageRoot.default)(), assetObj.from)}</yellow>" to "<cyan>${import_path.default.relative((0, import_packageRoot.default)(), assetObj.to)}</cyan>"`
            });
            const res = await req.send().catch((error) => {
              throw new Error(`<red>[error]</red> The requested asset "<yellow>${assetObj.from}</yellow>" is not reachable...`);
            });
            let data = res.data;
            try {
              data = JSON.stringify(data);
            } catch (e) {
            }
            (0, import_writeFileSync.default)(assetObj.to, data);
          }
        }
      }
      resolve();
    }, {
      metas: {
        id: this.constructor.name
      }
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
