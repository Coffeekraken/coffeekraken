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
            console.log(`<yellow>○</yellow> Input  : <cyan>${params.input}</cyan>`);
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
                let parsedUrl;
                try {
                    parsedUrl = new URL(urlLoc);
                }
                catch (e) {
                    parsedUrl = new URL(`${params.host}${urlLoc}`);
                }
                // generating the output path for the current file
                let outPath = `${params.outDir}/${urlLoc === '/' ? 'index' : parsedUrl.pathname}.html`.replace(/\/{2,20}/gm, '/'), cacheOutPath = `${cacheBuildDir}/${urlLoc === '/' ? 'index' : parsedUrl.pathname}.html`.replace(/\/{2,20}/gm, '/');
                // remove the origin from the outPath
                outPath = outPath.replace(parsedUrl.origin, '');
                cacheOutPath = cacheOutPath.replace(parsedUrl.origin, '');
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
                let res, tries = 0, path;
                while ((res === null || res === void 0 ? void 0 : res.status) !== 200 && tries < params.requestRetry) {
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
                        res = yield reqPromise;
                    }
                    else {
                        path = url.pathname;
                        const request = new s_request_1.default({
                            url: `${parsedUrl.toString()}`,
                            timeout: params.requestTimeout,
                        });
                        const response = yield request.send();
                        res = response;
                    }
                }
                let isErrors = res.status !== 200;
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
                    let dataToWrite = res.data;
                    if (typeof dataToWrite === 'object') {
                        dataToWrite = JSON.stringify(dataToWrite, null, 4);
                        cacheOutPath = cacheOutPath.replace(/\.html$/, '.json');
                        outPath = outPath.replace(/\.html$/, '.json');
                    }
                    (0, fs_1.__writeFileSync)(cacheOutPath, dataToWrite);
                    (0, fs_1.__writeFileSync)(outPath, dataToWrite);
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