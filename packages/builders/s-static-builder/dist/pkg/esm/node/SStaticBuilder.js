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
                let res, tries = 0, path;
                while ((res === null || res === void 0 ? void 0 : res.status) !== 200 && tries < params.requestRetry) {
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
                        res = yield reqPromise;
                    }
                    else {
                        path = url.pathname;
                        const request = new __SRequest({
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
                    let dataToWrite = res.data;
                    if (typeof dataToWrite === 'object') {
                        dataToWrite = JSON.stringify(dataToWrite, null, 4);
                        cacheOutPath = cacheOutPath.replace(/\.html$/, '.json');
                        outPath = outPath.replace(/\.html$/, '.json');
                    }
                    __writeFileSync(cacheOutPath, dataToWrite);
                    __writeFileSync(outPath, dataToWrite);
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
                    console.log(`<yellow>[build]</yellow> Copying assets from "<cyan>${__path.relative(__packageRootDir(), assetObj.from)}${assetObj.glob ? `/${assetObj.glob}` : ''}</cyan>" to "<magenta>${__path.relative(__packageRootDir(), assetObj.to)}</magenta>"`);
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
                        __writeFileSync(assetObj.to, data);
                    }
                }
            }
            resolve();
        }));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBRW5ELE9BQU8saUJBQWlCLE1BQU0saUNBQWlDLENBQUM7QUFDaEUsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFDM0MsT0FBTyxNQUFNLE1BQU0scUJBQXFCLENBQUM7QUFDekMsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3hFLE9BQU8sRUFDSCxVQUFVLEVBQ1YsY0FBYyxFQUNkLFlBQVksRUFDWixlQUFlLEVBQ2YsZUFBZSxHQUNsQixNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMvRSxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQTBFNUMsTUFBTSxDQUFDLE9BQU8sT0FBTyxjQUFlLFNBQVEsVUFBVTtJQUNsRDs7Ozs7Ozs7T0FRRztJQUNILFlBQVksUUFBMkM7UUFDbkQsS0FBSyxDQUNELFdBQVcsbUJBRUEsY0FBYyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsR0FFMUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7O09B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