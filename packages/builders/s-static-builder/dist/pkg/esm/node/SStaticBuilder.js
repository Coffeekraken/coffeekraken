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
import __SDuration from '@coffeekraken/s-duration';
import __SFrontendServer from '@coffeekraken/s-frontend-server';
import __SGlob from '@coffeekraken/s-glob';
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import __SRequest from '@coffeekraken/s-request';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __copySync, __readJsonSync, __removeSync, __writeFileSync, __writeJsonSync, } from '@coffeekraken/sugar/fs';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __packageCacheDir, __packageRootDir } from '@coffeekraken/sugar/path';
import __formatDuration from '@coffeekraken/sugar/shared/time/formatDuration';
import __wait from '@coffeekraken/sugar/shared/time/wait';
import __fs from 'fs';
import __path from 'path';
import { parseStringPromise } from 'xml2js';
export default class SStaticBuilder extends __SBuilder {
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
        super(__deepMerge(Object.assign({}, __SSugarConfig.get('staticBuilder')), settings !== null && settings !== void 0 ? settings : {}));
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
        return new __SPromise(({ resolve, reject, pipe, emit }) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<yellow>[build]</yellow> Start building your static website`,
            });
            // create the temp build directory
            const cacheBuildDir = `${__packageCacheDir()}/s-static-builder/build`;
            const errorFilePath = `${params.outDir}/errors.json`;
            let errors = [];
            if (__fs.existsSync(errorFilePath)) {
                errors = __readJsonSync(errorFilePath);
            }
            // init incremental cache
            let incrementalCache = {};
            const incrementalCachePath = __path.resolve(__packageCacheDir(), 's-static-builder/incremental-cache.json');
            // make use of frontend server
            let frontendServer;
            if (params.useFrontendServer) {
                frontendServer = new __SFrontendServer();
                yield pipe(frontendServer.start({
                    listen: false,
                }));
            }
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
                    value: `<yellow>[build]</yellow> Cleaning the static builder internal cache (incremental, etc...)`,
                });
                // reset errors
                errors = [];
                try {
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
            // override input xml if want to build from listed errors
            if (params.fromErrors) {
                const errorsList = __readJsonSync(errorFilePath);
                xml = {
                    urlset: {
                        url: [],
                    },
                };
                errorsList.forEach((urlLoc) => {
                    xml.urlset.url.push({
                        loc: urlLoc,
                    });
                });
            }
            // xml = {
            //     urlset: {
            //         url: [
            //             {
            //                 loc:
            //                     '/api/@coffeekraken.sugar.shared.module.isSystem',
            //             },
            //         ],
            //     },
            // };
            let leftDuration = 0, currentDuration = 0;
            let logsCount = 0;
            if (params.fromErrors) {
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[build]</yellow> Scraping pages using the <cyan>${__path.relative(__packageRootDir(), errorFilePath)}</cyan>...`,
                });
            }
            else {
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[build]</yellow> Scraping pages using the <cyan>${__path.relative(__packageRootDir(), params.input)}</cyan>...`,
                });
            }
            let genDuration;
            // loop on each urls to get his content
            for (let i = 0; i < xml.urlset.url.length; i++) {
                const url = xml.urlset.url[i], urlIntegrity = Array.isArray(url.integrity)
                    ? url.integrity[0]
                    : url.integrity, urlLoc = Array.isArray(url.loc) ? url.loc[0] : url.loc, urlLastMod = Array.isArray(url.lastmod)
                    ? url.lastmod[0]
                    : url.lastmod;
                // generating the output path for the current file
                let outPath = `${params.outDir}/${urlLoc === '/' ? 'index' : urlLoc}.html`.replace(/\/{2,20}/gm, '/'), cacheOutPath = `${cacheBuildDir}/${urlLoc === '/' ? 'index' : urlLoc}.html`.replace(/\/{2,20}/gm, '/');
                emit('log', {
                    clear: __SLog.isTypeEnabled(__SLog.TYPE_VERBOSE)
                        ? false
                        : logsCount,
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[build]</yellow> Reaching the url "<cyan>${urlLoc}</cyan>"...`,
                });
                logsCount = 0;
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[build]</yellow> <magenta>${xml.urlset.url.length - i}</magenta> url(s), <cyan>~${__formatDuration(leftDuration)}</cyan> remaining`,
                });
                logsCount++;
                if (genDuration) {
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>[build]</yellow> Last page generated in <yellow>${genDuration.end().formatedDuration}</yellow>`,
                    });
                    logsCount++;
                }
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
                genDuration = new __SDuration();
                let res, tries = 0;
                function castResponse(res) {
                    let json;
                    if (!res.data) {
                        return {
                            status: 404,
                        };
                    }
                    try {
                        json = JSON.parse(res.data);
                        return json;
                    }
                    catch (e) {
                        return res.data;
                    }
                }
                while (typeof res !== 'string' &&
                    tries < params.requestRetry) {
                    if (res && res.status === 404) {
                        break;
                    }
                    if (tries > 0) {
                        emit('log', {
                            type: __SLog.TYPE_INFO,
                            value: `<yellow>[build]</yellow> Retry the url <cyan>${urlLoc}</cyan> for the <magenta>${tries}</magenta> time${tries > 1 ? 's' : ''}...`,
                        });
                        logsCount++;
                        yield __wait(params.requestRetryTimeout);
                    }
                    tries++;
                    if (params.useFrontendServer) {
                        const reqPromise = frontendServer.request(urlLoc, {});
                        res = castResponse(yield reqPromise);
                    }
                    else {
                        const request = new __SRequest({
                            url: `${params.host}${urlLoc}`,
                            timeout: params.requestTimeout,
                        });
                        res = castResponse(yield request.send());
                    }
                }
                let isErrors = typeof res !== 'string';
                if (isErrors) {
                    if (!errors.includes(urlLoc)) {
                        errors.push(urlLoc);
                    }
                    outPath = outPath.replace(/\.html$/, '.json');
                    emit('log', {
                        type: __SLog.TYPE_ERROR,
                        value: `<red>[error]</red> Something goes wrong while rendering the "<cyan>${urlLoc}</cyan>" url. Check out the "<magenta>${urlLoc === '/' ? 'index' : urlLoc}.json</magenta>" file for more infos...`,
                    });
                    logsCount++;
                    __writeJsonSync(outPath, res);
                    __writeJsonSync(errorFilePath, errors);
                }
                else {
                    // remove the item from the list if rendered correctly
                    errors = errors.filter((e) => e !== urlLoc);
                    try {
                        __fs.unlinkSync(outPath.replace(/\.html$/, '.json'));
                    }
                    catch (e) { }
                    __writeJsonSync(errorFilePath, errors);
                }
                const end = Date.now();
                currentDuration += end - start;
                leftDuration =
                    (end - start) * (xml.urlset.url.length - i) -
                        currentDuration;
                // @ts-ignore
                if (!isErrors) {
                    __writeFileSync(cacheOutPath, res);
                    __writeFileSync(outPath, res);
                    // saving the integrity
                    if (urlIntegrity) {
                        incrementalCache[urlLoc] = urlIntegrity;
                        __writeJsonSync(incrementalCachePath, incrementalCache);
                    }
                }
            }
            // assets
            if (params.assets) {
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[build]</yellow> Copying assets:`,
                });
                for (let i = 0; i < Object.keys(params.assets).length; i++) {
                    const assetObj = params.assets[Object.keys(params.assets)[i]];
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>[build]</yellow> - <cyan>${__path.relative(__packageRootDir(), assetObj.from)}${assetObj.glob ? `/${assetObj.glob}` : ''}</cyan> to <magenta>${__path.relative(__packageRootDir(), assetObj.to)}</magenta>`,
                    });
                    // filesystem
                    if (assetObj.from.match(/^\//)) {
                        // copy files
                        __SGlob.copySync((_a = assetObj.glob) !== null && _a !== void 0 ? _a : '', assetObj.to, {
                            cwd: assetObj.from,
                        });
                        // url
                    }
                    else if (assetObj.from.match(/^https?:\/\//)) {
                        const req = new __SRequest({
                            url: assetObj.from,
                        });
                        emit('log', {
                            type: __SLog.TYPE_INFO,
                            value: `<yellow>[assets]</yellow> Getting asset "<yellow>${__path.relative(__packageRootDir(), assetObj.from)}</yellow>" to "<cyan>${__path.relative(__packageRootDir(), assetObj.to)}</cyan>"`,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBRW5ELE9BQU8saUJBQWlCLE1BQU0saUNBQWlDLENBQUM7QUFDaEUsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFDM0MsT0FBTyxNQUFNLE1BQU0scUJBQXFCLENBQUM7QUFDekMsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFDMUQsT0FBTyxFQUNILFVBQVUsRUFDVixjQUFjLEVBQ2QsWUFBWSxFQUNaLGVBQWUsRUFDZixlQUFlLEdBQ2xCLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQy9FLE9BQU8sZ0JBQWdCLE1BQU0sZ0RBQWdELENBQUM7QUFDOUUsT0FBTyxNQUFNLE1BQU0sc0NBQXNDLENBQUM7QUFDMUQsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxRQUFRLENBQUM7QUF5RTVDLE1BQU0sQ0FBQyxPQUFPLE9BQU8sY0FBZSxTQUFRLFVBQVU7SUFDbEQ7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLFFBQTJDO1FBQ25ELEtBQUssQ0FDRCxXQUFXLG1CQUVBLGNBQWMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLEdBRTFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUs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