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
import { __copySync, __ensureDirSync, __folderPath, __removeSync } from '@coffeekraken/sugar/fs';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __packageRootDir } from '@coffeekraken/sugar/path';
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
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
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
            console.log(`<yellow>[build]</yellow> Starting images Build`);
            function printParams(paramsObj) {
                if (paramsObj.glob) {
                    console.log(`<yellow>○</yellow> Glob        : <yellow>${paramsObj.glob}</yellow>`);
                }
                if (paramsObj.inDir) {
                    console.log(`<yellow>○</yellow> Input       : <cyan>${__path.relative(process.cwd(), paramsObj.inDir)}</cyan>`);
                }
                if (paramsObj.outDir) {
                    console.log(`<yellow>○</yellow> Output      : <cyan>${__path.relative(process.cwd(), paramsObj.outDir)}</cyan>`);
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
                    console.log({
                        clear: __SLog.isTypeEnabled(__SLog.TYPE_VERBOSE)
                            ? false
                            : true,
                        type: __SLog.TYPE_INFO,
                        value: `<cyan>[copy]</cyan> Copying file "<cyan>${__path.relative(__packageRootDir(), file.path)}</cyan>" under "<magenta>${__path.relative(__packageRootDir(), outPath)}</magenta>"`,
                    });
                    const duration = new __SDuration();
                    // track the builded stats
                    buildedStats.bytes += __fs.statSync(file.path).size;
                    webpStats.bytes += __fs.statSync(file.path).size;
                    // copy file
                    __copySync(file.path, outPath);
                    console.log({
                        clear: __SLog.isTypeEnabled(__SLog.TYPE_VERBOSE)
                            ? false
                            : true,
                        type: __SLog.TYPE_INFO,
                        value: `<green>[copy]</green> File "<cyan>${__path.relative(__packageRootDir(), file.path)}</cyan>" copied <green>successfully</green> under "<magenta>${__path.relative(__packageRootDir(), outPath)}</magenta>" in <yellow>${duration.end().formatedDuration}</yellow>`,
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
                        console.log({
                            clear: __SLog.isTypeEnabled(__SLog.TYPE_VERBOSE)
                                ? false
                                : true,
                            type: __SLog.TYPE_INFO,
                            // @ts-ignore
                            value: `<yellow>[compress]</yellow> Compressing file "<cyan>${__path.relative(__packageRootDir(), file.path)}</cyan>" under "<magenta>${__path.relative(__packageRootDir(), imgObj.outPath)}</magenta>" ${imgParams.specific
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
                        console.log({
                            clear: __SLog.isTypeEnabled(__SLog.TYPE_VERBOSE)
                                ? false
                                : true,
                            type: __SLog.TYPE_INFO,
                            value: `<green>[compress]</green> File "<cyan>${__path.relative(__packageRootDir(), file.path)}</cyan>" compressed <green>successfully</green> under "<magenta>${__path.relative(__packageRootDir(), imgObj.outPath)}</magenta>" in <yellow>${duration.end().formatedDuration}</yellow>`,
                        });
                        if (params.webp) {
                            const webpDuration = new __SDuration();
                            const webpOutPath = imgObj.outPath.replace(/\.[a-zA-Z0-9]+/, '.webp');
                            console.log(`<yellow>[webp]</yellow> Generating webp version of file "<cyan>${__path.relative(__packageRootDir(), imgObj.outPath)}</cyan>"`);
                            yield __sharp(path)
                                .resize(imgObj.size)
                                .webp({
                                quality: params.quality,
                            })
                                .toFile(webpOutPath);
                            const webpFile = __SFile.new(webpOutPath);
                            webpStats.bytes += webpFile.stats.bytes;
                            filesStack[path].builded.push(webpFile);
                            console.log(`<green>[webp]</green> Webp generation of file "<cyan>${__path.relative(__packageRootDir(), imgObj.outPath)}</cyan>" finished <green>successfully</green> in <yellow>${webpDuration.end().formatedDuration}</yellow>`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBQ25ELE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBRTNDLE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sRUFDSCxVQUFVLEVBQ1YsZUFBZSxFQUNmLFlBQVksRUFDWixZQUFZLEVBQ2YsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDNUQsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sV0FBVyxNQUFNLFlBQVksQ0FBQztBQUNyQyxPQUFPLFdBQVcsTUFBTSxXQUFXLENBQUM7QUFDcEMsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sT0FBTyxNQUFNLE9BQU8sQ0FBQztBQUM1QixPQUFPLG9DQUFvQyxNQUFNLGdEQUFnRCxDQUFDO0FBQ2xHLE9BQU8saUNBQWlDLE1BQU0sNkNBQTZDLENBQUM7QUFrRzVGLE1BQU0sQ0FBQyxPQUFPLE9BQU8sY0FBZSxTQUFRLFVBQVU7SUFDbEQ7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUEyQztRQUNuRCxLQUFLLENBQ0QsV0FBVztRQUNQLGFBQWE7UUFDYixpQ0FBaUMsQ0FBQyxRQUFRLEVBQUUsRUFDNUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7T0FnQkc7SUFDSCxNQUFNLENBQ0YsTUFB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