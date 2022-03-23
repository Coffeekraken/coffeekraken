import {
  __spreadValues
} from "../../../../chunk-TD77TI6B.mjs";
import __SBuilder from "@coffeekraken/s-builder";
import __SPromise from "@coffeekraken/s-promise";
import __SRequest from "@coffeekraken/s-request";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
import __writeFileSync from "@coffeekraken/sugar/node/fs/writeFileSync";
import __packageRoot from "@coffeekraken/sugar/node/path/packageRoot";
import __packageCacheDir from "@coffeekraken/sugar/node/path/packageCacheDir";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
import __fs from "fs";
import __SLog from "@coffeekraken/s-log";
import __path from "path";
import __readJsonSync from "@coffeekraken/sugar/node/fs/readJsonSync";
import { parseStringPromise } from "xml2js";
import __writeJsonSync from "@coffeekraken/sugar/node/fs/writeJsonSync";
import __copy from "@coffeekraken/sugar/node/fs/copy";
import __formatDuration from "@coffeekraken/sugar/shared/time/formatDuration";
import __removeSync from "@coffeekraken/sugar/node/fs/removeSync";
import __copySync from "@coffeekraken/sugar/node/fs/copySync";
import __wait from "@coffeekraken/sugar/shared/time/wait";
class SStaticBuilder extends __SBuilder {
  get staticBuilderSettings() {
    return this._settings.staticBuilder;
  }
  constructor(settings) {
    super(__deepMerge({
      staticBuilder: __spreadValues({}, __SSugarConfig.get("staticBuilder"))
    }, settings != null ? settings : {}));
  }
  _build(params) {
    return new __SPromise(async ({ resolve, reject, emit }) => {
      var _a, _b, _c;
      emit("log", {
        type: __SLog.TYPE_INFO,
        value: `<yellow>[build]</yellow> Start building your static website`
      });
      const cacheBuildDir = `${__packageCacheDir()}/s-static-builder/build`;
      let incrementalCache = {};
      const incrementalCachePath = __path.resolve(__packageCacheDir(), "s-static-builder/incremental-cache.json");
      emit("log", {
        type: __SLog.TYPE_INFO,
        value: `<yellow>[build]</yellow> Starting Static Build`
      });
      emit("log", {
        type: __SLog.TYPE_INFO,
        value: `<yellow>\u25CB</yellow> Environment : ${params.prod ? "<green>production</green>" : "<yellow>development</yellow>"}`
      });
      emit("log", {
        type: __SLog.TYPE_INFO,
        value: `<yellow>\u25CB</yellow> Host : <cyan>${params.host}</cyan>`
      });
      let byItemAverage = 0;
      if (params.clean) {
        emit("log", {
          type: __SLog.TYPE_INFO,
          value: `<yellow>[build]</yellow> Cleaning the static builder internal cache (incremental, etc...))`
        });
        try {
          __removeSync(`${__packageRoot()}/SStaticBuilderFailedUrls.txt`);
          __removeSync(params.outDir);
          __removeSync(cacheBuildDir);
          __removeSync(incrementalCache);
        } catch (e) {
        }
      }
      if (params.incremental && __fs.existsSync(incrementalCachePath)) {
        incrementalCache = __readJsonSync(incrementalCachePath);
      }
      if (!__fs.existsSync(params.input)) {
        throw new Error(`Sorry but the specified input file "<cyan>${params.input}</cyan>" does not exists...`);
      }
      const xmlStr = __fs.readFileSync(params.input, "utf8").toString();
      let xml = await parseStringPromise(xmlStr);
      let failsCount = 0, failedUrls = [], leftDuration = 0, currentDuration = 0;
      let logsCount = 0;
      for (let i = 0; i < xml.urlset.url.length; i++) {
        const url = xml.urlset.url[i], urlIntegrity = (_a = url.integrity) == null ? void 0 : _a[0], urlLoc = (_b = url.loc) == null ? void 0 : _b[0], urlLastMod = (_c = url.lastmod) == null ? void 0 : _c[0];
        const outPath = `${params.outDir}/${urlLoc === "/" ? "index" : urlLoc}.html`.replace(/\/{2,20}/gm, "/"), cacheOutPath = `${cacheBuildDir}/${urlLoc === "/" ? "index" : urlLoc}.html`.replace(/\/{2,20}/gm, "/");
        emit("log", {
          clear: __SLog.isTypeEnabled(__SLog.TYPE_VERBOSE) ? false : logsCount,
          type: __SLog.TYPE_INFO,
          value: `<yellow>[build]</yellow> Reaching the url "<cyan>${urlLoc}</cyan>"...`
        });
        logsCount = 1;
        emit("log", {
          type: __SLog.TYPE_INFO,
          value: `<yellow>[build]</yellow> <magenta>${xml.urlset.url.length - i}</magenta> url(s), <cyan>~${__formatDuration(leftDuration)}</cyan> remaining`
        });
        logsCount++;
        if (params.incremental) {
          if (urlIntegrity && incrementalCache[urlLoc] == urlIntegrity) {
            if (__fs.existsSync(cacheOutPath)) {
              emit("log", {
                type: __SLog.TYPE_INFO,
                value: `<yellow>[build]</yellow> Incremental build for url <cyan>${urlLoc}</cyan>`
              });
              logsCount++;
              __copySync(cacheOutPath, outPath);
              continue;
            }
          }
        }
        const start = Date.now();
        const request = new __SRequest({
          url: `${params.host}${urlLoc}`,
          timeout: params.requestTimeout
        });
        let res, tries = 0;
        while (!res && tries < params.requestRetry) {
          if (tries > 0) {
            await __wait(params.requestRetryTimeout);
          }
          res = await request.send().catch((e) => {
            emit("log", {
              type: __SLog.TYPE_INFO,
              value: `<red>[error]</red> The url "<cyan>${urlLoc}</cyan>" cannot be reached...`
            });
            tries++;
            if (tries >= params.requestRetry) {
              logsCount = 0;
              failsCount++;
              failedUrls.push(urlLoc);
              __writeFileSync(`${__packageRoot()}/SStaticBuilderFailedUrls.txt`, failedUrls.join("\n"));
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
            type: __SLog.TYPE_INFO,
            value: `<green>[build]</green> Saving the page from url "<cyan>${urlLoc}</cyan>"...`
          });
          logsCount++;
          __writeFileSync(cacheOutPath, res.data);
          __writeFileSync(outPath, res.data);
          if (urlIntegrity) {
            incrementalCache[urlLoc] = urlIntegrity;
            __writeJsonSync(incrementalCachePath, incrementalCache);
          }
        }
      }
      if (params.assets) {
        for (let i = 0; i < Object.keys(params.assets).length; i++) {
          const assetObj = params.assets[Object.keys(params.assets)[i]];
          if (assetObj.from.match(/^\//)) {
            const to = `${assetObj.to}/${assetObj.from.split("/").slice(-1)[0]}`;
            if (!__fs.existsSync(assetObj.from)) {
              emit("log", {
                type: __SLog.TYPE_INFO,
                value: `<yellow>[assets]</yellow> No "<yellow>${__path.relative(__packageRoot(), assetObj.from)}</yellow>" file to copy...`
              });
            } else {
              emit("log", {
                type: __SLog.TYPE_INFO,
                value: `<yellow>[assets]</yellow> Copying asset "<yellow>${__path.relative(__packageRoot(), assetObj.from)}</yellow>" to "<cyan>${__path.relative(__packageRoot(), assetObj.to)}</cyan>"`
              });
              await __copy(assetObj.from, to);
            }
          } else if (assetObj.from.match(/^https?:\/\//)) {
            const req = new __SRequest({
              url: assetObj.from
            });
            emit("log", {
              type: __SLog.TYPE_INFO,
              value: `<yellow>[assets]</yellow> Getting asset "<yellow>${__path.relative(__packageRoot(), assetObj.from)}</yellow>" to "<cyan>${__path.relative(__packageRoot(), assetObj.to)}</cyan>"`
            });
            const res = await req.send().catch((error) => {
              throw new Error(`<red>[error]</red> The requested asset "<yellow>${assetObj.from}</yellow>" is not reachable...`);
            });
            let data = res.data;
            try {
              data = JSON.stringify(data);
            } catch (e) {
            }
            __writeFileSync(assetObj.to, data);
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
export {
  SStaticBuilder as default
};
