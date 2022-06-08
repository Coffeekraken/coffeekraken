import type { ISBuilderCtorSettings } from '@coffeekraken/s-builder';
import __SBuilder from '@coffeekraken/s-builder';
import __SFile from '@coffeekraken/s-file';
import __SPromise from '@coffeekraken/s-promise';
import __SRequest from '@coffeekraken/s-request';
import __SGlob from '@coffeekraken/s-glob';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __remove from '@coffeekraken/sugar/node/fs/remove';
import __writeFileSync from '@coffeekraken/sugar/node/fs/writeFileSync';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __packageTmpDir from '@coffeekraken/sugar/node/path/packageTmpDir';
import __systemTmpDir from '@coffeekraken/sugar/node/path/systemTmpDir';
import __packageCacheDir from '@coffeekraken/sugar/node/path/packageCacheDir';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __fs from 'fs';
import __SLog from '@coffeekraken/s-log';
import __path from 'path';
import __readJsonSync from '@coffeekraken/sugar/node/fs/readJsonSync';
import { parseStringPromise } from 'xml2js';
import __writeJsonSync from '@coffeekraken/sugar/node/fs/writeJsonSync';
import __copy from '@coffeekraken/sugar/node/fs/copy';
import __formatDuration from '@coffeekraken/sugar/shared/time/formatDuration';
import __removeSync from '@coffeekraken/sugar/node/fs/removeSync';
import __copySync from '@coffeekraken/sugar/node/fs/copySync';
import __wait from '@coffeekraken/sugar/shared/time/wait';
import __SFrontendServer from '@coffeekraken/s-frontend-server';
import __SDuration from '@coffeekraken/s-duration';

