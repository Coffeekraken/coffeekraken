import __SBuilder, { ISBuilderCtorSettings } from '@coffeekraken/s-builder';
import __SFile from '@coffeekraken/s-file';
import __SGlob, { IResolveGlobSettings } from '@coffeekraken/s-glob';
import __SPromise from '@coffeekraken/s-promise';
import __ensureDirSync from '@coffeekraken/sugar/node/fs/ensureDirSync';
import __folderPath from '@coffeekraken/sugar/node/fs/folderPath';
import __removeSync from '@coffeekraken/sugar/node/fs/removeSync';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __imageSize from 'image-size';
import __minimatch from 'minimatch';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __path from 'path';
import __SDuration from '@coffeekraken/s-duration';
import __fs from 'fs';
import __sharp from 'sharp';
import __SLog from '@coffeekraken/s-log';
import __SImagesBuilderBuildParamsInterface from './interface/SImagesBuilderBuildParamsInterface';
import __copySync from '@coffeekraken/sugar/node/fs/copySync';

/**
 * @name            SImagesBuilder
 * @namespace       node
 * @type            Class
 * @interface       ./interface/SImagesBuilderBuildParamsInterface
 * @extends         SBuilder
 * @platform        node
 * @status          beta
 *
 * This class allows you to compress the more popular images formats like
 * "png", "jpg", "svg", "gif", etc... using the WONDERFULL sharp library.
 *
 * @param           {ISImagesBuilderCtorSettings}         [settings={}]           Some settings to configure your image compression process
 *
 * @example         js
 * import SImagesBuilder from '@coffeekraken/s-image-builder';
 * const builder = new SImagesBuilder({
 *      imagesBuilder: {
 *          // some settings...
 *      }
 * });
 * await builder.build('src/** /*.jpg');
 *
 * @see             https://www.npmjs.com/package/sharp
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ISImagesBuilderSettings {
    resolveGlob: Partial<IResolveGlobSettings>;
}

export interface ISImagesBuilderBuildParams {
    glob: string;
    compressExts: string[];
    inDir: string;
    outDir: string;
    quality: number;
    webp: boolean;
    width: number;
    height: number;
    resolution: number[];
    clear: boolean;
    specificParams: Record<string, ISImagesBuilderBuildParams>;
}

export interface ISImagesBuilderCtorSettings extends ISBuilderCtorSettings {
    imagesBuilder: Partial<ISImagesBuilderSettings>;
}

export interface ISImagesBuilderImageResult {
    source: __SFile;
    builded: __SFile[];
    webp: __SFile[];
}

export interface ISImagesBuilderResultItem extends ISImagesBuilderStats {
    fromSourceGain?: ISImagesBuilderStats;
    fromBuildedGain?: ISImagesBuilderStats;
}

export interface ISImagesBuilderStats {
    percentage?: number;
    bytes: number | string;
    kbytes: number | string;
    mbytes: number | string;
    gbytes: number | string;
}

export interface ISImagesBuilderResult {
    source: ISImagesBuilderResultItem;
    builded: ISImagesBuilderResultItem;
    webp: ISImagesBuilderResultItem;
    files: Record<string, ISImagesBuilderImageResult>;
}

export default class SImagesBuilder extends __SBuilder {
    /**
     * @name            imagesBuilderSettings
     * @type            ISImagesBuilderSettings
     * @get
     *
     * Access the images compressor settings
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get imagesBuilderSettings(): ISImagesBuilderSettings {
        return (<any>this._settings).imagesBuilder;
    }

    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings?: Partial<ISImagesBuilderCtorSettings>) {
        super(
            __deepMerge(
                {
                    imagesBuilder: {},
                },
                settings ?? {},
            ),
        );
    }

    /**
     * @name            _build
     * @type            Function
     * @private
     * @async
     *
     * This method allows you to compress some images by passing one or more globs
     * as parameters and if needed some ISImagesBuilderSettings settings to override
     * these passed in the constructor
     *
     * @param       {ISImagesBuilderBuildParams}              params            The parameters to build the images correctly. These parameters are passed by the SBuilder class
     * @param       {Partial<ISImagesBuilderSettings>}       [settings={}]       Some settings to override the ones passed in the constructor if needed
     * @return      {SPromise<ISImagesBuilderResult>}        A promise resolved with the ISImagesBuilderResult object that store all the builded files stats, etc...
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _build(
        params: ISImagesBuilderBuildParams,
        settings?: Partial<ISImagesBuilderSettings>,
    ): Promise<ISImagesBuilderResult> {
        return new __SPromise(
            async ({ resolve, reject, emit }) => {
                const finalSettings = <ISImagesBuilderSettings>__deepMerge(
                    {
                        resolveGlob: {},
                    },
                    this.imagesBuilderSettings,
                    settings ?? {},
                );

                // @ts-ignore
                params = __SImagesBuilderBuildParamsInterface.apply(
                    params ?? {},
                );

                // clear if needed
                if (params.clear) {
                    __removeSync(params.outDir);
                    __ensureDirSync(params.outDir);
                }

                // preparing files stack that store source AND output SFile instances
                const filesStack = {};

                // init stats variables
                const sourceStats = {
                    bytes: 0,
                };
                const buildedStats = {
                    bytes: 0,
                };
                const webpStats = {
                    bytes: 0,
                };

                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[build]</yellow> Starting images Build`,
                });

                function printParams(paramsObj) {
                    if (paramsObj.glob) {
                        emit('log', {
                            type: __SLog.TYPE_INFO,
                            value: `<yellow>○</yellow> Glob        : <yellow>${paramsObj.glob}</yellow>`,
                        });
                    }
                    if (paramsObj.inDir) {
                        emit('log', {
                            type: __SLog.TYPE_INFO,
                            value: `<yellow>○</yellow> Input       : <cyan>${__path.relative(
                                process.cwd(),
                                paramsObj.inDir,
                            )}</cyan>`,
                        });
                    }
                    if (paramsObj.outDir) {
                        emit('log', {
                            type: __SLog.TYPE_INFO,
                            value: `<yellow>○</yellow> Output      : <cyan>${__path.relative(
                                process.cwd(),
                                paramsObj.outDir,
                            )}</cyan>`,
                        });
                    }
                    if (paramsObj.quality) {
                        emit('log', {
                            type: __SLog.TYPE_INFO,
                            value: `<yellow>○</yellow> Quality     : <green>${paramsObj.quality}</green>`,
                        });
                    }
                    if (paramsObj.webp !== undefined) {
                        emit('log', {
                            type: __SLog.TYPE_INFO,
                            value: `<yellow>○</yellow> Webp        : ${
                                paramsObj.webp
                                    ? '<green>true</green>'
                                    : '<red>false</red>'
                            }`,
                        });
                    }
                    if (paramsObj.width || paramsObj.height) {
                        emit('log', {
                            type: __SLog.TYPE_INFO,
                            value: `<yellow>○</yellow> Size        : <yellow>${
                                paramsObj.width ? paramsObj.width : '...'
                            }/${
                                paramsObj.height ? paramsObj.height : '...'
                            }</yellow>`,
                        });
                    }
                    if (paramsObj.resolution) {
                        emit('log', {
                            type: __SLog.TYPE_INFO,
                            value: `<yellow>○</yellow> Resolution${
                                paramsObj.resolution.length > 1 ? 's' : ' '
                            } : ${paramsObj.resolution
                                .map((res) => {
                                    return `<magenta>${res}x</magenta>`;
                                })
                                .join(', ')}`,
                        });
                    }
                }

                printParams(params);

                if (params.specificParams) {
                    Object.keys(params.specificParams).forEach((glob) => {
                        const customParamsObj = params.specificParams[glob];
                        emit('log', {
                            type: __SLog.TYPE_INFO,
                            value: `<cyan>[${glob}]</cyan> Specific params`,
                        });
                        printParams(customParamsObj);
                    });
                }

                // resolving globs
                await __SGlob
                    .resolve(`${params.inDir}/${params.glob}`, {
                        ...(finalSettings.resolveGlob ?? {}),
                        cwd: params.inDir,
                    })
                    .forEach((file) => {
                        sourceStats.bytes += file.stats.bytes;

                        filesStack[file.path] = {
                            source: file,
                            builded: [],
                        };
                    });

                for (let i = 0; i < Object.keys(filesStack).length; i++) {
                    const path = Object.keys(filesStack)[i];

                    let imgParams = Object.assign({}, params);

                    const file = filesStack[path].source;

                    const outPath = `${imgParams.outDir}/${file.relPath}`;

                    // check if is a file to compress
                    if (!params.compressExts.includes(file.extension)) {

                        emit('log', {
                            clear: __SLog.isTypeEnabled(__SLog.TYPE_VERBOSE) ? false : true,
                            type: __SLog.TYPE_INFO,
                            value: `<cyan>[copy]</cyan> Copying file "<cyan>${__path.relative(__packageRoot(), file.path)}</cyan>" under "<magenta>${__path.relative(__packageRoot(), outPath)}</magenta>"`,
                        });

                        const duration = new __SDuration();

                        // track the builded stats
                        buildedStats.bytes += __fs.statSync(file.path).size;
                        webpStats.bytes += __fs.statSync(file.path).size;

                        // copy file
                        __copySync(file.path, outPath);

                        emit('log', {
                            clear: __SLog.isTypeEnabled(__SLog.TYPE_VERBOSE) ? false : true,
                            type: __SLog.TYPE_INFO,
                            value: `<green>[copy]</green> File "<cyan>${__path.relative(__packageRoot(), file.path)}</cyan>" copied <green>successfully</green> under "<magenta>${__path.relative(__packageRoot(), outPath)}</magenta>" in <yellow>${duration.end().formatedDuration}</yellow>`,
                        });

                        // pass to next file
                        continue;

                    } else {

                        if (params.specificParams) {
                            for (
                                let l = 0;
                                l < Object.keys(params.specificParams).length;
                                l++
                            ) {
                                const glob = Object.keys(params.specificParams)[l];
                                const specificParams = params.specificParams[glob];
                                if (__minimatch(file.relPath, glob)) {
                                    imgParams = <ISImagesBuilderBuildParams>(
                                        __deepMerge(params, specificParams)
                                    );
                                    // @ts-ignore
                                    imgParams.specific = true;
                                }
                            }
                        }

                        // remove file
                        __removeSync(outPath);

                        // ensure directory
                        __ensureDirSync(__folderPath(outPath));

                        // shared manipulations
                        const imageSize = __imageSize(file.path);

                        const idealSize = <
                            {
                                width: number;
                                height: number;
                            }
                        >imageSize;

                        if (imgParams.width && idealSize.width > imgParams.width) {
                            const percent =
                                (100 / idealSize.width) * imgParams.width;
                            idealSize.width = imgParams.width;
                            idealSize.height = Math.round(
                                (idealSize.height / 100) * percent,
                            );
                        }
                        if (
                            imgParams.height &&
                            idealSize.height > imgParams.height
                        ) {
                            const percent =
                                (100 / idealSize.height) * imgParams.height;
                            idealSize.height = imgParams.height;
                            idealSize.width = Math.round(
                                (idealSize.width / 100) * percent,
                            );
                        }

                        const imgsArray = [
                            {
                                size: idealSize,
                                resolution: 1,
                                outPath,
                            },
                        ];

                        for (let k = 0; k < imgParams.resolution.length; k++) {
                            const resolution = imgParams.resolution[k];
                            if (resolution === 1) continue;
                            if (file.extension === 'svg') continue;

                            imgsArray.push({
                                size: {
                                    width: idealSize.width * resolution,
                                    height: idealSize.height * resolution,
                                },
                                resolution,
                                outPath: outPath.replace(
                                    /\.([a-zA-Z]+)$/,
                                    `@${resolution}x.$1`,
                                ),
                            });
                        }

                        for (let j = 0; j < imgsArray.length; j++) {
                            const imgObj = imgsArray[j];

                            const outputFn =
                                file.extension === 'jpg' ? 'jpeg' : file.extension;

                            emit('log', {
                                clear: __SLog.isTypeEnabled(__SLog.TYPE_VERBOSE) ? false : true,
                                type: __SLog.TYPE_INFO,
                                // @ts-ignore
                                value: `<yellow>[compress]</yellow> Compressing file "<cyan>${__path.relative(__packageRoot(), file.path)}</cyan>" under "<magenta>${__path.relative(__packageRoot(), imgObj.outPath)}</magenta>" ${imgParams.specific ? ` with <red>specific parameters</red>` : ''}`,
                            });

                            const duration = new __SDuration();

                            const img = __sharp(path);

                            if (!img[outputFn]) {
                                await img
                                    .resize(imgObj.size)
                                    .toFile(imgObj.outPath);
                                continue;
                            }

                            await img
                                .resize(imgObj.size)
                                [outputFn]({
                                    quality: params.quality,
                                })
                                .toFile(imgObj.outPath);
                            const buildedFile = __SFile.new(outPath);
                            buildedStats.bytes += buildedFile.stats.bytes;
                            filesStack[path].builded.push(buildedFile);

                            emit('log', {
                                clear: __SLog.isTypeEnabled(__SLog.TYPE_VERBOSE) ? false : true,
                               type: __SLog.TYPE_INFO,
                                value: `<green>[compress]</green> File "<cyan>${__path.relative(__packageRoot(), file.path)}</cyan>" compressed <green>successfully</green> under "<magenta>${__path.relative(__packageRoot(), imgObj.outPath)}</magenta>" in <yellow>${duration.end().formatedDuration}</yellow>`,
                            });

                            if (params.webp) {

                                const webpDuration = new __SDuration();

                                const webpOutPath = imgObj.outPath.replace(
                                    /\.[a-zA-Z0-9]+/,
                                    '.webp',
                                );

                                emit('log', {
                                    type: __SLog.TYPE_VERBOSER,
                                    value: `<yellow>[webp]</yellow> Generatating webp version of file "<cyan>${__path.relative(__packageRoot(), imgObj.outPath)}</cyan>"`,
                                });

                                await __sharp(path)
                                    .resize(imgObj.size)
                                    .webp({
                                        quality: params.quality,
                                    })
                                    .toFile(webpOutPath);
                                const webpFile = __SFile.new(webpOutPath);
                                webpStats.bytes += webpFile.stats.bytes;
                                filesStack[path].builded.push(webpFile);

                                emit('log', {
                                    type: __SLog.TYPE_VERBOSER,
                                    value: `<green>[webp]</green> Webp generation of file "<cyan>${__path.relative(__packageRoot(), imgObj.outPath)}</cyan>" finished <green>successfully</green> in <yellow>${webpDuration.end().formatedDuration}</yellow>`,
                                });

                            }
                        }
                    }
                }

                const buildedGainedBytes =
                        sourceStats.bytes - buildedStats.bytes,
                    webpFromSourceGainedBytes =
                        sourceStats.bytes - webpStats.bytes,
                    webpFromBuildedGainedBytes =
                        buildedStats.bytes - webpStats.bytes;

                const result: ISImagesBuilderResult = {
                    source: {
                        bytes: sourceStats.bytes.toFixed(2),
                        kbytes: (sourceStats.bytes * 0.001).toFixed(2),
                        mbytes: (sourceStats.bytes * 0.000001).toFixed(2),
                        gbytes: (sourceStats.bytes * 0.00000001).toFixed(2),
                    },
                    builded: {
                        fromSourceGain: {
                            percentage:
                                100 -
                                Math.round(
                                    (100 / sourceStats.bytes) *
                                        buildedStats.bytes,
                                ),
                            bytes: buildedGainedBytes.toFixed(2),
                            kbytes: (buildedGainedBytes * 0.001).toFixed(2),
                            mbytes: (buildedGainedBytes * 0.000001).toFixed(2),
                            gbytes: (buildedGainedBytes * 0.00000001).toFixed(
                                2,
                            ),
                        },
                        bytes: buildedStats.bytes.toFixed(2),
                        kbytes: (buildedStats.bytes * 0.001).toFixed(2),
                        mbytes: (buildedStats.bytes * 0.000001).toFixed(2),
                        gbytes: (buildedStats.bytes * 0.00000001).toFixed(2),
                    },
                    webp: {
                        fromSourceGain: {
                            percentage:
                                100 -
                                Math.round(
                                    (100 / sourceStats.bytes) * webpStats.bytes,
                                ),
                            bytes: webpFromSourceGainedBytes.toFixed(2),
                            kbytes: (webpFromSourceGainedBytes * 0.001).toFixed(
                                2,
                            ),
                            mbytes: (
                                webpFromSourceGainedBytes * 0.000001
                            ).toFixed(2),
                            gbytes: (
                                webpFromSourceGainedBytes * 0.00000001
                            ).toFixed(2),
                        },
                        fromBuildedGain: {
                            percentage:
                                100 -
                                Math.round(
                                    (100 / buildedStats.bytes) *
                                        webpStats.bytes,
                                ),
                            bytes: webpFromBuildedGainedBytes.toFixed(2),
                            kbytes: (
                                webpFromBuildedGainedBytes * 0.001
                            ).toFixed(2),
                            mbytes: (
                                webpFromBuildedGainedBytes * 0.000001
                            ).toFixed(2),
                            gbytes: (
                                webpFromBuildedGainedBytes * 0.00000001
                            ).toFixed(2),
                        },
                        bytes: webpStats.bytes.toFixed(2),
                        kbytes: (webpStats.bytes * 0.001).toFixed(2),
                        mbytes: (webpStats.bytes * 0.000001).toFixed(2),
                        gbytes: (webpStats.bytes * 0.00000001).toFixed(2),
                    },

                    files: filesStack,
                };

                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<green>[success]</green> Images build success!`,
                });
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[source]</yellow>  Sources files : <yellow>${result.source.mbytes}mb</yellow>`,
                });
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    // @ts-ignore
                    value: `<yellow>[builded]</yellow> Builded files : <yellow>${result.builded.mbytes}mb</yellow>`,
                });
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    // @ts-ignore
                    value: `<white>                       </white> : <cyan>-${result.builded.fromSourceGain.percentage}%</cyan> from source`,
                });
                if (params.webp) {
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        // @ts-ignore
                        value: `<yellow>[webp]</yellow>    Webp files    : <yellow>${result.webp.mbytes}mb</yellow>`,
                    });
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        // @ts-ignore
                        value: `<white>                       </white> : <cyan>-${result.webp.fromSourceGain.percentage}%</cyan> from source`,
                    });
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        // @ts-ignore
                        value: `<white>                       </white> : <cyan>-${result.webp.fromBuildedGain.percentage}%</cyan> from builded`,
                    });
                }
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    // @ts-ignore
                    value: `<cyan>[info]</cyan> Note that only images at resolution <magenta>1x</magenta> are used for stats...`,
                });

                resolve(result);
            },
            {
                metas: {
                    id: this.constructor.name,
                },
            },
        );
    }
}
