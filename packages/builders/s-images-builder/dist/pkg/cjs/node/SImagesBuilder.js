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
const fs_1 = require("@coffeekraken/sugar/fs");
const object_1 = require("@coffeekraken/sugar/object");
const path_1 = require("@coffeekraken/sugar/path");
const fs_2 = __importDefault(require("fs"));
const image_size_1 = __importDefault(require("image-size"));
const minimatch_1 = __importDefault(require("minimatch"));
const path_2 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const SImagesBuilderBuildParamsInterface_js_1 = __importDefault(require("./interface/SImagesBuilderBuildParamsInterface.js"));
const SImagesBuilderSettingsInterface_js_1 = __importDefault(require("./interface/SImagesBuilderSettingsInterface.js"));
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
        super((0, object_1.__deepMerge)(
        // @ts-ignore
        SImagesBuilderSettingsInterface_js_1.default.defaults(), settings !== null && settings !== void 0 ? settings : {}));
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
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const finalSettings = ((0, object_1.__deepMerge)(this.settings, settings !== null && settings !== void 0 ? settings : {}));
            // @ts-ignore
            params = SImagesBuilderBuildParamsInterface_js_1.default.apply(params !== null && params !== void 0 ? params : {});
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
            console.log(`<yellow>[build]</yellow> Starting images Build`);
            function printParams(paramsObj) {
                if (paramsObj.glob) {
                    console.log(`<yellow>○</yellow> Glob        : <yellow>${paramsObj.glob}</yellow>`);
                }
                if (paramsObj.inDir) {
                    console.log(`<yellow>○</yellow> Input       : <cyan>${path_2.default.relative(process.cwd(), paramsObj.inDir)}</cyan>`);
                }
                if (paramsObj.outDir) {
                    console.log(`<yellow>○</yellow> Output      : <cyan>${path_2.default.relative(process.cwd(), paramsObj.outDir)}</cyan>`);
                }
                if (paramsObj.quality) {
                    console.log(`<yellow>○</yellow> Quality     : <green>${paramsObj.quality}</green>`);
                }
                if (paramsObj.webp !== undefined) {
                    console.log(`<yellow>○</yellow> Webp        : ${paramsObj.webp
                        ? '<green>true</green>'
                        : '<red>false</red>'}`);
                }
                if (paramsObj.width || paramsObj.height) {
                    console.log(`<yellow>○</yellow> Size        : <yellow>${paramsObj.width ? paramsObj.width : '...'}/${paramsObj.height ? paramsObj.height : '...'}</yellow>`);
                }
                if (paramsObj.resolution) {
                    console.log(`<yellow>○</yellow> Resolution${paramsObj.resolution.length > 1 ? 's' : ' '} : ${paramsObj.resolution
                        .map((res) => {
                        return `<magenta>${res}x</magenta>`;
                    })
                        .join(', ')}`);
                }
            }
            printParams(params);
            if (params.specificParams) {
                Object.keys(params.specificParams).forEach((glob) => {
                    const customParamsObj = params.specificParams[glob];
                    console.log(`<cyan>[${glob}]</cyan> Specific params`);
                    printParams(customParamsObj);
                });
            }
            // resolving globs
            yield s_glob_1.default
                .resolveSync(`${params.inDir}/${params.glob}`, Object.assign(Object.assign({}, ((_a = finalSettings.resolveGlob) !== null && _a !== void 0 ? _a : {})), { cwd: params.inDir }))
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
                    console.log({
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
                    console.log({
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
                                imgParams = ((0, object_1.__deepMerge)(params, specificParams));
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
                        console.log({
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
                        console.log({
                            clear: s_log_1.default.isTypeEnabled(s_log_1.default.TYPE_VERBOSE)
                                ? false
                                : true,
                            type: s_log_1.default.TYPE_INFO,
                            value: `<green>[compress]</green> File "<cyan>${path_2.default.relative((0, path_1.__packageRootDir)(), file.path)}</cyan>" compressed <green>successfully</green> under "<magenta>${path_2.default.relative((0, path_1.__packageRootDir)(), imgObj.outPath)}</magenta>" in <yellow>${duration.end().formatedDuration}</yellow>`,
                        });
                        if (params.webp) {
                            const webpDuration = new s_duration_1.default();
                            const webpOutPath = imgObj.outPath.replace(/\.[a-zA-Z0-9]+/, '.webp');
                            console.log(`<yellow>[webp]</yellow> Generating webp version of file "<cyan>${path_2.default.relative((0, path_1.__packageRootDir)(), imgObj.outPath)}</cyan>"`);
                            yield (0, sharp_1.default)(path)
                                .resize(imgObj.size)
                                .webp({
                                quality: params.quality,
                            })
                                .toFile(webpOutPath);
                            const webpFile = s_file_1.default.new(webpOutPath);
                            webpStats.bytes += webpFile.stats.bytes;
                            filesStack[path].builded.push(webpFile);
                            console.log(`<green>[webp]</green> Webp generation of file "<cyan>${path_2.default.relative((0, path_1.__packageRootDir)(), imgObj.outPath)}</cyan>" finished <green>successfully</green> in <yellow>${webpDuration.end().formatedDuration}</yellow>`);
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
                            Math.round((100 / sourceStats.bytes) * buildedStats.bytes),
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
                            Math.round((100 / buildedStats.bytes) * webpStats.bytes),
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
            console.log(`<green>[success]</green> Images build success!`);
            console.log(`<yellow>[source]</yellow>  Sources files : <yellow>${result.source.mbytes}mb</yellow>`);
            console.log(`<yellow>[builded]</yellow> Builded files : <yellow>${result.builded.mbytes}mb</yellow>`);
            console.log(`<white>                       </white> : <cyan>-${result.builded.fromSourceGain.percentage}%</cyan> from source`);
            if (params.webp) {
                console.log(`<yellow>[webp]</yellow>    Webp files    : <yellow>${result.webp.mbytes}mb</yellow>`);
                console.log(`<white>                       </white> : <cyan>-${result.webp.fromSourceGain.percentage}%</cyan> from source`);
                console.log(`<white>                       </white> : <cyan>-${result.webp.fromBuildedGain.percentage}%</cyan> from builded`);
            }
            console.log(`<cyan>[info]</cyan> Note that only images at resolution <magenta>1x</magenta> are used for stats...`);
            resolve(result);
        }));
    }
}
exports.default = SImagesBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esd0VBQWlEO0FBQ2pELDBFQUFtRDtBQUNuRCxrRUFBMkM7QUFFM0Msa0VBQTJDO0FBQzNDLGdFQUF5QztBQUN6QywrQ0FLZ0M7QUFDaEMsdURBQXlEO0FBQ3pELG1EQUE0RDtBQUM1RCw0Q0FBc0I7QUFDdEIsNERBQXFDO0FBQ3JDLDBEQUFvQztBQUNwQyxnREFBMEI7QUFDMUIsa0RBQTRCO0FBQzVCLDhIQUFxRztBQUNyRyx3SEFBK0Y7QUFrRy9GLE1BQXFCLGNBQWUsU0FBUSxtQkFBVTtJQUNsRDs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQTJDO1FBQ25ELEtBQUssQ0FDRCxJQUFBLG9CQUFXO1FBQ1AsYUFBYTtRQUNiLDRDQUFpQyxDQUFDLFFBQVEsRUFBRSxFQUM1QyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7OztPQWdCRztJQUNILE1BQU0sQ0FDRixNQUFrQyxFQUNsQyxRQUEyQztRQUUzQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLEVBQUU7O1lBQ2pDLE1BQU0sYUFBYSxHQUE0QixDQUMzQyxJQUFBLG9CQUFXLEVBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDN0MsQ0FBQztZQUVGLGFBQWE7WUFDYixNQUFNLEdBQUcsK0NBQW9DLENBQUMsS0FBSyxDQUFDLE1BQU0sYUFBTixNQUFNLGNBQU4sTUFBTSxHQUFJLEVBQUUsQ0FBQyxDQUFDO1lBRWxFLGtCQUFrQjtZQUNsQixJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUU7Z0JBQ2QsSUFBQSxpQkFBWSxFQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FB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