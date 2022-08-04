"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_builder_1 = __importDefault(require("@coffeekraken/s-builder"));
const s_duration_1 = __importDefault(require("@coffeekraken/s-duration"));
const s_file_1 = __importDefault(require("@coffeekraken/s-file"));
const s_glob_1 = __importDefault(require("@coffeekraken/s-glob"));
const s_log_1 = __importDefault(require("@coffeekraken/s-log"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const copySync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/copySync"));
const ensureDirSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/ensureDirSync"));
const folderPath_1 = __importDefault(require("@coffeekraken/sugar/node/fs/folderPath"));
const removeSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/removeSync"));
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const fs_1 = __importDefault(require("fs"));
const image_size_1 = __importDefault(require("image-size"));
const minimatch_1 = __importDefault(require("minimatch"));
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const SImagesBuilderBuildParamsInterface_1 = __importDefault(require("./interface/SImagesBuilderBuildParamsInterface"));
const SImagesBuilderSettingsInterface_1 = __importDefault(require("./interface/SImagesBuilderSettingsInterface"));
class SImagesBuilder extends s_builder_1.default {
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
        super((0, deepMerge_1.default)(
        // @ts-ignore
        SImagesBuilderSettingsInterface_1.default.defaults(), settings !== null && settings !== void 0 ? settings : {}));
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
        return new s_promise_1.default(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const finalSettings = ((0, deepMerge_1.default)(this.settings, settings !== null && settings !== void 0 ? settings : {}));
            // @ts-ignore
            params = SImagesBuilderBuildParamsInterface_1.default.apply(params !== null && params !== void 0 ? params : {});
            // clear if needed
            if (params.clear) {
                (0, removeSync_1.default)(params.outDir);
                (0, ensureDirSync_1.default)(params.outDir);
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
                type: s_log_1.default.TYPE_INFO,
                value: `<yellow>[build]</yellow> Starting images Build`,
            });
            function printParams(paramsObj) {
                if (paramsObj.glob) {
                    emit('log', {
                        type: s_log_1.default.TYPE_INFO,
                        value: `<yellow>○</yellow> Glob        : <yellow>${paramsObj.glob}</yellow>`,
                    });
                }
                if (paramsObj.inDir) {
                    emit('log', {
                        type: s_log_1.default.TYPE_INFO,
                        value: `<yellow>○</yellow> Input       : <cyan>${path_1.default.relative(process.cwd(), paramsObj.inDir)}</cyan>`,
                    });
                }
                if (paramsObj.outDir) {
                    emit('log', {
                        type: s_log_1.default.TYPE_INFO,
                        value: `<yellow>○</yellow> Output      : <cyan>${path_1.default.relative(process.cwd(), paramsObj.outDir)}</cyan>`,
                    });
                }
                if (paramsObj.quality) {
                    emit('log', {
                        type: s_log_1.default.TYPE_INFO,
                        value: `<yellow>○</yellow> Quality     : <green>${paramsObj.quality}</green>`,
                    });
                }
                if (paramsObj.webp !== undefined) {
                    emit('log', {
                        type: s_log_1.default.TYPE_INFO,
                        value: `<yellow>○</yellow> Webp        : ${paramsObj.webp
                            ? '<green>true</green>'
                            : '<red>false</red>'}`,
                    });
                }
                if (paramsObj.width || paramsObj.height) {
                    emit('log', {
                        type: s_log_1.default.TYPE_INFO,
                        value: `<yellow>○</yellow> Size        : <yellow>${paramsObj.width ? paramsObj.width : '...'}/${paramsObj.height ? paramsObj.height : '...'}</yellow>`,
                    });
                }
                if (paramsObj.resolution) {
                    emit('log', {
                        type: s_log_1.default.TYPE_INFO,
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
                        type: s_log_1.default.TYPE_INFO,
                        value: `<cyan>[${glob}]</cyan> Specific params`,
                    });
                    printParams(customParamsObj);
                });
            }
            // resolving globs
            yield s_glob_1.default
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
                        clear: s_log_1.default.isTypeEnabled(s_log_1.default.TYPE_VERBOSE)
                            ? false
                            : true,
                        type: s_log_1.default.TYPE_INFO,
                        value: `<cyan>[copy]</cyan> Copying file "<cyan>${path_1.default.relative((0, packageRoot_1.default)(), file.path)}</cyan>" under "<magenta>${path_1.default.relative((0, packageRoot_1.default)(), outPath)}</magenta>"`,
                    });
                    const duration = new s_duration_1.default();
                    // track the builded stats
                    buildedStats.bytes += fs_1.default.statSync(file.path).size;
                    webpStats.bytes += fs_1.default.statSync(file.path).size;
                    // copy file
                    (0, copySync_1.default)(file.path, outPath);
                    emit('log', {
                        clear: s_log_1.default.isTypeEnabled(s_log_1.default.TYPE_VERBOSE)
                            ? false
                            : true,
                        type: s_log_1.default.TYPE_INFO,
                        value: `<green>[copy]</green> File "<cyan>${path_1.default.relative((0, packageRoot_1.default)(), file.path)}</cyan>" copied <green>successfully</green> under "<magenta>${path_1.default.relative((0, packageRoot_1.default)(), outPath)}</magenta>" in <yellow>${duration.end().formatedDuration}</yellow>`,
                    });
                    // pass to next file
                    continue;
                }
                else {
                    if (params.specificParams) {
                        for (let l = 0; l < Object.keys(params.specificParams).length; l++) {
                            const glob = Object.keys(params.specificParams)[l];
                            const specificParams = params.specificParams[glob];
                            if ((0, minimatch_1.default)(file.relPath, glob)) {
                                imgParams = ((0, deepMerge_1.default)(params, specificParams));
                                // @ts-ignore
                                imgParams.specific = true;
                            }
                        }
                    }
                    // remove file
                    (0, removeSync_1.default)(outPath);
                    // ensure directory
                    (0, ensureDirSync_1.default)((0, folderPath_1.default)(outPath));
                    // shared manipulations
                    const imageSize = (0, image_size_1.default)(file.path);
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
                            clear: s_log_1.default.isTypeEnabled(s_log_1.default.TYPE_VERBOSE)
                                ? false
                                : true,
                            type: s_log_1.default.TYPE_INFO,
                            // @ts-ignore
                            value: `<yellow>[compress]</yellow> Compressing file "<cyan>${path_1.default.relative((0, packageRoot_1.default)(), file.path)}</cyan>" under "<magenta>${path_1.default.relative((0, packageRoot_1.default)(), imgObj.outPath)}</magenta>" ${imgParams.specific
                                ? ` with <red>specific parameters</red>`
                                : ''}`,
                        });
                        const duration = new s_duration_1.default();
                        const img = (0, sharp_1.default)(path);
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
                        const buildedFile = s_file_1.default.new(imgObj.outPath);
                        buildedStats.bytes += buildedFile.stats.bytes;
                        filesStack[path].builded.push(buildedFile);
                        emit('log', {
                            clear: s_log_1.default.isTypeEnabled(s_log_1.default.TYPE_VERBOSE)
                                ? false
                                : true,
                            type: s_log_1.default.TYPE_INFO,
                            value: `<green>[compress]</green> File "<cyan>${path_1.default.relative((0, packageRoot_1.default)(), file.path)}</cyan>" compressed <green>successfully</green> under "<magenta>${path_1.default.relative((0, packageRoot_1.default)(), imgObj.outPath)}</magenta>" in <yellow>${duration.end().formatedDuration}</yellow>`,
                        });
                        if (params.webp) {
                            const webpDuration = new s_duration_1.default();
                            const webpOutPath = imgObj.outPath.replace(/\.[a-zA-Z0-9]+/, '.webp');
                            emit('log', {
                                type: s_log_1.default.TYPE_VERBOSER,
                                value: `<yellow>[webp]</yellow> Generatating webp version of file "<cyan>${path_1.default.relative((0, packageRoot_1.default)(), imgObj.outPath)}</cyan>"`,
                            });
                            yield (0, sharp_1.default)(path)
                                .resize(imgObj.size)
                                .webp({
                                quality: params.quality,
                            })
                                .toFile(webpOutPath);
                            const webpFile = s_file_1.default.new(webpOutPath);
                            webpStats.bytes += webpFile.stats.bytes;
                            filesStack[path].builded.push(webpFile);
                            emit('log', {
                                type: s_log_1.default.TYPE_VERBOSER,
                                value: `<green>[webp]</green> Webp generation of file "<cyan>${path_1.default.relative((0, packageRoot_1.default)(), imgObj.outPath)}</cyan>" finished <green>successfully</green> in <yellow>${webpDuration.end().formatedDuration}</yellow>`,
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
                type: s_log_1.default.TYPE_INFO,
                value: `<green>[success]</green> Images build success!`,
            });
            emit('log', {
                type: s_log_1.default.TYPE_INFO,
                value: `<yellow>[source]</yellow>  Sources files : <yellow>${result.source.mbytes}mb</yellow>`,
            });
            emit('log', {
                type: s_log_1.default.TYPE_INFO,
                // @ts-ignore
                value: `<yellow>[builded]</yellow> Builded files : <yellow>${result.builded.mbytes}mb</yellow>`,
            });
            emit('log', {
                type: s_log_1.default.TYPE_INFO,
                // @ts-ignore
                value: `<white>                       </white> : <cyan>-${result.builded.fromSourceGain.percentage}%</cyan> from source`,
            });
            if (params.webp) {
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    // @ts-ignore
                    value: `<yellow>[webp]</yellow>    Webp files    : <yellow>${result.webp.mbytes}mb</yellow>`,
                });
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    // @ts-ignore
                    value: `<white>                       </white> : <cyan>-${result.webp.fromSourceGain.percentage}%</cyan> from source`,
                });
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    // @ts-ignore
                    value: `<white>                       </white> : <cyan>-${result.webp.fromBuildedGain.percentage}%</cyan> from builded`,
                });
            }
            emit('log', {
                type: s_log_1.default.TYPE_INFO,
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
exports.default = SImagesBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esd0VBQWlEO0FBQ2pELDBFQUFtRDtBQUNuRCxrRUFBMkM7QUFFM0Msa0VBQTJDO0FBQzNDLGdFQUF5QztBQUN6Qyx3RUFBaUQ7QUFDakQsb0ZBQThEO0FBQzlELDhGQUF3RTtBQUN4RSx3RkFBa0U7QUFDbEUsd0ZBQWtFO0FBQ2xFLDRGQUFzRTtBQUN0RSw0RkFBc0U7QUFDdEUsNENBQXNCO0FBQ3RCLDREQUFxQztBQUNyQywwREFBb0M7QUFDcEMsZ0RBQTBCO0FBQzFCLGtEQUE0QjtBQUM1Qix3SEFBa0c7QUFDbEcsa0hBQTRGO0FBMEU1RixNQUFxQixjQUFlLFNBQVEsbUJBQVU7SUFDbEQ7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUEyQztRQUNuRCxLQUFLLENBQ0QsSUFBQSxtQkFBVztRQUNQLGFBQWE7UUFDYix5Q0FBaUMsQ0FBQyxRQUFRLEVBQUUsRUFDNUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7T0FnQkc7SUFDSCxNQUFNLENBQ0YsTUFBa0MsRUFDbEMsUUFBMkM7UUFFM0MsT0FBTyxJQUFJLG1CQUFVLENBQ2pCLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7O1lBQ2hDLE1BQU0sYUFBYSxHQUE0QixDQUMzQyxJQUFBLG1CQUFXLEVBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDN0MsQ0FBQztZQUVGLGFBQWE7WUFDYixNQUFNLEdBQUcsNENBQW9DLENBQUMsS0FBSyxDQUMvQyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxFQUFFLENBQ2YsQ0FBQztZQUVG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