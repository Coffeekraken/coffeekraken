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
const fs_1 = require("@coffeekraken/sugar/fs");
const object_1 = require("@coffeekraken/sugar/object");
const path_1 = require("@coffeekraken/sugar/path");
const formatDuration_1 = __importDefault(require("@coffeekraken/sugar/shared/time/formatDuration"));
const wait_1 = __importDefault(require("@coffeekraken/sugar/shared/time/wait"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esd0VBQWlEO0FBQ2pELDBFQUFtRDtBQUVuRCx3RkFBZ0U7QUFDaEUsa0VBQTJDO0FBQzNDLGdFQUF5QztBQUN6Qyx3RUFBaUQ7QUFDakQsd0VBQWlEO0FBQ2pELGtGQUEwRDtBQUMxRCwrQ0FNZ0M7QUFDaEMsdURBQXlEO0FBQ3pELG1EQUErRTtBQUMvRSxvR0FBOEU7QUFDOUUsZ0ZBQTBEO0FBQzFELDRDQUFzQjtBQUN0QixnREFBMEI7QUFDMUIsbUNBQTRDO0FBeUU1QyxNQUFxQixjQUFlLFNBQVEsbUJBQVU7SUFDbEQ7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLFFBQTJDO1FBQ25ELEtBQUssQ0FDRCxJQUFBLG9CQUFXLG9CQUVBLHdCQUFjLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxHQUUxQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNILE1BQU0sQ0FBQyxNQUFrQztRQUNyQyxPQUFPLElBQUksbUJBQVUsQ0FDakIsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7O1lBQ3RDLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLGVBQU0sQ0FBQyxTQUFTO2dCQUN0QixLQUFLLEVBQUUsNkRBQTZEO2FBQ3ZFLENBQUMsQ0FBQztZQUVILGtDQUFrQztZQUNsQyxNQUFNLGFBQWEsR0FBRyxHQUFHLElBQUEsd0JBQWlCLEdBQUUseUJBQXlCLENBQUM7WUFFdEUsTUFBTSxhQUFhLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxjQUFjLENBQUM7WUFFckQsSUFBSSxNQUFNLEdBQVUsRUFBRSxDQUFDO1lBQ3ZCLElBQUks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