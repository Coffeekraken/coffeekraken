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
import __SFile from '@coffeekraken/s-file';
import __SGlob from '@coffeekraken/s-glob';
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
    get imagesBuilderSettings() {
        return this._settings.imagesBuilder;
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
    constructor(settings) {
        super(__deepMerge({
            imagesBuilder: {},
        }, settings !== null && settings !== void 0 ? settings : {}));
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
    _build(params, settings) {
        return new __SPromise(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const finalSettings = __deepMerge({
                resolveGlob: {},
            }, this.imagesBuilderSettings, settings !== null && settings !== void 0 ? settings : {});
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
                        clear: true,
                        type: __SLog.TYPE_VERBOSE,
                        value: `<cyan>[copy]</cyan> Copying file "<cyan>${__path.relative(__packageRoot(), file.path)}</cyan>" under "<magenta>${__path.relative(__packageRoot(), outPath)}</magenta>"`,
                    });
                    const duration = new __SDuration();
                    // track the builded stats
                    buildedStats.bytes += __fs.statSync(file.path).size;
                    webpStats.bytes += __fs.statSync(file.path).size;
                    // copy file
                    __copySync(file.path, outPath);
                    emit('log', {
                        clear: true,
                        type: __SLog.TYPE_VERBOSE,
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
                    if (imgParams.width && idealSize.width > imgParams.width) {
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
                        const outputFn = file.extension === 'jpg' ? 'jpeg' : file.extension;
                        emit('log', {
                            clear: true,
                            type: __SLog.TYPE_VERBOSE,
                            // @ts-ignore
                            value: `<yellow>[compress]</yellow> Compressing file "<cyan>${__path.relative(__packageRoot(), file.path)}</cyan>" under "<magenta>${__path.relative(__packageRoot(), imgObj.outPath)}</magenta>" ${imgParams.specific ? ` with <red>specific parameters</red>` : ''}`,
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
                        const buildedFile = __SFile.new(outPath);
                        buildedStats.bytes += buildedFile.stats.bytes;
                        filesStack[path].builded.push(buildedFile);
                        emit('log', {
                            clear: true,
                            type: __SLog.TYPE_VERBOSE,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ltYWdlc0J1aWxkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTSW1hZ2VzQnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFVBQXFDLE1BQU0seUJBQXlCLENBQUM7QUFDNUUsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFDM0MsT0FBTyxPQUFpQyxNQUFNLHNCQUFzQixDQUFDO0FBQ3JFLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hFLE9BQU8sWUFBWSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2xFLE9BQU8sWUFBWSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2xFLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sV0FBVyxNQUFNLFlBQVksQ0FBQztBQUNyQyxPQUFPLFdBQVcsTUFBTSxXQUFXLENBQUM7QUFDcEMsT0FBTyxhQUFhLE1BQU0sMkNBQTJDLENBQUM7QUFDdEUsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE9BQU8sTUFBTSxPQUFPLENBQUM7QUFDNUIsT0FBTyxNQUFNLE1BQU0scUJBQXFCLENBQUM7QUFDekMsT0FBTyxvQ0FBb0MsTUFBTSxnREFBZ0QsQ0FBQztBQUNsRyxPQUFPLFVBQVUsTUFBTSxzQ0FBc0MsQ0FBQztBQThFOUQsTUFBTSxDQUFDLE9BQU8sT0FBTyxjQUFlLFNBQVEsVUFBVTtJQUNsRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLHFCQUFxQjtRQUNyQixPQUFhLElBQUksQ0FBQyxTQUFVLENBQUMsYUFBYSxDQUFDO0lBQy9DLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQStDO1FBQ3ZELEtBQUssQ0FDRCxXQUFXLENBQ1A7WUFD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