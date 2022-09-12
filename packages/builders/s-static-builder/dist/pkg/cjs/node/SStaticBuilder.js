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
const path_1 = require("@coffeekraken/sugar/path");
const path_2 = require("@coffeekraken/sugar/path");
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const formatDuration_1 = __importDefault(require("@coffeekraken/sugar/shared/time/formatDuration"));
const wait_1 = __importDefault(require("@coffeekraken/sugar/shared/time/wait"));
const fs_2 = __importDefault(require("fs"));
const path_3 = __importDefault(require("path"));
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
            const cacheBuildDir = `${(0, path_1.__packageCacheDir)()}/s-static-builder/build`;
            const errorFilePath = `${params.outDir}/errors.json`;
            let errors = [];
            if (fs_2.default.existsSync(errorFilePath)) {
                errors = (0, fs_1.__readJsonSync)(errorFilePath);
            }
            // init incremental cache
            let incrementalCache = {};
            const incrementalCachePath = path_3.default.resolve((0, path_1.__packageCacheDir)(), 's-static-builder/incremental-cache.json');
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
                    value: `<yellow>[build]</yellow> Scraping pages using the <cyan>${path_3.default.relative((0, path_2.__packageRootDir)(), errorFilePath)}</cyan>...`,
                });
            }
            else {
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `<yellow>[build]</yellow> Scraping pages using the <cyan>${path_3.default.relative((0, path_2.__packageRootDir)(), params.input)}</cyan>...`,
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
                        value: `<yellow>[build]</yellow> - <cyan>${path_3.default.relative((0, path_2.__packageRootDir)(), assetObj.from)}${assetObj.glob ? `/${assetObj.glob}` : ''}</cyan> to <magenta>${path_3.default.relative((0, path_2.__packageRootDir)(), assetObj.to)}</magenta>`,
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
                            value: `<yellow>[assets]</yellow> Getting asset "<yellow>${path_3.default.relative((0, path_2.__packageRootDir)(), assetObj.from)}</yellow>" to "<cyan>${path_3.default.relative((0, path_2.__packageRootDir)(), assetObj.to)}</cyan>"`,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esd0VBQWlEO0FBQ2pELDBFQUFtRDtBQUVuRCx3RkFBZ0U7QUFDaEUsa0VBQTJDO0FBQzNDLGdFQUF5QztBQUN6Qyx3RUFBaUQ7QUFDakQsd0VBQWlEO0FBQ2pELGtGQUEwRDtBQUMxRCwrQ0FNZ0M7QUFDaEMsbURBQTZEO0FBQzdELG1EQUE0RDtBQUM1RCw0RkFBc0U7QUFDdEUsb0dBQThFO0FBQzlFLGdGQUEwRDtBQUMxRCw0Q0FBc0I7QUFDdEIsZ0RBQTBCO0FBQzFCLG1DQUE0QztBQXlFNUMsTUFBcUIsY0FBZSxTQUFRLG1CQUFVO0lBQ2xEOzs7Ozs7OztPQVFHO0lBQ0gsWUFBWSxRQUEyQztRQUNuRCxLQUFLLENBQ0QsSUFBQSxtQkFBVyxvQkFFQSx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsR0FFMUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDSCxNQUFNLENBQUMsTUFBa0M7UUFDckMsT0FBTyxJQUFJLG1CQUFVLENBQ2pCLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFOztZQUN0QyxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNSLElBQUksRUFBRSxlQUFNLENBQUMsU0FBUztnQkFDdEIsS0FBSyxFQUFFLDZEQUE2RDthQUN2RSxDQUFDLENBQUM7WUFFSCxrQ0FBa0M7WUFDbEMsTUFBTSxhQUFhLEdBQUcsR0FBRyxJQUFBLHdCQUFpQixHQUFFLHlCQUF5QixDQUFDO1lBRXRFLE1BQU0sYUFBYSxHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sY0FBYyxDQUFDO1lBRXJELElBQUksTUFBTSxHQUFVLEVBQUUsQ0FB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