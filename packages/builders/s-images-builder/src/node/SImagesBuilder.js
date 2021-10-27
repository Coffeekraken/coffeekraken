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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ltYWdlc0J1aWxkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTSW1hZ2VzQnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFVBQXFDLE1BQU0seUJBQXlCLENBQUM7QUFDNUUsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFDM0MsT0FBTyxPQUFpQyxNQUFNLHNCQUFzQixDQUFDO0FBQ3JFLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hFLE9BQU8sWUFBWSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2xFLE9BQU8sWUFBWSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2xFLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sV0FBVyxNQUFNLFlBQVksQ0FBQztBQUNyQyxPQUFPLFdBQVcsTUFBTSxXQUFXLENBQUM7QUFDcEMsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sT0FBTyxNQUFNLE9BQU8sQ0FBQztBQUM1QixPQUFPLG9DQUFvQyxNQUFNLGdEQUFnRCxDQUFDO0FBOEVsRyxNQUFNLENBQUMsT0FBTyxPQUFPLGNBQWUsU0FBUSxVQUFVO0lBQ2xEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUkscUJBQXFCO1FBQ3JCLE9BQWEsSUFBSSxDQUFDLFNBQVUsQ0FBQyxhQUFhLENBQUM7SUFDL0MsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBK0M7UUFDdkQsS0FBSyxDQUNELFdBQVcsQ0FDUDtZQUNJLGFBQWEsRUFBRSxFQUFFO1NBQ3BCLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7T0FnQkc7SUFDSCxNQUFNLENBQ0YsTUFBa0MsRUFDbEMsUUFBMkM7UUFFM0MsT0FBTyxJQUFJ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