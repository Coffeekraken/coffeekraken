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
import __SFile from '@coffeekraken/s-file';
import __SGlob from '@coffeekraken/s-glob';
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import __copySync from '@coffeekraken/sugar/node/fs/copySync';
import __ensureDirSync from '@coffeekraken/sugar/node/fs/ensureDirSync';
import __folderPath from '@coffeekraken/sugar/node/fs/folderPath';
import __removeSync from '@coffeekraken/sugar/node/fs/removeSync';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __fs from 'fs';
import __imageSize from 'image-size';
import __minimatch from 'minimatch';
import __path from 'path';
import __sharp from 'sharp';
import __SImagesBuilderBuildParamsInterface from './interface/SImagesBuilderBuildParamsInterface';
import __SImagesBuilderSettingsInterface from './interface/SImagesBuilderSettingsInterface';
export default class SImagesBuilder extends __SBuilder {
    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings) {
        super(__deepMerge(
        // @ts-ignore
        __SImagesBuilderSettingsInterface.defaults(), settings !== null && settings !== void 0 ? settings : {}));
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _build(params, settings) {
        return new __SPromise(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const finalSettings = (__deepMerge(this.settings, settings !== null && settings !== void 0 ? settings : {}));
            // @ts-ignore
            params = __SImagesBuilderBuildParamsInterface.apply(params !== null && params !== void 0 ? params : {});
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
                        value: `<yellow>○</yellow> Input       : <cyan>${__path.relative(process.cwd(), paramsObj.inDir)}</cyan>`,
                    });
                }
                if (paramsObj.outDir) {
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>○</yellow> Output      : <cyan>${__path.relative(process.cwd(), paramsObj.outDir)}</cyan>`,
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
                        value: `<yellow>○</yellow> Webp        : ${paramsObj.webp
                            ? '<green>true</green>'
                            : '<red>false</red>'}`,
                    });
                }
                if (paramsObj.width || paramsObj.height) {
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>○</yellow> Size        : <yellow>${paramsObj.width ? paramsObj.width : '...'}/${paramsObj.height ? paramsObj.height : '...'}</yellow>`,
                    });
                }
                if (paramsObj.resolution) {
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>○</yellow> Resolution${paramsObj.resolution.length > 1 ? 's' : ' '} : ${paramsObj.resolution
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
            yield __SGlob
                .resolve(`${params.inDir}/${params.glob}`, Object.assign(Object.assign({}, ((_a = finalSettings.resolveGlob) !== null && _a !== void 0 ? _a : {})), { cwd: params.inDir }))
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
                        clear: __SLog.isTypeEnabled(__SLog.TYPE_VERBOSE)
                            ? false
                            : true,
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
                        clear: __SLog.isTypeEnabled(__SLog.TYPE_VERBOSE)
                            ? false
                            : true,
                        type: __SLog.TYPE_INFO,
                        value: `<green>[copy]</green> File "<cyan>${__path.relative(__packageRoot(), file.path)}</cyan>" copied <green>successfully</green> under "<magenta>${__path.relative(__packageRoot(), outPath)}</magenta>" in <yellow>${duration.end().formatedDuration}</yellow>`,
                    });
                    // pass to next file
                    continue;
                }
                else {
                    if (params.specificParams) {
                        for (let l = 0; l < Object.keys(params.specificParams).length; l++) {
                            const glob = Object.keys(params.specificParams)[l];
                            const specificParams = params.specificParams[glob];
                            if (__minimatch(file.relPath, glob)) {
                                imgParams = (__deepMerge(params, specificParams));
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
                    const idealSize = imageSize;
                    if (imgParams.width &&
                        idealSize.width > imgParams.width) {
                        const percent = (100 / idealSize.width) * imgParams.width;
                        idealSize.width = imgParams.width;
                        idealSize.height = Math.round((idealSize.height / 100) * percent);
                    }
                    if (imgParams.height &&
                        idealSize.height > imgParams.height) {
                        const percent = (100 / idealSize.height) * imgParams.height;
                        idealSize.height = imgParams.height;
                        idealSize.width = Math.round((idealSize.width / 100) * percent);
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
                        if (resolution === 1)
                            continue;
                        if (file.extension === 'svg')
                            continue;
                        imgsArray.push({
                            size: {
                                width: idealSize.width * resolution,
                                height: idealSize.height * resolution,
                            },
                            resolution,
                            outPath: outPath.replace(/\.([a-zA-Z]+)$/, `@${resolution}x.$1`),
                        });
                    }
                    for (let j = 0; j < imgsArray.length; j++) {
                        const imgObj = imgsArray[j];
                        const outputFn = file.extension === 'jpg'
                            ? 'jpeg'
                            : file.extension;
                        emit('log', {
                            clear: __SLog.isTypeEnabled(__SLog.TYPE_VERBOSE)
                                ? false
                                : true,
                            type: __SLog.TYPE_INFO,
                            // @ts-ignore
                            value: `<yellow>[compress]</yellow> Compressing file "<cyan>${__path.relative(__packageRoot(), file.path)}</cyan>" under "<magenta>${__path.relative(__packageRoot(), imgObj.outPath)}</magenta>" ${imgParams.specific
                                ? ` with <red>specific parameters</red>`
                                : ''}`,
                        });
                        const duration = new __SDuration();
                        const img = __sharp(path);
                        if (!img[outputFn]) {
                            yield img
                                .resize(imgObj.size)
                                .toFile(imgObj.outPath);
                            continue;
                        }
                        yield img
                            .resize(imgObj.size)[outputFn]({
                            quality: params.quality,
                        })
                            .toFile(imgObj.outPath);
                        const buildedFile = __SFile.new(imgObj.outPath);
                        buildedStats.bytes += buildedFile.stats.bytes;
                        filesStack[path].builded.push(buildedFile);
                        emit('log', {
                            clear: __SLog.isTypeEnabled(__SLog.TYPE_VERBOSE)
                                ? false
                                : true,
                            type: __SLog.TYPE_INFO,
                            value: `<green>[compress]</green> File "<cyan>${__path.relative(__packageRoot(), file.path)}</cyan>" compressed <green>successfully</green> under "<magenta>${__path.relative(__packageRoot(), imgObj.outPath)}</magenta>" in <yellow>${duration.end().formatedDuration}</yellow>`,
                        });
                        if (params.webp) {
                            const webpDuration = new __SDuration();
                            const webpOutPath = imgObj.outPath.replace(/\.[a-zA-Z0-9]+/, '.webp');
                            emit('log', {
                                type: __SLog.TYPE_VERBOSER,
                                value: `<yellow>[webp]</yellow> Generatating webp version of file "<cyan>${__path.relative(__packageRoot(), imgObj.outPath)}</cyan>"`,
                            });
                            yield __sharp(path)
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
            const buildedGainedBytes = sourceStats.bytes - buildedStats.bytes, webpFromSourceGainedBytes = sourceStats.bytes - webpStats.bytes, webpFromBuildedGainedBytes = buildedStats.bytes - webpStats.bytes;
            const result = {
                source: {
                    bytes: sourceStats.bytes.toFixed(2),
                    kbytes: (sourceStats.bytes * 0.001).toFixed(2),
                    mbytes: (sourceStats.bytes * 0.000001).toFixed(2),
                    gbytes: (sourceStats.bytes * 0.00000001).toFixed(2),
                },
                builded: {
                    fromSourceGain: {
                        percentage: 100 -
                            Math.round((100 / sourceStats.bytes) *
                                buildedStats.bytes),
                        bytes: buildedGainedBytes.toFixed(2),
                        kbytes: (buildedGainedBytes * 0.001).toFixed(2),
                        mbytes: (buildedGainedBytes * 0.000001).toFixed(2),
                        gbytes: (buildedGainedBytes * 0.00000001).toFixed(2),
                    },
                    bytes: buildedStats.bytes.toFixed(2),
                    kbytes: (buildedStats.bytes * 0.001).toFixed(2),
                    mbytes: (buildedStats.bytes * 0.000001).toFixed(2),
                    gbytes: (buildedStats.bytes * 0.00000001).toFixed(2),
                },
                webp: {
                    fromSourceGain: {
                        percentage: 100 -
                            Math.round((100 / sourceStats.bytes) * webpStats.bytes),
                        bytes: webpFromSourceGainedBytes.toFixed(2),
                        kbytes: (webpFromSourceGainedBytes * 0.001).toFixed(2),
                        mbytes: (webpFromSourceGainedBytes * 0.000001).toFixed(2),
                        gbytes: (webpFromSourceGainedBytes * 0.00000001).toFixed(2),
                    },
                    fromBuildedGain: {
                        percentage: 100 -
                            Math.round((100 / buildedStats.bytes) *
                                webpStats.bytes),
                        bytes: webpFromBuildedGainedBytes.toFixed(2),
                        kbytes: (webpFromBuildedGainedBytes * 0.001).toFixed(2),
                        mbytes: (webpFromBuildedGainedBytes * 0.000001).toFixed(2),
                        gbytes: (webpFromBuildedGainedBytes * 0.00000001).toFixed(2),
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
        }), {
            metas: {
                id: this.constructor.name,
            },
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBRTNDLE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sVUFBVSxNQUFNLHNDQUFzQyxDQUFDO0FBQzlELE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hFLE9BQU8sWUFBWSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2xFLE9BQU8sWUFBWSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2xFLE9BQU8sYUFBYSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3RFLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLFdBQVcsTUFBTSxZQUFZLENBQUM7QUFDckMsT0FBTyxXQUFXLE1BQU0sV0FBVyxDQUFDO0FBQ3BDLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLE9BQU8sTUFBTSxPQUFPLENBQUM7QUFDNUIsT0FBTyxvQ0FBb0MsTUFBTSxnREFBZ0QsQ0FBQztBQUNsRyxPQUFPLGlDQUFpQyxNQUFNLDZDQUE2QyxDQUFDO0FBMEU1RixNQUFNLENBQUMsT0FBTyxPQUFPLGNBQWUsU0FBUSxVQUFVO0lBQ2xEOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBMkM7UUFDbkQsS0FBSyxDQUNELFdBQVc7UUFDUCxhQUFhO1FBQ2IsaUNBQWlDLENBQUMsUUFBUSxFQUFFLEVBQzVDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUs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