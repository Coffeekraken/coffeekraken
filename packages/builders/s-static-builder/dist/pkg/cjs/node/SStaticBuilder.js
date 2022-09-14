"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_builder_1 = __importDefault(require("@coffeekraken/s-builder"));
const s_duration_1 = __importDefault(require("@coffeekraken/s-duration"));
const s_frontend_server_1 = __importDefault(require("@coffeekraken/s-frontend-server"));
const s_glob_1 = __importDefault(require("@coffeekraken/s-glob"));
const s_log_1 = __importDefault(require("@coffeekraken/s-log"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const s_request_1 = __importDefault(require("@coffeekraken/s-request"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const datetime_1 = require("@coffeekraken/sugar/datetime");
const fs_1 = require("@coffeekraken/sugar/fs");
const object_1 = require("@coffeekraken/sugar/object");
const path_1 = require("@coffeekraken/sugar/path");
const fs_2 = __importDefault(require("fs"));
const path_2 = __importDefault(require("path"));
const xml2js_1 = require("xml2js");
class SStaticBuilder extends s_builder_1.default {
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
        super((0, object_1.__deepMerge)(Object.assign({}, s_sugar_config_1.default.get('staticBuilder')), settings !== null && settings !== void 0 ? settings : {}));
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
        return new s_promise_1.default(({ resolve, reject, pipe, emit }) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            emit('log', {
                type: s_log_1.default.TYPE_INFO,
                value: `<yellow>[build]</yellow> Start building your static website`,
            });
            // create the temp build directory
            const cacheBuildDir = `${(0, path_1.__packageCacheDir)()}/s-static-builder/build`;
            const errorFilePath = `${params.outDir}/errors.json`;
            let errors = [];
            if (fs_2.default.existsSync(errorFilePath)) {
                errors = (0, fs_1.__readJsonSync)(errorFilePath);
            }
            // init incremental cache
            let incrementalCache = {};
            const incrementalCachePath = path_2.default.resolve((0, path_1.__packageCacheDir)(), 's-static-builder/incremental-cache.json');
            // make use of frontend server
            let frontendServer;
            if (params.useFrontendServer) {
                frontendServer = new s_frontend_server_1.default();
                yield pipe(frontendServer.start({
                    listen: false,
                }));
            }
            emit('log', {
                type: s_log_1.default.TYPE_INFO,
                value: `<yellow>[build]</yellow> Starting Static Build`,
            });
            emit('log', {
                type: s_log_1.default.TYPE_INFO,
                value: `<yellow>○</yellow> Environment : ${params.prod
                    ? '<green>production</green>'
                    : '<yellow>development</yellow>'}`,
            });
            emit('log', {
                type: s_log_1.default.TYPE_INFO,
                value: `<yellow>○</yellow> Host : <cyan>${params.host}</cyan>`,
            });
            let byItemAverage = 0;
            // handle params
            if (params.clean) {
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `<yellow>[build]</yellow> Cleaning the static builder internal cache (incremental, etc...)`,
                });
                // reset errors
                errors = [];
                try {
                    // remove the existing static directory
                    (0, fs_1.__removeSync)(params.outDir);
                    // remove the cache build dir
                    (0, fs_1.__removeSync)(cacheBuildDir);
                    // delete the integrity cache
                    (0, fs_1.__removeSync)(incrementalCache);
                }
                catch (e) { }
            }
            // read the "incremental" cache
            if (params.incremental &&
                fs_2.default.existsSync(incrementalCachePath)) {
                incrementalCache = (0, fs_1.__readJsonSync)(incrementalCachePath);
            }
            // ensure input file exists
            if (!fs_2.default.existsSync(params.input)) {
                throw new Error(`Sorry but the specified input file "<cyan>${params.input}</cyan>" does not exists...`);
            }
            // reading the file
            const xmlStr = fs_2.default
                .readFileSync(params.input, 'utf8')
                .toString();
            // parsing xml
            let xml = yield (0, xml2js_1.parseStringPromise)(xmlStr);
            // override input xml if want to build from listed errors
            if (params.fromErrors) {
                const errorsList = (0, fs_1.__readJsonSync)(errorFilePath);
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
                    type: s_log_1.default.TYPE_INFO,
                    value: `<yellow>[build]</yellow> Scraping pages using the <cyan>${path_2.default.relative((0, path_1.__packageRootDir)(), errorFilePath)}</cyan>...`,
                });
            }
            else {
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `<yellow>[build]</yellow> Scraping pages using the <cyan>${path_2.default.relative((0, path_1.__packageRootDir)(), params.input)}</cyan>...`,
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
                    clear: s_log_1.default.isTypeEnabled(s_log_1.default.TYPE_VERBOSE)
                        ? false
                        : logsCount,
                    type: s_log_1.default.TYPE_INFO,
                    value: `<yellow>[build]</yellow> Reaching the url "<cyan>${urlLoc}</cyan>"...`,
                });
                logsCount = 0;
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `<yellow>[build]</yellow> <magenta>${xml.urlset.url.length - i}</magenta> url(s), <cyan>~${(0, datetime_1.__formatDuration)(leftDuration)}</cyan> remaining`,
                });
                logsCount++;
                if (genDuration) {
                    emit('log', {
                        type: s_log_1.default.TYPE_INFO,
                        value: `<yellow>[build]</yellow> Last page generated in <yellow>${genDuration.end().formatedDuration}</yellow>`,
                    });
                    logsCount++;
                }
                // incremental build
                if (params.incremental) {
                    if (urlIntegrity &&
                        incrementalCache[urlLoc] == urlIntegrity) {
                        if (fs_2.default.existsSync(cacheOutPath)) {
                            emit('log', {
                                type: s_log_1.default.TYPE_INFO,
                                value: `<yellow>[build]</yellow> Incremental build for url <cyan>${urlLoc}</cyan>`,
                            });
                            logsCount++;
                            (0, fs_1.__copySync)(cacheOutPath, outPath);
                            // continue with next url
                            continue;
                        }
                    }
                }
                const start = Date.now();
                genDuration = new s_duration_1.default();
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
                            type: s_log_1.default.TYPE_INFO,
                            value: `<yellow>[build]</yellow> Retry the url <cyan>${urlLoc}</cyan> for the <magenta>${tries}</magenta> time${tries > 1 ? 's' : ''}...`,
                        });
                        logsCount++;
                        yield (0, datetime_1.__wait)(params.requestRetryTimeout);
                    }
                    tries++;
                    if (params.useFrontendServer) {
                        const reqPromise = frontendServer.request(urlLoc, {});
                        res = castResponse(yield reqPromise);
                    }
                    else {
                        const request = new s_request_1.default({
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
                        type: s_log_1.default.TYPE_ERROR,
                        value: `<red>[error]</red> Something goes wrong while rendering the "<cyan>${urlLoc}</cyan>" url. Check out the "<magenta>${urlLoc === '/' ? 'index' : urlLoc}.json</magenta>" file for more infos...`,
                    });
                    logsCount++;
                    (0, fs_1.__writeJsonSync)(outPath, res);
                    (0, fs_1.__writeJsonSync)(errorFilePath, errors);
                }
                else {
                    // remove the item from the list if rendered correctly
                    errors = errors.filter((e) => e !== urlLoc);
                    try {
                        fs_2.default.unlinkSync(outPath.replace(/\.html$/, '.json'));
                    }
                    catch (e) { }
                    (0, fs_1.__writeJsonSync)(errorFilePath, errors);
                }
                const end = Date.now();
                currentDuration += end - start;
                leftDuration =
                    (end - start) * (xml.urlset.url.length - i) -
                        currentDuration;
                // @ts-ignore
                if (!isErrors) {
                    (0, fs_1.__writeFileSync)(cacheOutPath, res);
                    (0, fs_1.__writeFileSync)(outPath, res);
                    // saving the integrity
                    if (urlIntegrity) {
                        incrementalCache[urlLoc] = urlIntegrity;
                        (0, fs_1.__writeJsonSync)(incrementalCachePath, incrementalCache);
                    }
                }
            }
            // assets
            if (params.assets) {
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `<yellow>[build]</yellow> Copying assets:`,
                });
                for (let i = 0; i < Object.keys(params.assets).length; i++) {
                    const assetObj = params.assets[Object.keys(params.assets)[i]];
                    emit('log', {
                        type: s_log_1.default.TYPE_INFO,
                        value: `<yellow>[build]</yellow> - <cyan>${path_2.default.relative((0, path_1.__packageRootDir)(), assetObj.from)}${assetObj.glob ? `/${assetObj.glob}` : ''}</cyan> to <magenta>${path_2.default.relative((0, path_1.__packageRootDir)(), assetObj.to)}</magenta>`,
                    });
                    // filesystem
                    if (assetObj.from.match(/^\//)) {
                        // copy files
                        s_glob_1.default.copySync((_a = assetObj.glob) !== null && _a !== void 0 ? _a : '', assetObj.to, {
                            cwd: assetObj.from,
                        });
                        // url
                    }
                    else if (assetObj.from.match(/^https?:\/\//)) {
                        const req = new s_request_1.default({
                            url: assetObj.from,
                        });
                        emit('log', {
                            type: s_log_1.default.TYPE_INFO,
                            value: `<yellow>[assets]</yellow> Getting asset "<yellow>${path_2.default.relative((0, path_1.__packageRootDir)(), assetObj.from)}</yellow>" to "<cyan>${path_2.default.relative((0, path_1.__packageRootDir)(), assetObj.to)}</cyan>"`,
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
                        (0, fs_1.__writeFileSync)(assetObj.to, data);
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
exports.default = SStaticBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esd0VBQWlEO0FBQ2pELDBFQUFtRDtBQUVuRCx3RkFBZ0U7QUFDaEUsa0VBQTJDO0FBQzNDLGdFQUF5QztBQUN6Qyx3RUFBaUQ7QUFDakQsd0VBQWlEO0FBQ2pELGtGQUEwRDtBQUMxRCwyREFBd0U7QUFDeEUsK0NBTWdDO0FBQ2hDLHVEQUF5RDtBQUN6RCxtREFBK0U7QUFDL0UsNENBQXNCO0FBQ3RCLGdEQUEwQjtBQUMxQixtQ0FBNEM7QUF5RTVDLE1BQXFCLGNBQWUsU0FBUSxtQkFBVTtJQUNsRDs7Ozs7Ozs7T0FRRztJQUNILFlBQVksUUFBMkM7UUFDbkQsS0FBSyxDQUNELElBQUEsb0JBQVcsb0JBRUEsd0JBQWMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLEdBRTFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsTUFBTSxDQUFDLE1BQWtDO1FBQ3JDLE9BQU8sSUFBSSxtQkFBVSxDQUNqQixDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTs7WUFDdEMsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDUixJQUFJLEVBQUUsZUFBTSxDQUFDLFNBQVM7Z0JBQ3RCLEtBQUssRUFBRSw2REFBNkQ7YUFDdkUsQ0FBQyxDQUFDO1lBRUgsa0NBQWtDO1lBQ2xDLE1BQU0sYUFBYSxHQUFHLEdBQUcsSUFBQSx3QkFBaUIsR0FBRSx5QkFBeUIsQ0FBQztZQUV0RSxNQUFNLGFBQWEsR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLGNBQWMsQ0FBQztZQUVyRCxJQUFJLE1BQU0sR0FBVSxFQUFFLENBQUM7WUFDdkIsSUFBSSxZQUFJLENBQUMsVUFB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