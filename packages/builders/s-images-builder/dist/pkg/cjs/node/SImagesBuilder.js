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
const fs_1 = require("@coffeekraken/sugar/fs");
const path_1 = require("@coffeekraken/sugar/path");
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const fs_2 = __importDefault(require("fs"));
const image_size_1 = __importDefault(require("image-size"));
const minimatch_1 = __importDefault(require("minimatch"));
const path_2 = __importDefault(require("path"));
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
                (0, fs_1.__removeSync)(params.outDir);
                (0, fs_1.__ensureDirSync)(params.outDir);
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
                        value: `<yellow>○</yellow> Input       : <cyan>${path_2.default.relative(process.cwd(), paramsObj.inDir)}</cyan>`,
                    });
                }
                if (paramsObj.outDir) {
                    emit('log', {
                        type: s_log_1.default.TYPE_INFO,
                        value: `<yellow>○</yellow> Output      : <cyan>${path_2.default.relative(process.cwd(), paramsObj.outDir)}</cyan>`,
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
                        value: `<cyan>[copy]</cyan> Copying file "<cyan>${path_2.default.relative((0, path_1.__packageRootDir)(), file.path)}</cyan>" under "<magenta>${path_2.default.relative((0, path_1.__packageRootDir)(), outPath)}</magenta>"`,
                    });
                    const duration = new s_duration_1.default();
                    // track the builded stats
                    buildedStats.bytes += fs_2.default.statSync(file.path).size;
                    webpStats.bytes += fs_2.default.statSync(file.path).size;
                    // copy file
                    (0, fs_1.__copySync)(file.path, outPath);
                    emit('log', {
                        clear: s_log_1.default.isTypeEnabled(s_log_1.default.TYPE_VERBOSE)
                            ? false
                            : true,
                        type: s_log_1.default.TYPE_INFO,
                        value: `<green>[copy]</green> File "<cyan>${path_2.default.relative((0, path_1.__packageRootDir)(), file.path)}</cyan>" copied <green>successfully</green> under "<magenta>${path_2.default.relative((0, path_1.__packageRootDir)(), outPath)}</magenta>" in <yellow>${duration.end().formatedDuration}</yellow>`,
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
                    (0, fs_1.__removeSync)(outPath);
                    // ensure directory
                    (0, fs_1.__ensureDirSync)((0, fs_1.__folderPath)(outPath));
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
                            value: `<yellow>[compress]</yellow> Compressing file "<cyan>${path_2.default.relative((0, path_1.__packageRootDir)(), file.path)}</cyan>" under "<magenta>${path_2.default.relative((0, path_1.__packageRootDir)(), imgObj.outPath)}</magenta>" ${imgParams.specific
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
                            value: `<green>[compress]</green> File "<cyan>${path_2.default.relative((0, path_1.__packageRootDir)(), file.path)}</cyan>" compressed <green>successfully</green> under "<magenta>${path_2.default.relative((0, path_1.__packageRootDir)(), imgObj.outPath)}</magenta>" in <yellow>${duration.end().formatedDuration}</yellow>`,
                        });
                        if (params.webp) {
                            const webpDuration = new s_duration_1.default();
                            const webpOutPath = imgObj.outPath.replace(/\.[a-zA-Z0-9]+/, '.webp');
                            emit('log', {
                                type: s_log_1.default.TYPE_VERBOSER,
                                value: `<yellow>[webp]</yellow> Generatating webp version of file "<cyan>${path_2.default.relative((0, path_1.__packageRootDir)(), imgObj.outPath)}</cyan>"`,
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
                                value: `<green>[webp]</green> Webp generation of file "<cyan>${path_2.default.relative((0, path_1.__packageRootDir)(), imgObj.outPath)}</cyan>" finished <green>successfully</green> in <yellow>${webpDuration.end().formatedDuration}</yellow>`,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esd0VBQWlEO0FBQ2pELDBFQUFtRDtBQUNuRCxrRUFBMkM7QUFFM0Msa0VBQTJDO0FBQzNDLGdFQUF5QztBQUN6Qyx3RUFBaUQ7QUFDakQsK0NBS2dDO0FBQ2hDLG1EQUE0RDtBQUM1RCw0RkFBc0U7QUFDdEUsNENBQXNCO0FBQ3RCLDREQUFxQztBQUNyQywwREFBb0M7QUFDcEMsZ0RBQTBCO0FBQzFCLGtEQUE0QjtBQUM1Qix3SEFBa0c7QUFDbEcsa0hBQTRGO0FBMEU1RixNQUFxQixjQUFlLFNBQVEsbUJBQVU7SUFDbEQ7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUEyQztRQUNuRCxLQUFLLENBQ0QsSUFBQSxtQkFBVztRQUNQLGFBQWE7UUFDYix5Q0FBaUMsQ0FBQyxRQUFRLEVBQUUsRUFDNUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7T0FnQkc7SUFDSCxNQUFNLENBQ0YsTUFBa0MsRUFDbEMsUUFBMkM7UUFFM0MsT0FBTyxJQUFJLG1CQUFVLENBQ2pCLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7O1lBQ2hDLE1BQU0sYUFBYSxHQUE0QixDQUMzQyxJQUFBLG1CQUFXLEVBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDN0MsQ0FBQztZQUVGLGFBQWE7WUFDYixNQUFNLEdBQUcsNENBQW9DLENBQUMsS0FBSyxDQUMvQyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxFQUFFLENBQ2YsQ0FBQztZQUVGLGtCQUFrQjtZQUNsQixJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUU7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