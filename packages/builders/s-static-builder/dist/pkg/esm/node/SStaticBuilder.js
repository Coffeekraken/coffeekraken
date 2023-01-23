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
import __SRequest from '@coffeekraken/s-request';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __formatDuration, __wait } from '@coffeekraken/sugar/datetime';
import { __copySync, __readJsonSync, __removeSync, __writeFileSync, __writeJsonSync, } from '@coffeekraken/sugar/fs';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __packageCacheDir, __packageRootDir } from '@coffeekraken/sugar/path';
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
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            console.log(`<yellow>[build]</yellow> Start building your static website`);
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
            console.log(`<yellow>[build]</yellow> Starting Static Build`);
            console.log(`<yellow>○</yellow> Environment : ${params.prod
                ? '<green>production</green>'
                : '<yellow>development</yellow>'}`);
            console.log(`<yellow>○</yellow> Host : <cyan>${params.host}</cyan>`);
            // handle params
            if (params.clean) {
                console.log(`<yellow>[build]</yellow> Cleaning the static builder internal cache (incremental, etc...)`);
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
            if (params.incremental && __fs.existsSync(incrementalCachePath)) {
                incrementalCache = __readJsonSync(incrementalCachePath);
            }
            // ensure input file exists
            if (!__fs.existsSync(params.input)) {
                throw new Error(`Sorry but the specified input file "<cyan>${params.input}</cyan>" does not exists...`);
            }
            // reading the file
            const xmlStr = __fs.readFileSync(params.input, 'utf8').toString();
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
            let leftDuration = 0, currentDuration = 0;
            let logsCount = 0;
            if (params.fromErrors) {
                console.log(`<yellow>[build]</yellow> Scraping pages using the <cyan>${__path.relative(__packageRootDir(), errorFilePath)}</cyan>...`);
            }
            else {
                console.log(`<yellow>[build]</yellow> Scraping pages using the <cyan>${__path.relative(__packageRootDir(), params.input)}</cyan>...`);
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
                    clear: __SLog.isTypeEnabled(__SLog.TYPE_VERBOSE)
                        ? false
                        : logsCount,
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[build]</yellow> Reaching the url "<cyan>${urlLoc}</cyan>"...`,
                });
                logsCount = 0;
                console.log({
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[build]</yellow> <magenta>${xml.urlset.url.length - i}</magenta> url(s), <cyan>~${__formatDuration(leftDuration)}</cyan> remaining`,
                });
                logsCount++;
                if (genDuration) {
                    console.log({
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
                            console.log(`<yellow>[build]</yellow> Incremental build for url <cyan>${urlLoc}</cyan>`);
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
                while (typeof res !== 'string' && tries < params.requestRetry) {
                    if (res && res.status === 404) {
                        break;
                    }
                    if (tries > 0) {
                        console.log(`<yellow>[build]</yellow> Retry the url <cyan>${urlLoc}</cyan> for the <magenta>${tries}</magenta> time${tries > 1 ? 's' : ''}...`);
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
                    console.log(`<red>[error]</red> Something goes wrong while rendering the "<cyan>${urlLoc}</cyan>" url. Check out the "<magenta>${urlLoc === '/' ? 'index' : urlLoc}.json</magenta>" file for more infos...`);
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
                console.log(`<yellow>[build]</yellow> Copying assets:`);
                for (let i = 0; i < Object.keys(params.assets).length; i++) {
                    const assetObj = params.assets[Object.keys(params.assets)[i]];
                    console.log(`<yellow>[build]</yellow> - <cyan>${__path.relative(__packageRootDir(), assetObj.from)}${assetObj.glob ? `/${assetObj.glob}` : ''}</cyan> to <magenta>${__path.relative(__packageRootDir(), assetObj.to)}</magenta>`);
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
                        console.log(`<yellow>[assets]</yellow> Getting asset "<yellow>${__path.relative(__packageRootDir(), assetObj.from)}</yellow>" to "<cyan>${__path.relative(__packageRootDir(), assetObj.to)}</cyan>"`);
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
        }));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBRW5ELE9BQU8saUJBQWlCLE1BQU0saUNBQWlDLENBQUM7QUFDaEUsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFDM0MsT0FBTyxNQUFNLE1BQU0scUJBQXFCLENBQUM7QUFDekMsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3hFLE9BQU8sRUFDSCxVQUFVLEVBQ1YsY0FBYyxFQUNkLFlBQVksRUFDWixlQUFlLEVBQ2YsZUFBZSxHQUNsQixNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMvRSxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQXlFNUMsTUFBTSxDQUFDLE9BQU8sT0FBTyxjQUFlLFNBQVEsVUFBVTtJQUNsRDs7Ozs7Ozs7T0FRRztJQUNILFlBQVksUUFBMkM7UUFDbkQsS0FBSyxDQUNELFdBQVcsbUJBRUEsY0FBYyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsR0FFMUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7O09B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