/**
 * @name                SStaticBuilder
 * @namespace           node
 * @type                Class
 * @extends             SBuilder
 * @platform            node
 * @status              beta
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
 * @param           {ISStaticBuilderCtorSettings}          [settings={}]           Some settings to configure your builder instance
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

export interface ISStaticBuilderSettings {}

export interface ISStaticBuilderCtorSettings extends ISBuilderCtorSettings {
    staticBuilder: Partial<ISStaticBuilderSettings>;
}

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
    prod: boolean;
}

export default class SStaticBuilder extends __SBuilder {
    /**
     * @name            staticBuilderSettings
     * @type            ISStaticBuilderSettings
     * @get
     *
     * Access the postcss builder settings
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get staticBuilderSettings(): ISStaticBuilderSettings {
        return (<any>this).settings.staticBuilder;
    }

    /**
     * @name            constructor
     * @type            Function
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings?: Partial<ISStaticBuilderCtorSettings>) {
        super(
            __deepMerge(
                {
                    staticBuilder: {
                        ...__SSugarConfig.get('staticBuilder'),
                    },
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
    _build(params: ISStaticBuilderBuildParams): Promise<ISStaticBuilderResult> {
        return new __SPromise(
            async ({ resolve, reject, pipe, emit }) => {
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[build]</yellow> Start building your static website`,
                });

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

                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[build]</yellow> Starting Static Build`,
                });
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>○</yellow> Environment : ${
                        params.prod
                            ? '<green>production</green>'
                            : '<yellow>development</yellow>'
                    }`,
                });
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>○</yellow> Host : <cyan>${params.host}</cyan>`,
                });

                let byItemAverage = 0;

                // handle params
                if (params.clean) {
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>[build]</yellow> Cleaning the static builder internal cache (incremental, etc...))`,
                    });

                    try {
                        // failed url file
                        __removeSync(
                            `${__packageRoot()}/SStaticBuilderFailedUrls.txt`,
                        );
                        // remove the existing static directory
                        __removeSync(params.outDir);
                        // remove the cache build dir
                        __removeSync(cacheBuildDir);
                        // delete the integrity cache
                        __removeSync(incrementalCache);
                    } catch (e) {}
                }

                // read the "incremental" cache
                if (
                    params.incremental &&
                    __fs.existsSync(incrementalCachePath)
                ) {
                    incrementalCache = __readJsonSync(incrementalCachePath);
                }

                // ensure input file exists
                if (!__fs.existsSync(params.input)) {
                    throw new Error(
                        `Sorry but the specified input file "<cyan>${params.input}</cyan>" does not exists...`,
                    );
                }

                // reading the file
                const xmlStr = __fs
                    .readFileSync(params.input, 'utf8')
                    .toString();

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

                // xml = {
                //     urlset: {
                //         url: [
                //             {
                //                 loc:
                //                     '/api/@coffeekraken.sugar.js.feature.smoothScroll',
                //             },
                //         ],
                //     },
                // };

                let failsCount = 0,
                    failedUrls: string[] = [],
                    leftDuration = 0,
                    currentDuration = 0;

                let logsCount = 0;

                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[build]</yellow> Scraping pages using the sitemap.xml...`,
                });

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

                    emit('log', {
                        clear: __SLog.isTypeEnabled(__SLog.TYPE_VERBOSE)
                            ? false
                            : logsCount,
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>[build]</yellow> Reaching the url "<cyan>${urlLoc}</cyan>"...`,
                    });
                    logsCount = 1;

                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>[build]</yellow> <magenta>${
                            xml.urlset.url.length - i
                        }</magenta> url(s), <cyan>~${__formatDuration(
                            leftDuration,
                        )}</cyan> remaining`,
                    });
                    logsCount++;

                    if (genDuration) {
                        emit('log', {
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
                                emit('log', {
                                    type: __SLog.TYPE_INFO,
                                    value: `<yellow>[build]</yellow> Incremental build for url <cyan>${urlLoc}</cyan>`,
                                });
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

                    while (!res && tries < params.requestRetry) {
                        if (tries > 0) {
                            await __wait(params.requestRetryTimeout);
                        }

                        if (params.useFrontendServer) {
                            const reqPromise = frontendServer.request(
                                urlLoc,
                                {},
                            );
                            res = await reqPromise;
                        } else {
                            const request = new __SRequest({
                                url: `${params.host}${urlLoc}`,
                                timeout: params.requestTimeout,
                            });

                            res = await request.send();

                            // .catch((e) => {
                            //     emit('log', {
                            //         // clear: __SLog.isTypeEnabled(__SLog.TYPE_VERBOSE) ? false : logsCount,
                            //         type: __SLog.TYPE_INFO,
                            //         value: `<red>[error]</red> The url "<cyan>${urlLoc}</cyan>" cannot be reached...`,
                            //     });
                            //     logsCount++;
                            //     tries++;

                            //     // if (tries >= params.requestRetry) {
                            //     //     logsCount = 0;
                            //     //     failsCount++;
                            //     //     failedUrls.push(urlLoc);

                            //     //     __writeFileSync(
                            //     //         `${__packageRoot()}/SStaticBuilderFailedUrls.txt`,
                            //     //         failedUrls.join('\n'),
                            //     //     );

                            //     //     if (
                            //     //         params.failAfter !== -1 &&
                            //     //         failsCount >= params.failAfter
                            //     //     ) {
                            //     //         throw new Error(
                            //     //             `<red>[error]</red> The static builder has reached the available issues which is set using the "<yellow>failAfter</yellow>" param that is set to <magenta>${params.failAfter}</magenta>`,
                            //     //         );
                            //     //     }
                            //     // }
                            // });
                        }
                    }

                    try {
                        const json = JSON.parse(res.data);
                        outPath = outPath.replace(/\.html$/, '.json');
                        if (!errors.includes(urlLoc)) {
                            errors.push(urlLoc);
                        }

                        emit('log', {
                            type: __SLog.TYPE_ERROR,
                            value: `<red>[error]</red> Something goes wrong while rendering the "<cyan>${urlLoc}</cyan>" url. Check out the "<magenta>${
                                urlLoc === '/' ? 'index' : urlLoc
                            }.json</magenta>" file for more infos...`,
                        });
                        logsCount++;

                        __writeJsonSync(errorFilePath, errors);
                    } catch (e) {
                        // remove the item from the list if rendered correctly
                        if (params.fromErrors) {
                            errors = errors.filter((e) => e !== urlLoc);
                            __writeJsonSync(errorFilePath, errors);
                        }
                    }

                    const end = Date.now();

                    currentDuration += end - start;
                    leftDuration =
                        (end - start) * (xml.urlset.url.length - i) -
                        currentDuration;

                    // @ts-ignore
                    if (res?.data) {
                        // saving file
                        // emit('log', {
                        //     type: __SLog.TYPE_INFO,
                        //     value: `<green>[build]</green> Saving the page from url "<cyan>${urlLoc}</cyan>"...`,
                        // });
                        // logsCount++;
                        // @ts-ignore

                        __writeFileSync(cacheOutPath, res.data);
                        __writeFileSync(outPath, res.data);

                        // saving the integrity
                        if (urlIntegrity) {
                            incrementalCache[urlLoc] = urlIntegrity;
                            __writeJsonSync(
                                incrementalCachePath,
                                incrementalCache,
                            );
                        }
                    }
                }

                // assets
                if (params.assets) {
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>[build]</yellow> Copying assets:`,
                    });
                    for (
                        let i = 0;
                        i < Object.keys(params.assets).length;
                        i++
                    ) {
                        const assetObj =
                            params.assets[Object.keys(params.assets)[i]];

                        emit('log', {
                            type: __SLog.TYPE_INFO,
                            value: `<yellow>[build]</yellow> - <cyan>${__path.relative(
                                __packageRoot(),
                                assetObj.from,
                            )}${
                                assetObj.glob ? `/${assetObj.glob}` : ''
                            }</cyan> to <magenta>${__path.relative(
                                __packageRoot(),
                                assetObj.to,
                            )}</magenta>`,
                        });

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
                            emit('log', {
                                type: __SLog.TYPE_INFO,
                                value: `<yellow>[assets]</yellow> Getting asset "<yellow>${__path.relative(
                                    __packageRoot(),
                                    assetObj.from,
                                )}</yellow>" to "<cyan>${__path.relative(
                                    __packageRoot(),
                                    assetObj.to,
                                )}</cyan>"`,
                            });
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
            },
            {
                metas: {
                    id: this.constructor.name,
                },
            },
        );
    }
}
