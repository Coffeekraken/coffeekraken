import type { ISBuilderSettings } from '@coffeekraken/s-builder';
import __SBuilder from '@coffeekraken/s-builder';
import __SDuration from '@coffeekraken/s-duration';
import __SFile from '@coffeekraken/s-file';
import __SFrontendServer from '@coffeekraken/s-frontend-server';
import __SGlob from '@coffeekraken/s-glob';
import __SLog from '@coffeekraken/s-log';
import __SRequest from '@coffeekraken/s-request';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __formatDuration, __wait } from '@coffeekraken/sugar/datetime';
import {
    __copySync,
    __readJsonSync,
    __removeSync,
    __writeFileSync,
    __writeJsonSync,
} from '@coffeekraken/sugar/fs';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __packageCacheDir, __packageRootDir } from '@coffeekraken/sugar/path';
import __fs from 'fs';
import __path from 'path';
import { parseStringPromise } from 'xml2js';

/**
 * @name                SStaticBuilder
 * @namespace           node
 * @type                Class
 * @extends             SBuilder
 * @platform            node
 * @status              beta
 * @private
 *
 * This class represent the postcss builder that you can use to build your postcss files
 * with a simple and efficient API.
 *
 * @feature            Support Sugar postcss plugin out of the box
 * @feature            Support all postcss configurations
 * @feature            Allow minification of output
 * @feature            Threeshaking capabilities to compact your bundles as low as possible using PurgeCSS.
 * @feature            Support sugar "pleasant" css syntax in your views
 *
 * @param           {ISStaticBuilderSettings}          [settings={}]           Some settings to configure your builder instance
 *
 * @example         js
 * import SStaticBuilder from '@coffeekraken/s-static-builder';
 * const builder = new SStaticBuilder({
 *      staticBuilder: {
 *          // settings here...
 *      }
 * });
 * await builder.build({
 *      input: 'sitemap.xml',
 *      outDir: 'my/cool/folder'
 * });
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISStaticBuilderSettings extends ISBuilderSettings {}

export interface ISStaticBuilderResult {
    input?: __SFile;
    outDir?: __SFile;
    css: string;
    map: null;
}

export interface ISStaticBuilderAssets {
    [key: string]: ISStaticBuilderAsset;
}

export interface ISStaticBuilderAsset {
    from: string;
    glob: string;
    to: string;
}

export interface ISStaticBuilderBuildParams {
    input: string;
    outDir: string;
    host: string;
    fromErrors: boolean;
    useFrontendServer: boolean;
    clean: boolean;
    incremental: boolean;
    assets: ISStaticBuilderAssets;
    failAfter: number;
    requestTimeout: number;
    requestRetry: number;
    requestRetryTimeout: number;
    minify: boolean;
    target: 'production' | 'development';
}

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
    constructor(settings?: Partial<ISStaticBuilderSettings>) {
        super(
            __deepMerge(
                {
                    ...__SSugarConfig.get('staticBuilder'),
                },
                settings ?? {},
            ),
        );
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
    _build(
        params: ISStaticBuilderBuildParams,
    ): Promise<ISStaticBuilderResult | void> {
        return new Promise(async (resolve) => {
            console.log(
                `<yellow>[build]</yellow> Start building your static website`,
            );

            // create the temp build directory
            const cacheBuildDir = `${__packageCacheDir()}/s-static-builder/build`;

            const errorFilePath = `${params.outDir}/errors.json`;

            let errors: any[] = [];
            if (__fs.existsSync(errorFilePath)) {
                errors = __readJsonSync(errorFilePath);
            }

            // init incremental cache
            let incrementalCache = {};
            const incrementalCachePath = __path.resolve(
                __packageCacheDir(),
                's-static-builder/incremental-cache.json',
            );

            // make use of frontend server
            let frontendServer;
            if (params.useFrontendServer) {
                frontendServer = new __SFrontendServer();
                await pipe(
                    frontendServer.start({
                        listen: false,
                    }),
                );
            }

            console.log(`<yellow>[build]</yellow> Starting Static Build`);
            console.log(
                `<yellow>○</yellow> Target : ${
                    params.target === 'production'
                        ? '<green>production</green>'
                        : '<yellow>development</yellow>'
                }`,
            );
            console.log(
                `<yellow>○</yellow> Host   : <cyan>${params.host}</cyan>`,
            );
            console.log(
                `<yellow>○</yellow> Input  : <cyan>${params.input}</cyan>`,
            );

            // handle params
            if (params.clean) {
                console.log(
                    `<yellow>[build]</yellow> Cleaning the static builder internal cache (incremental, etc...)`,
                );

                // reset errors
                errors = [];

                try {
                    // remove the existing static directory
                    __removeSync(params.outDir);
                    // remove the cache build dir
                    __removeSync(cacheBuildDir);
                    // delete the integrity cache
                    __removeSync(incrementalCache);
                } catch (e) {}
            }

            // read the "incremental" cache
            if (params.incremental && __fs.existsSync(incrementalCachePath)) {
                incrementalCache = __readJsonSync(incrementalCachePath);
            }

            // ensure input file exists
            if (!__fs.existsSync(params.input)) {
                throw new Error(
                    `Sorry but the specified input file "<cyan>${params.input}</cyan>" does not exists...`,
                );
            }

            // reading the file
            const xmlStr = __fs.readFileSync(params.input, 'utf8').toString();

            // parsing xml
            let xml = await parseStringPromise(xmlStr);

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

            let leftDuration = 0,
                currentDuration = 0;

            let logsCount = 0;

            if (params.fromErrors) {
                console.log(
                    `<yellow>[build]</yellow> Scraping pages using the <cyan>${__path.relative(
                        __packageRootDir(),
                        errorFilePath,
                    )}</cyan>...`,
                );
            } else {
                console.log(
                    `<yellow>[build]</yellow> Scraping pages using the <cyan>${__path.relative(
                        __packageRootDir(),
                        params.input,
                    )}</cyan>...`,
                );
            }

            let genDuration;

            // loop on each urls to get his content
            for (let i = 0; i < xml.urlset.url.length; i++) {
                const url = xml.urlset.url[i],
                    urlIntegrity = Array.isArray(url.integrity)
                        ? url.integrity[0]
                        : url.integrity,
                    urlLoc = Array.isArray(url.loc) ? url.loc[0] : url.loc,
                    urlLastMod = Array.isArray(url.lastmod)
                        ? url.lastmod[0]
                        : url.lastmod;

                // generating the output path for the current file
                let outPath = `${params.outDir}/${
                        urlLoc === '/' ? 'index' : urlLoc
                    }.html`.replace(/\/{2,20}/gm, '/'),
                    cacheOutPath = `${cacheBuildDir}/${
                        urlLoc === '/' ? 'index' : urlLoc
                    }.html`.replace(/\/{2,20}/gm, '/');

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
                    value: `<yellow>[build]</yellow> <magenta>${
                        xml.urlset.url.length - i
                    }</magenta> url(s), <cyan>~${__formatDuration(
                        leftDuration,
                    )}</cyan> remaining`,
                });
                logsCount++;

                if (genDuration) {
                    console.log({
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>[build]</yellow> Last page generated in <yellow>${
                            genDuration.end().formatedDuration
                        }</yellow>`,
                    });
                    logsCount++;
                }

                // incremental build
                if (params.incremental) {
                    if (
                        urlIntegrity &&
                        incrementalCache[urlLoc] == urlIntegrity
                    ) {
                        if (__fs.existsSync(cacheOutPath)) {
                            console.log(
                                `<yellow>[build]</yellow> Incremental build for url <cyan>${urlLoc}</cyan>`,
                            );
                            logsCount++;

                            __copySync(cacheOutPath, outPath);
                            // continue with next url
                            continue;
                        }
                    }
                }

                const start = Date.now();

                genDuration = new __SDuration();

                let res,
                    tries = 0;

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
                    } catch (e) {
                        return res.data;
                    }
                }

                while (typeof res !== 'string' && tries < params.requestRetry) {
                    if (res && res.status === 404) {
                        break;
                    }
                    if (tries > 0) {
                        console.log(
                            `<yellow>[build]</yellow> Retry the url <cyan>${urlLoc}</cyan> for the <magenta>${tries}</magenta> time${
                                tries > 1 ? 's' : ''
                            }...`,
                        );
                        logsCount++;
                        await __wait(params.requestRetryTimeout);
                    }
                    tries++;

                    if (params.useFrontendServer) {
                        const reqPromise = frontendServer.request(urlLoc, {});
                        res = castResponse(await reqPromise);
                    } else {
                        const request = new __SRequest({
                            url: `${params.host}${urlLoc}`,
                            timeout: params.requestTimeout,
                        });
                        res = castResponse(await request.send());
                    }
                }

                let isErrors = typeof res !== 'string';
                if (isErrors) {
                    if (!errors.includes(urlLoc)) {
                        errors.push(urlLoc);
                    }

                    outPath = outPath.replace(/\.html$/, '.json');

                    console.log(
                        `<red>[error]</red> Something goes wrong while rendering the "<cyan>${urlLoc}</cyan>" url. Check out the "<magenta>${
                            urlLoc === '/' ? 'index' : urlLoc
                        }.json</magenta>" file for more infos...`,
                    );
                    logsCount++;

                    __writeJsonSync(outPath, res);
                    __writeJsonSync(errorFilePath, errors);
                } else {
                    // remove the item from the list if rendered correctly
                    errors = errors.filter((e) => e !== urlLoc);
                    try {
                        __fs.unlinkSync(outPath.replace(/\.html$/, '.json'));
                    } catch (e) {}
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
                    const assetObj =
                        params.assets[Object.keys(params.assets)[i]];

                    console.log(
                        `<yellow>[build]</yellow> Copying assets from "<cyan>${__path.relative(
                            __packageRootDir(),
                            assetObj.from,
                        )}${
                            assetObj.glob ? `/${assetObj.glob}` : ''
                        }</cyan>" to "<magenta>${__path.relative(
                            __packageRootDir(),
                            assetObj.to,
                        )}</magenta>"`,
                    );

                    // filesystem
                    if (assetObj.from.match(/^\//)) {
                        // copy files
                        __SGlob.copySync(assetObj.glob ?? '', assetObj.to, {
                            cwd: assetObj.from,
                        });
                        // url
                    } else if (assetObj.from.match(/^https?:\/\//)) {
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
                        const res = await req.send().catch((error) => {
                            throw new Error(
                                `<red>[error]</red> The requested asset "<yellow>${assetObj.from}</yellow>" is not reachable...`,
                            );
                        });
                        // @ts-ignore
                        let data = res.data;
                        try {
                            data = JSON.stringify(data);
                        } catch (e) {}
                        __writeFileSync(assetObj.to, data);
                    }
                }
            }

            resolve();
        });
    }
}
