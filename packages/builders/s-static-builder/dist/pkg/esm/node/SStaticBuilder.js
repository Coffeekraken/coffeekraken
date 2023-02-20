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
import { __copySync, __readJsonSync, __removeSync, __writeFileSync, __writeJsonSync } from '@coffeekraken/sugar/fs';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBRW5ELE9BQU8saUJBQWlCLE1BQU0saUNBQWlDLENBQUM7QUFDaEUsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFDM0MsT0FBTyxNQUFNLE1BQU0scUJBQXFCLENBQUM7QUFDekMsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3hFLE9BQU8sRUFDSCxVQUFVLEVBQ1YsY0FBYyxFQUNkLFlBQVksRUFDWixlQUFlLEVBQ2YsZUFBZSxFQUNsQixNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMvRSxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQXlFNUMsTUFBTSxDQUFDLE9BQU8sT0FBTyxjQUFlLFNBQVEsVUFBVTtJQUNsRDs7Ozs7Ozs7T0FRRztJQUNILFlBQVksUUFBMkM7UUFDbkQsS0FBSyxDQUNELFdBQVcsbUJBRUEsY0FBYyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsR0FFMUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7O09B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