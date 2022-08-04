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
const copySync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/copySync"));
const readJsonSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/readJsonSync"));
const removeSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/removeSync"));
const writeFileSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/writeFileSync"));
const writeJsonSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/writeJsonSync"));
const packageCacheDir_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageCacheDir"));
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const formatDuration_1 = __importDefault(require("@coffeekraken/sugar/shared/time/formatDuration"));
const wait_1 = __importDefault(require("@coffeekraken/sugar/shared/time/wait"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
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
        super((0, deepMerge_1.default)(Object.assign({}, s_sugar_config_1.default.get('staticBuilder')), settings !== null && settings !== void 0 ? settings : {}));
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
            const cacheBuildDir = `${(0, packageCacheDir_1.default)()}/s-static-builder/build`;
            const errorFilePath = `${params.outDir}/errors.json`;
            let errors = [];
            if (fs_1.default.existsSync(errorFilePath)) {
                errors = (0, readJsonSync_1.default)(errorFilePath);
            }
            // init incremental cache
            let incrementalCache = {};
            const incrementalCachePath = path_1.default.resolve((0, packageCacheDir_1.default)(), 's-static-builder/incremental-cache.json');
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
                    value: `<yellow>[build]</yellow> Cleaning the static builder internal cache (incremental, etc...))`,
                });
                // reset errors
                errors = [];
                try {
                    // remove the existing static directory
                    (0, removeSync_1.default)(params.outDir);
                    // remove the cache build dir
                    (0, removeSync_1.default)(cacheBuildDir);
                    // delete the integrity cache
                    (0, removeSync_1.default)(incrementalCache);
                }
                catch (e) { }
            }
            // read the "incremental" cache
            if (params.incremental &&
                fs_1.default.existsSync(incrementalCachePath)) {
                incrementalCache = (0, readJsonSync_1.default)(incrementalCachePath);
            }
            // ensure input file exists
            if (!fs_1.default.existsSync(params.input)) {
                throw new Error(`Sorry but the specified input file "<cyan>${params.input}</cyan>" does not exists...`);
            }
            // reading the file
            const xmlStr = fs_1.default
                .readFileSync(params.input, 'utf8')
                .toString();
            // parsing xml
            let xml = yield (0, xml2js_1.parseStringPromise)(xmlStr);
            // override input xml if want to build from listed errors
            if (params.fromErrors) {
                const errorsList = (0, readJsonSync_1.default)(errorFilePath);
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
                    value: `<yellow>[build]</yellow> Scraping pages using the <cyan>${path_1.default.relative((0, packageRoot_1.default)(), errorFilePath)}</cyan>...`,
                });
            }
            else {
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `<yellow>[build]</yellow> Scraping pages using the <cyan>${path_1.default.relative((0, packageRoot_1.default)(), params.input)}</cyan>...`,
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
                    value: `<yellow>[build]</yellow> <magenta>${xml.urlset.url.length - i}</magenta> url(s), <cyan>~${(0, formatDuration_1.default)(leftDuration)}</cyan> remaining`,
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
                        if (fs_1.default.existsSync(cacheOutPath)) {
                            emit('log', {
                                type: s_log_1.default.TYPE_INFO,
                                value: `<yellow>[build]</yellow> Incremental build for url <cyan>${urlLoc}</cyan>`,
                            });
                            logsCount++;
                            (0, copySync_1.default)(cacheOutPath, outPath);
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
                        yield (0, wait_1.default)(params.requestRetryTimeout);
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
                    (0, writeJsonSync_1.default)(outPath, res);
                    (0, writeJsonSync_1.default)(errorFilePath, errors);
                }
                else {
                    // remove the item from the list if rendered correctly
                    errors = errors.filter((e) => e !== urlLoc);
                    try {
                        fs_1.default.unlinkSync(outPath.replace(/\.html$/, '.json'));
                    }
                    catch (e) { }
                    (0, writeJsonSync_1.default)(errorFilePath, errors);
                }
                const end = Date.now();
                currentDuration += end - start;
                leftDuration =
                    (end - start) * (xml.urlset.url.length - i) -
                        currentDuration;
                // @ts-ignore
                if (!isErrors) {
                    (0, writeFileSync_1.default)(cacheOutPath, res);
                    (0, writeFileSync_1.default)(outPath, res);
                    // saving the integrity
                    if (urlIntegrity) {
                        incrementalCache[urlLoc] = urlIntegrity;
                        (0, writeJsonSync_1.default)(incrementalCachePath, incrementalCache);
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
                        value: `<yellow>[build]</yellow> - <cyan>${path_1.default.relative((0, packageRoot_1.default)(), assetObj.from)}${assetObj.glob ? `/${assetObj.glob}` : ''}</cyan> to <magenta>${path_1.default.relative((0, packageRoot_1.default)(), assetObj.to)}</magenta>`,
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
                            value: `<yellow>[assets]</yellow> Getting asset "<yellow>${path_1.default.relative((0, packageRoot_1.default)(), assetObj.from)}</yellow>" to "<cyan>${path_1.default.relative((0, packageRoot_1.default)(), assetObj.to)}</cyan>"`,
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
                        (0, writeFileSync_1.default)(assetObj.to, data);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esd0VBQWlEO0FBQ2pELDBFQUFtRDtBQUVuRCx3RkFBZ0U7QUFDaEUsa0VBQTJDO0FBQzNDLGdFQUF5QztBQUN6Qyx3RUFBaUQ7QUFDakQsd0VBQWlEO0FBQ2pELGtGQUEwRDtBQUMxRCxvRkFBOEQ7QUFDOUQsNEZBQXNFO0FBQ3RFLHdGQUFrRTtBQUNsRSw4RkFBd0U7QUFDeEUsOEZBQXdFO0FBQ3hFLG9HQUE4RTtBQUM5RSw0RkFBc0U7QUFDdEUsNEZBQXNFO0FBQ3RFLG9HQUE4RTtBQUM5RSxnRkFBMEQ7QUFDMUQsNENBQXNCO0FBQ3RCLGdEQUEwQjtBQUMxQixtQ0FBNEM7QUF5RTVDLE1BQXFCLGNBQWUsU0FBUSxtQkFBVTtJQUNsRDs7Ozs7Ozs7T0FRRztJQUNILFlBQVksUUFBMkM7UUFDbkQsS0FBSyxDQUNELElBQUEsbUJBQVcsb0JBRUEsd0JBQWMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLEdBRTFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsTUFBTSxDQUFDLE1BQWtDO1FBQ3JDLE9BQU8sSUFBSSxtQkFBVSxDQUNqQixDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTs7WUFDdEMsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDUixJQUFJLEVBQUUsZUFBTSxDQUFDLFNBQVM7Z0JBQ3RCLEtBQUssRUFBRSw2REFBNkQ7YUFDdkUsQ0FBQyxDQUFDO1lBRUgsa0NBQWtDO1lBQ2xDLE1BQU0sYUFBYSxHQUFHLEdBQUcsSUFBQSx5QkFBaUIsR0FBRSx5QkFBeUIsQ0FBQztZQUV0RSxNQUFNLGFBQWEsR0FBRyxHQUFHLE1B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