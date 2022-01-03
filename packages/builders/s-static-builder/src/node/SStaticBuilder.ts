import __SBuilder, { ISBuilderCtorSettings } from '@coffeekraken/s-builder';
import __SFile from '@coffeekraken/s-file';
import __SPromise from '@coffeekraken/s-promise';
import __SRequest from '@coffeekraken/s-request';
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
    to: string;
}

export interface ISStaticBuilderBuildParams {
    input: string;
    outDir: string;
    host: string;
    clean: boolean;
    incremental: boolean;
    assets: ISStaticBuilderAssets;
    failAfter: number;
    requestTimeout: number;
    minify: boolean;
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get staticBuilderSettings(): ISStaticBuilderSettings {
        return (<any>this)._settings.staticBuilder;
    }

    /**
     * @name            constructor
     * @type            Function
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _build(params: ISStaticBuilderBuildParams): Promise<ISStaticBuilderResult> {
        return new __SPromise(
            async ({ resolve, reject, emit }) => {
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[build]</yellow> Start building your static website`,
                });

                // create the temp build directory
                const cacheBuildDir = `${__packageCacheDir()}/s-static-builder/build`;

                // init incremental cache
                let incrementalCache = {};
                const incrementalCachePath = __path.resolve(
                    __packageCacheDir(),
                    's-static-builder/incremental-cache.json',
                );

                // handle params
                if (params.clean) {
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>[build]</yellow> Cleaning the static builder internal cache (incremental, etc...))`,
                    });

                    // remove the cache build dir
                    __removeSync(cacheBuildDir);

                    // delete the integrity cache
                    __removeSync(incrementalCache);
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

                let failsCount = 0,
                    failedUrls: string[] = [],
                    currentDuration = 0;

                // loop on each urls to get his content
                for (let i = 0; i < xml.urlset.url.length; i++) {
                    const url = xml.urlset.url[i],
                        urlIntegrity = url.integrity?.[0],
                        urlLoc = url.loc?.[0],
                        urlLastMod = url.lastmod?.[0];

                    // generating the output path for the current file
                    const outPath = `${params.outDir}/${
                            urlLoc === '/' ? 'index' : urlLoc
                        }.html`.replace(/\/{2,20}/gm, '/'),
                        cacheOutPath = `${cacheBuildDir}/${
                            urlLoc === '/' ? 'index' : urlLoc
                        }.html`.replace(/\/{2,20}/gm, '/');

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

                                __copySync(cacheOutPath, outPath);
                                // continue with next url
                                continue;
                            }
                        }
                    }

                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>[build]</yellow> Reaching the url "<cyan>${urlLoc}</cyan>"...`,
                    });

                    const start = Date.now();

                    const request = new __SRequest({
                        url: `${params.host}${urlLoc}`,
                        timeout: params.requestTimeout,
                    });
                    const res = await request.send().catch((e) => {
                        emit('log', {
                            type: __SLog.TYPE_INFO,
                            value: `<red>[error]</red> The url "<cyan>${urlLoc}</cyan>" cannot be reached...`,
                        });
                        failsCount++;
                        failedUrls.push(urlLoc);

                        __writeFileSync(
                            `${__packageRoot()}/SStaticBuilderFailedUrls.txt`,
                            failedUrls.join('\n'),
                        );

                        if (
                            params.failAfter !== -1 &&
                            failsCount >= params.failAfter
                        ) {
                            throw new Error(
                                `<red>[error]</red> The static builder has reached the available issues which is set using the "<yellow>failAfter</yellow>" param that is set to <magenta>${params.failAfter}</magenta>`,
                            );
                        }
                    });

                    const end = Date.now();

                    currentDuration += end - start;
                    const average = currentDuration / i;

                    // @ts-ignore
                    if (res?.data) {
                        // saving file
                        emit('log', {
                            type: __SLog.TYPE_INFO,
                            value: `<green>[build]</green> Saving the page from url "<cyan>${urlLoc}</cyan>"...`,
                        });
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

                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>[build]</yellow> <magenta>${
                            xml.urlset.url.length - i
                        }</magenta> url(s), <cyan>~${__formatDuration(
                            average * (xml.urlset.url.length - i),
                        )}</cyan> remaining`,
                    });

                    // if (i >= 1) break;
                }

                // remove output directory
                // __removeSync(params.outDir);
                // copy the tmp build directory to the output directory
                // __copySync(tmpBuildDir, params.outDir);

                // assets
                if (params.assets) {
                    for (
                        let i = 0;
                        i < Object.keys(params.assets).length;
                        i++
                    ) {
                        const assetObj =
                            params.assets[Object.keys(params.assets)[i]];

                        // filesystem
                        if (assetObj.from.match(/^\//)) {
                            const to = `${assetObj.to}/${
                                assetObj.from.split('/').slice(-1)[0]
                            }`;
                            if (!__fs.existsSync(assetObj.from)) {
                                emit('log', {
                                    type: __SLog.TYPE_INFO,
                                    value: `<yellow>[assets]</yellow> No "<yellow>${__path.relative(
                                        __packageRoot(),
                                        assetObj.from,
                                    )}</yellow>" file to copy...`,
                                });
                            } else {
                                emit('log', {
                                    type: __SLog.TYPE_INFO,
                                    value: `<yellow>[assets]</yellow> Copying asset "<yellow>${__path.relative(
                                        __packageRoot(),
                                        assetObj.from,
                                    )}</yellow>" to "<cyan>${__path.relative(
                                        __packageRoot(),
                                        assetObj.to,
                                    )}</cyan>"`,
                                });
                                await __copy(assetObj.from, to);
                            }
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
