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
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            console.log(`<yellow>[build]</yellow> Start building your static website`);
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
            console.log(`<yellow>[build]</yellow> Starting Static Build`);
            console.log(`<yellow>○</yellow> Target : ${params.target === 'production'
                ? '<green>production</green>'
                : '<yellow>development</yellow>'}`);
            console.log(`<yellow>○</yellow> Host   : <cyan>${params.host}</cyan>`);
            // handle params
            if (params.clean) {
                console.log(`<yellow>[build]</yellow> Cleaning the static builder internal cache (incremental, etc...)`);
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
            if (params.incremental && fs_2.default.existsSync(incrementalCachePath)) {
                incrementalCache = (0, fs_1.__readJsonSync)(incrementalCachePath);
            }
            // ensure input file exists
            if (!fs_2.default.existsSync(params.input)) {
                throw new Error(`Sorry but the specified input file "<cyan>${params.input}</cyan>" does not exists...`);
            }
            // reading the file
            const xmlStr = fs_2.default.readFileSync(params.input, 'utf8').toString();
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
            let leftDuration = 0, currentDuration = 0;
            let logsCount = 0;
            if (params.fromErrors) {
                console.log(`<yellow>[build]</yellow> Scraping pages using the <cyan>${path_2.default.relative((0, path_1.__packageRootDir)(), errorFilePath)}</cyan>...`);
            }
            else {
                console.log(`<yellow>[build]</yellow> Scraping pages using the <cyan>${path_2.default.relative((0, path_1.__packageRootDir)(), params.input)}</cyan>...`);
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
                console.log({
                    clear: s_log_1.default.isTypeEnabled(s_log_1.default.TYPE_VERBOSE)
                        ? false
                        : logsCount,
                    type: s_log_1.default.TYPE_INFO,
                    value: `<yellow>[build]</yellow> Reaching the url "<cyan>${urlLoc}</cyan>"...`,
                });
                logsCount = 0;
                console.log({
                    type: s_log_1.default.TYPE_INFO,
                    value: `<yellow>[build]</yellow> <magenta>${xml.urlset.url.length - i}</magenta> url(s), <cyan>~${(0, datetime_1.__formatDuration)(leftDuration)}</cyan> remaining`,
                });
                logsCount++;
                if (genDuration) {
                    console.log({
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
                            console.log(`<yellow>[build]</yellow> Incremental build for url <cyan>${urlLoc}</cyan>`);
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
                while (typeof res !== 'string' && tries < params.requestRetry) {
                    if (res && res.status === 404) {
                        break;
                    }
                    if (tries > 0) {
                        console.log(`<yellow>[build]</yellow> Retry the url <cyan>${urlLoc}</cyan> for the <magenta>${tries}</magenta> time${tries > 1 ? 's' : ''}...`);
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
                    console.log(`<red>[error]</red> Something goes wrong while rendering the "<cyan>${urlLoc}</cyan>" url. Check out the "<magenta>${urlLoc === '/' ? 'index' : urlLoc}.json</magenta>" file for more infos...`);
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
                for (let i = 0; i < Object.keys(params.assets).length; i++) {
                    const assetObj = params.assets[Object.keys(params.assets)[i]];
                    console.log(`<yellow>[build]</yellow> Copying assets from "<cyan>${path_2.default.relative((0, path_1.__packageRootDir)(), assetObj.from)}${assetObj.glob ? `/${assetObj.glob}` : ''}</cyan>" to "<magenta>${path_2.default.relative((0, path_1.__packageRootDir)(), assetObj.to)}</magenta>"`);
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
                        // console.log(
                        //     `<yellow>[assets]</yellow> Getting asset "<yellow>${__path.relative(
                        //         __packageRootDir(),
                        //         assetObj.from,
                        //     )}</yellow>" to "<cyan>${__path.relative(
                        //         __packageRootDir(),
                        //         assetObj.to,
                        //     )}</cyan>"`,
                        // );
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
        }));
    }
}
exports.default = SStaticBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esd0VBQWlEO0FBQ2pELDBFQUFtRDtBQUVuRCx3RkFBZ0U7QUFDaEUsa0VBQTJDO0FBQzNDLGdFQUF5QztBQUN6Qyx3RUFBaUQ7QUFDakQsa0ZBQTBEO0FBQzFELDJEQUF3RTtBQUN4RSwrQ0FNZ0M7QUFDaEMsdURBQXlEO0FBQ3pELG1EQUErRTtBQUMvRSw0Q0FBc0I7QUFDdEIsZ0RBQTBCO0FBQzFCLG1DQUE0QztBQTBFNUMsTUFBcUIsY0FBZSxTQUFRLG1CQUFVO0lBQ2xEOzs7Ozs7OztPQVFHO0lBQ0gsWUFBWSxRQUEyQztRQUNuRCxLQUFLLENBQ0QsSUFBQSxvQkFBVyxvQkFFQSx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsR0FFMUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDSCxNQUFNLENBQ0YsTUFBa0M7UUFFbEMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFOztZQUNqQyxPQUFPLENBQUMsR0FBRyxDQUNQLDZEQUE2RCxDQUNoRSxDQUFDO1lBRUYsa0NBQWtDO1lBQ2xDLE1BQU0sYUFBYSxHQUFHLEdBQUcsSUFBQSx3QkFBaUIsR0FBRSx5QkFBeUIsQ0FBQztZQUV0RSxNQUFNLGFBQWEsR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLGNBQWMsQ0FBQztZQUVyRCxJQUFJLE1BQU0sR0FBVSxFQUFFLENBQUM7WUFDdkIsSUFBSSxZQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxFQUFFO2dCQUNoQyxNQUFNLEdBQUcsSUFBQSxtQkFBYyxFQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQzFDO1lBRUQseUJBQXlCO1lBQ3pCLElBQUksZ0JBQWdCLEdB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