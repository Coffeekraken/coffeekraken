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
import __path from 'path';
import __sharp from 'sharp';
import __SImagesBuilderBuildParamsInterface from './interface/SImagesBuilderBuildParamsInterface';
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
                value: `<yellow>[build]</yellow> Starting images Build`,
            });
            function printParams(paramsObj) {
                if (paramsObj.glob) {
                    emit('log', {
                        value: `<yellow>○</yellow> Glob        : <yellow>${paramsObj.glob}</yellow>`,
                    });
                }
                if (paramsObj.inDir) {
                    emit('log', {
                        value: `<yellow>○</yellow> Input       : <cyan>${__path.relative(process.cwd(), paramsObj.inDir)}</cyan>`,
                    });
                }
                if (paramsObj.outDir) {
                    emit('log', {
                        value: `<yellow>○</yellow> Output      : <cyan>${__path.relative(process.cwd(), paramsObj.outDir)}</cyan>`,
                    });
                }
                if (paramsObj.quality) {
                    emit('log', {
                        value: `<yellow>○</yellow> Quality     : <green>${paramsObj.quality}</green>`,
                    });
                }
                if (paramsObj.webp !== undefined) {
                    emit('log', {
                        value: `<yellow>○</yellow> Webp        : ${paramsObj.webp
                            ? '<green>true</green>'
                            : '<red>false</red>'}`,
                    });
                }
                if (paramsObj.width || paramsObj.height) {
                    emit('log', {
                        value: `<yellow>○</yellow> Size        : <yellow>${paramsObj.width ? paramsObj.width : '...'}/${paramsObj.height ? paramsObj.height : '...'}</yellow>`,
                    });
                }
                if (paramsObj.resolution) {
                    emit('log', {
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
                let imgParams = params;
                const file = filesStack[path].source;
                if (params.specificParams) {
                    for (let l = 0; l < Object.keys(params.specificParams).length; l++) {
                        const glob = Object.keys(params.specificParams)[l];
                        const specificParams = params.specificParams[glob];
                        if (__minimatch(file.relPath, glob)) {
                            imgParams = (__deepMerge(params, specificParams));
                        }
                    }
                }
                const outPath = `${imgParams.outDir}/${file.relPath}`;
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
                    if (params.webp) {
                        const webpOutPath = imgObj.outPath.replace(/\.[a-zA-Z0-9]+/, '.webp');
                        yield __sharp(path)
                            .resize(imgObj.size)
                            .webp({
                            quality: params.quality,
                        })
                            .toFile(webpOutPath);
                        const webpFile = __SFile.new(webpOutPath);
                        webpStats.bytes += webpFile.stats.bytes;
                        filesStack[path].builded.push(webpFile);
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
                value: `<green>[success]</green> Images build success!`,
            });
            emit('log', {
                value: `<yellow>[source]</yellow>  Sources files : <yellow>${result.source.mbytes}mb</yellow>`,
            });
            emit('log', {
                // @ts-ignore
                value: `<yellow>[builded]</yellow> Builded files : <yellow>${result.builded.mbytes}mb</yellow>`,
            });
            emit('log', {
                // @ts-ignore
                value: `<white>                       </white> : <cyan>-${result.builded.fromSourceGain.percentage}%</cyan> from source`,
            });
            if (params.webp) {
                emit('log', {
                    // @ts-ignore
                    value: `<yellow>[webp]</yellow>    Webp files    : <yellow>${result.webp.mbytes}mb</yellow>`,
                });
                emit('log', {
                    // @ts-ignore
                    value: `<white>                       </white> : <cyan>-${result.webp.fromSourceGain.percentage}%</cyan> from source`,
                });
                emit('log', {
                    // @ts-ignore
                    value: `<white>                       </white> : <cyan>-${result.webp.fromBuildedGain.percentage}%</cyan> from builded`,
                });
            }
            emit('log', {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ltYWdlc0J1aWxkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTSW1hZ2VzQnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQztBQUMzQyxPQUFPLE9BQWlDLE1BQU0sc0JBQXNCLENBQUM7QUFDckUsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxlQUFlLE1BQU0sMkNBQTJDLENBQUM7QUFDeEUsT0FBTyxZQUFZLE1BQU0sd0NBQXdDLENBQUM7QUFDbEUsT0FBTyxZQUFZLE1BQU0sd0NBQXdDLENBQUM7QUFDbEUsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxXQUFXLE1BQU0sWUFBWSxDQUFDO0FBQ3JDLE9BQU8sV0FBVyxNQUFNLFdBQVcsQ0FBQztBQUNwQyxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBQzVCLE9BQU8sb0NBQW9DLE1BQU0sZ0RBQWdELENBQUM7QUE2RWxHLE1BQU0sQ0FBQyxPQUFPLE9BQU8sY0FBZSxTQUFRLFVBQVU7SUFDbEQ7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxxQkFBcUI7UUFDckIsT0FBYSxJQUFJLENBQUMsU0FBVSxDQUFDLGFBQWEsQ0FBQztJQUMvQyxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUErQztRQUN2RCxLQUFLLENBQ0QsV0FBVyxDQUNQO1lBQ0ksYUFBYSxFQUFFLEVBQUU7U0FDcEIsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7OztPQWdCRztJQUNILE1BQU0sQ0FDRixNQUFrQyxFQUNsQyxRQUEyQztRQUUzQyxPQUFPLElBQUks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