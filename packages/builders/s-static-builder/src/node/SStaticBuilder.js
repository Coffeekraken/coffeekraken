var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SBuilder from '@coffeekraken/s-builder';
import __SPromise from '@coffeekraken/s-promise';
import __SRequest from '@coffeekraken/s-request';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __writeFileSync from '@coffeekraken/sugar/node/fs/writeFileSync';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __packageCacheDir from '@coffeekraken/sugar/node/path/packageCacheDir';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __fs from 'fs';
import __SLog from '@coffeekraken/s-log';
import __path from 'path';
import __readJsonSync from '@coffeekraken/sugar/node/fs/readJsonSync';
import { parseStringPromise } from 'xml2js';
import __writeJsonSync from '@coffeekraken/sugar/node/fs/writeJsonSync';
import __copy from '@coffeekraken/sugar/node/fs/copy';
import __formatDuration from '@coffeekraken/sugar/shared/time/formatDuration';
import __removeSync from '@coffeekraken/sugar/node/fs/removeSync';
import __copySync from '@coffeekraken/sugar/node/fs/copySync';
import __wait from '@coffeekraken/sugar/shared/time/wait';
export default class SStaticBuilder extends __SBuilder {
    /**
     * @name            staticBuilderSettings
     * @type            ISStaticBuilderSettings
     * @get
     *
     * Access the postcss builder settings
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get staticBuilderSettings() {
        return this._settings.staticBuilder;
    }
    /**
     * @name            constructor
     * @type            Function
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings) {
        super(__deepMerge({
            staticBuilder: Object.assign({}, __SSugarConfig.get('staticBuilder')),
        }, settings !== null && settings !== void 0 ? settings : {}));
    }
    /**
     * @name            _build
     * @type            Function
     * @async
     *
     * This method is the internal builder _build one.
     * It will be called by the SBuilder class with the final params
     * for the build
     *
     * @param       {Partial<ISStaticBuilderBuildParams>}          [params={}]         Some params for your build
     * @return      {SPromise}                                                          An SPromise instance that need to be resolved at the end of the build
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _build(params) {
        return new __SPromise(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<yellow>[build]</yellow> Start building your static website`,
            });
            // create the temp build directory
            const cacheBuildDir = `${__packageCacheDir()}/s-static-builder/build`;
            // init incremental cache
            let incrementalCache = {};
            const incrementalCachePath = __path.resolve(__packageCacheDir(), 's-static-builder/incremental-cache.json');
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<yellow>[build]</yellow> Starting Static Build`,
            });
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<yellow>○</yellow> Environment : ${params.prod
                    ? '<green>production</green>'
                    : '<yellow>development</yellow>'}`,
            });
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<yellow>○</yellow> Host : <cyan>${params.host}</cyan>`,
            });
            let byItemAverage = 0;
            // handle params
            if (params.clean) {
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[build]</yellow> Cleaning the static builder internal cache (incremental, etc...))`,
                });
                try {
                    // failed url file
                    __removeSync(`${__packageRoot()}/SStaticBuilderFailedUrls.txt`);
                    // remove the existing static directory
                    __removeSync(params.outDir);
                    // remove the cache build dir
                    __removeSync(cacheBuildDir);
                    // delete the integrity cache
                    __removeSync(incrementalCache);
                }
                catch (e) { }
            }
            // read the "incremental" cache
            if (params.incremental &&
                __fs.existsSync(incrementalCachePath)) {
                incrementalCache = __readJsonSync(incrementalCachePath);
            }
            // ensure input file exists
            if (!__fs.existsSync(params.input)) {
                throw new Error(`Sorry but the specified input file "<cyan>${params.input}</cyan>" does not exists...`);
            }
            // reading the file
            const xmlStr = __fs
                .readFileSync(params.input, 'utf8')
                .toString();
            // parsing xml
            let xml = yield parseStringPromise(xmlStr);
            let failsCount = 0, failedUrls = [], leftDuration = 0, currentDuration = 0;
            let logsCount = 0;
            // loop on each urls to get his content
            for (let i = 0; i < xml.urlset.url.length; i++) {
                const url = xml.urlset.url[i], urlIntegrity = (_a = url.integrity) === null || _a === void 0 ? void 0 : _a[0], urlLoc = (_b = url.loc) === null || _b === void 0 ? void 0 : _b[0], urlLastMod = (_c = url.lastmod) === null || _c === void 0 ? void 0 : _c[0];
                // generating the output path for the current file
                const outPath = `${params.outDir}/${urlLoc === '/' ? 'index' : urlLoc}.html`.replace(/\/{2,20}/gm, '/'), cacheOutPath = `${cacheBuildDir}/${urlLoc === '/' ? 'index' : urlLoc}.html`.replace(/\/{2,20}/gm, '/');
                emit('log', {
                    clear: __SLog.isTypeEnabled(__SLog.TYPE_VERBOSE) ? false : logsCount,
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[build]</yellow> Reaching the url "<cyan>${urlLoc}</cyan>"...`,
                });
                logsCount = 1;
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[build]</yellow> <magenta>${xml.urlset.url.length - i}</magenta> url(s), <cyan>~${__formatDuration(leftDuration)}</cyan> remaining`,
                });
                logsCount++;
                // incremental build
                if (params.incremental) {
                    if (urlIntegrity &&
                        incrementalCache[urlLoc] == urlIntegrity) {
                        if (__fs.existsSync(cacheOutPath)) {
                            emit('log', {
                                type: __SLog.TYPE_INFO,
                                value: `<yellow>[build]</yellow> Incremental build for url <cyan>${urlLoc}</cyan>`,
                            });
                            logsCount++;
                            __copySync(cacheOutPath, outPath);
                            // continue with next url
                            continue;
                        }
                    }
                }
                const start = Date.now();
                const request = new __SRequest({
                    url: `${params.host}${urlLoc}`,
                    timeout: params.requestTimeout,
                });
                let res, tries = 0;
                while (!res && tries < params.requestRetry) {
                    if (tries > 0) {
                        yield __wait(params.requestRetryTimeout);
                    }
                    res = yield request.send().catch((e) => {
                        emit('log', {
                            // clear: __SLog.isTypeEnabled(__SLog.TYPE_VERBOSE) ? false : logsCount,
                            type: __SLog.TYPE_INFO,
                            value: `<red>[error]</red> The url "<cyan>${urlLoc}</cyan>" cannot be reached...`,
                        });
                        tries++;
                        if (tries >= params.requestRetry) {
                            logsCount = 0;
                            failsCount++;
                            failedUrls.push(urlLoc);
                            __writeFileSync(`${__packageRoot()}/SStaticBuilderFailedUrls.txt`, failedUrls.join('\n'));
                            if (params.failAfter !== -1 &&
                                failsCount >= params.failAfter) {
                                throw new Error(`<red>[error]</red> The static builder has reached the available issues which is set using the "<yellow>failAfter</yellow>" param that is set to <magenta>${params.failAfter}</magenta>`);
                            }
                        }
                    });
                }
                const end = Date.now();
                currentDuration += end - start;
                leftDuration = (end - start) * (xml.urlset.url.length - i) - currentDuration;
                // @ts-ignore
                if (res === null || res === void 0 ? void 0 : res.data) {
                    // saving file
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<green>[build]</green> Saving the page from url "<cyan>${urlLoc}</cyan>"...`,
                    });
                    logsCount++;
                    // @ts-ignore
                    __writeFileSync(cacheOutPath, res.data);
                    __writeFileSync(outPath, res.data);
                    // saving the integrity
                    if (urlIntegrity) {
                        incrementalCache[urlLoc] = urlIntegrity;
                        __writeJsonSync(incrementalCachePath, incrementalCache);
                    }
                }
            }
            // assets
            if (params.assets) {
                for (let i = 0; i < Object.keys(params.assets).length; i++) {
                    const assetObj = params.assets[Object.keys(params.assets)[i]];
                    // filesystem
                    if (assetObj.from.match(/^\//)) {
                        const to = `${assetObj.to}/${assetObj.from.split('/').slice(-1)[0]}`;
                        if (!__fs.existsSync(assetObj.from)) {
                            emit('log', {
                                type: __SLog.TYPE_INFO,
                                value: `<yellow>[assets]</yellow> No "<yellow>${__path.relative(__packageRoot(), assetObj.from)}</yellow>" file to copy...`,
                            });
                        }
                        else {
                            emit('log', {
                                type: __SLog.TYPE_INFO,
                                value: `<yellow>[assets]</yellow> Copying asset "<yellow>${__path.relative(__packageRoot(), assetObj.from)}</yellow>" to "<cyan>${__path.relative(__packageRoot(), assetObj.to)}</cyan>"`,
                            });
                            yield __copy(assetObj.from, to);
                        }
                        // url
                    }
                    else if (assetObj.from.match(/^https?:\/\//)) {
                        const req = new __SRequest({
                            url: assetObj.from,
                        });
                        emit('log', {
                            type: __SLog.TYPE_INFO,
                            value: `<yellow>[assets]</yellow> Getting asset "<yellow>${__path.relative(__packageRoot(), assetObj.from)}</yellow>" to "<cyan>${__path.relative(__packageRoot(), assetObj.to)}</cyan>"`,
                        });
                        const res = yield req.send().catch((error) => {
                            throw new Error(`<red>[error]</red> The requested asset "<yellow>${assetObj.from}</yellow>" is not reachable...`);
                        });
                        // @ts-ignore
                        let data = res.data;
                        try {
                            data = JSON.stringify(data);
                        }
                        catch (e) { }
                        __writeFileSync(assetObj.to, data);
                    }
                }
            }
            resolve();
        }), {
            metas: {
                id: this.constructor.name,
            },
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N0YXRpY0J1aWxkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTU3RhdGljQnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFVBQXFDLE1BQU0seUJBQXlCLENBQUM7QUFFNUUsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFFMUQsT0FBTyxlQUFlLE1BQU0sMkNBQTJDLENBQUM7QUFDeEUsT0FBTyxhQUFhLE1BQU0sMkNBQTJDLENBQUM7QUFHdEUsT0FBTyxpQkFBaUIsTUFBTSwrQ0FBK0MsQ0FBQztBQUM5RSxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxNQUFNLE1BQU0scUJBQXFCLENBQUM7QUFDekMsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sY0FBYyxNQUFNLDBDQUEwQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUM1QyxPQUFPLGVBQWUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN4RSxPQUFPLE1BQU0sTUFBTSxrQ0FBa0MsQ0FBQztBQUN0RCxPQUFPLGdCQUFnQixNQUFNLGdEQUFnRCxDQUFDO0FBQzlFLE9BQU8sWUFBWSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2xFLE9BQU8sVUFBVSxNQUFNLHNDQUFzQyxDQUFDO0FBQzlELE9BQU8sTUFBTSxNQUFNLHNDQUFzQyxDQUFDO0FBMEUxRCxNQUFNLENBQUMsT0FBTyxPQUFPLGNBQWUsU0FBUSxVQUFVO0lBQ2xEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUkscUJBQXFCO1FBQ3JCLE9BQWEsSUFBSyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUM7SUFDL0MsQ0FBQztJQUVEOzs7Ozs7OztP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