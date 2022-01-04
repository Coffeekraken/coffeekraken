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
export default class SStaticBuilder extends __SBuilder {
    /**
     * @name            staticBuilderSettings
     * @type            ISStaticBuilderSettings
     * @get
     *
     * Access the postcss builder settings
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
            // handle params
            if (params.clean) {
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[build]</yellow> Cleaning the static builder internal cache (incremental, etc...))`,
                });
                try {
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
            let failsCount = 0, failedUrls = [], currentDuration = 0;
            // loop on each urls to get his content
            for (let i = 0; i < xml.urlset.url.length; i++) {
                const url = xml.urlset.url[i], urlIntegrity = (_a = url.integrity) === null || _a === void 0 ? void 0 : _a[0], urlLoc = (_b = url.loc) === null || _b === void 0 ? void 0 : _b[0], urlLastMod = (_c = url.lastmod) === null || _c === void 0 ? void 0 : _c[0];
                // generating the output path for the current file
                const outPath = `${params.outDir}/${urlLoc === '/' ? 'index' : urlLoc}.html`.replace(/\/{2,20}/gm, '/'), cacheOutPath = `${cacheBuildDir}/${urlLoc === '/' ? 'index' : urlLoc}.html`.replace(/\/{2,20}/gm, '/');
                // incremental build
                if (params.incremental) {
                    if (urlIntegrity &&
                        incrementalCache[urlLoc] == urlIntegrity) {
                        if (__fs.existsSync(cacheOutPath)) {
                            emit('log', {
                                type: __SLog.TYPE_INFO,
                                value: `<yellow>[build]</yellow> Incremental build for url <cyan>${urlLoc}</cyan>`,
                            });
                            __copySync(cacheOutPath, outPath);
                            // continue with next url
                            continue;
                        }
                    }
                }
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[build]</yellow> Reaching the url "<cyan>${urlLoc}</cyan>"...`,
                });
                const start = Date.now();
                const request = new __SRequest({
                    url: `${params.host}${urlLoc}`,
                    timeout: params.requestTimeout,
                });
                const res = yield request.send().catch((e) => {
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<red>[error]</red> The url "<cyan>${urlLoc}</cyan>" cannot be reached...`,
                    });
                    failsCount++;
                    failedUrls.push(urlLoc);
                    __writeFileSync(`${__packageRoot()}/SStaticBuilderFailedUrls.txt`, failedUrls.join('\n'));
                    if (params.failAfter !== -1 &&
                        failsCount >= params.failAfter) {
                        throw new Error(`<red>[error]</red> The static builder has reached the available issues which is set using the "<yellow>failAfter</yellow>" param that is set to <magenta>${params.failAfter}</magenta>`);
                    }
                });
                const end = Date.now();
                currentDuration += end - start;
                const average = currentDuration / i;
                // @ts-ignore
                if (res === null || res === void 0 ? void 0 : res.data) {
                    // saving file
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<green>[build]</green> Saving the page from url "<cyan>${urlLoc}</cyan>"...`,
                    });
                    // @ts-ignore
                    __writeFileSync(cacheOutPath, res.data);
                    __writeFileSync(outPath, res.data);
                    // saving the integrity
                    if (urlIntegrity) {
                        incrementalCache[urlLoc] = urlIntegrity;
                        __writeJsonSync(incrementalCachePath, incrementalCache);
                    }
                }
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[build]</yellow> <magenta>${xml.urlset.url.length - i}</magenta> url(s), <cyan>~${__formatDuration(average * (xml.urlset.url.length - i))}</cyan> remaining`,
                });
                // if (i >= 1) break;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N0YXRpY0J1aWxkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTU3RhdGljQnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFVBQXFDLE1BQU0seUJBQXlCLENBQUM7QUFFNUUsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFFMUQsT0FBTyxlQUFlLE1BQU0sMkNBQTJDLENBQUM7QUFDeEUsT0FBTyxhQUFhLE1BQU0sMkNBQTJDLENBQUM7QUFHdEUsT0FBTyxpQkFBaUIsTUFBTSwrQ0FBK0MsQ0FBQztBQUM5RSxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxNQUFNLE1BQU0scUJBQXFCLENBQUM7QUFDekMsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sY0FBYyxNQUFNLDBDQUEwQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUM1QyxPQUFPLGVBQWUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN4RSxPQUFPLE1BQU0sTUFBTSxrQ0FBa0MsQ0FBQztBQUN0RCxPQUFPLGdCQUFnQixNQUFNLGdEQUFnRCxDQUFDO0FBQzlFLE9BQU8sWUFBWSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2xFLE9BQU8sVUFBVSxNQUFNLHNDQUFzQyxDQUFDO0FBdUU5RCxNQUFNLENBQUMsT0FBTyxPQUFPLGNBQWUsU0FBUSxVQUFVO0lBQ2xEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUkscUJBQXFCO1FBQ3JCLE9BQWEsSUFBSyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUM7SUFDL0MsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0gsWUFBWSxRQUErQztRQUN2RCxLQUFLLENB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