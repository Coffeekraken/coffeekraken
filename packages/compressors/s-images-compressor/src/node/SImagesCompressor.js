var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SClass from '@coffeekraken/s-class';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SPromise from '@coffeekraken/s-promise';
import __SGlob from '@coffeekraken/s-glob';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SFile from '@coffeekraken/s-file';
import __sharp from 'sharp';
import __srcImgDir from '@coffeekraken/sugar/node/path/srcImgDir';
import __ensureDirSync from '@coffeekraken/sugar/node/fs/ensureDirSync';
import __folderPath from '@coffeekraken/sugar/node/fs/folderPath';
import __removeSync from '@coffeekraken/sugar/node/fs/removeSync';
import __imageSize from 'image-size';
export default class SImagesCompressor extends __SClass {
    /**
     * @name            imagesCompressorSettings
     * @type            ISImagesCompressorSettings
     * @get
     *
     * Access the images compressor settings
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get imagesCompressorSettings() {
        return this._settings.imagesCompressor;
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
        const pluginsSettings = __SSugarConfig.get('imagesCompressor.imagemin.pluginsSettings');
        super(__deepMerge({
            imagesCompressor: {
                pluginsSettings
            }
        }, settings !== null && settings !== void 0 ? settings : {}));
    }
    /**
     * @name            compress
     * @type            Function
     * @async
     *
     * This method allows you to compress some images by passing one or more globs
     * as parameters and if needed some ISImagesCompressorSettings settings to override
     * these passed in the constructor
     *
     * @param       {String|String[]}           glob            Some glob(s) to specify which files you want to compress
     * @param       {Partial<ISImagesCompressorSettings>}       [settings={}]       Some settings to override the ones passed in the constructor if needed
     * @return      {SPromise<ISImagesCompressorResult>}        A promise resolved with the ISImagesCompressorResult object that store all the compressed files stats, etc...
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    compress(params, settings) {
        return new __SPromise(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const finalSettings = __deepMerge(this.imagesCompressorSettings, settings !== null && settings !== void 0 ? settings : {});
            // clear if needed
            if (params.clear) {
                __removeSync(params.outDir);
                __ensureDirSync(params.outDir);
            }
            // preparing files stack that store source AND output SFile instances
            const filesStack = {};
            // init stats variables
            const sourceStats = {
                bytes: 0
            };
            const compressedStats = {
                bytes: 0
            };
            // resolving globs
            yield __SGlob.resolve(Array.from(params.input), Object.assign(Object.assign({}, (_a = finalSettings.resolveGlob) !== null && _a !== void 0 ? _a : {}), { cwd: __srcImgDir() })).forEach(file => {
                sourceStats.bytes += file.stats.bytes;
                filesStack[file.path] = {
                    source: file,
                    compressed: []
                };
            });
            for (let i = 0; i < Object.keys(filesStack).length; i++) {
                const path = Object.keys(filesStack)[i];
                const file = filesStack[path].source;
                const outPath = `${params.outDir}/${file.relPath}`;
                // remove file
                __removeSync(outPath);
                // ensure directory
                __ensureDirSync(__folderPath(outPath));
                // shared manipulations
                const imageSize = __imageSize(file.path);
                const idealSize = imageSize;
                if (params.width && idealSize.width > params.width) {
                    const percent = 100 / idealSize.width * params.width;
                    idealSize.width = params.width;
                    idealSize.height = Math.round(idealSize.height / 100 * percent);
                }
                if (params.height && idealSize.height > params.height) {
                    const percent = 100 / idealSize.height * params.height;
                    idealSize.height = params.height;
                    idealSize.width = Math.round(idealSize.width / 100 * percent);
                }
                const imgsArray = [{
                        size: idealSize,
                        resolution: 1,
                        outPath
                    }];
                for (let k = 0; k < params.resolution.length; k++) {
                    const resolution = params.resolution[k];
                    if (resolution === 1)
                        continue;
                    if (file.extension === 'svg')
                        continue;
                    imgsArray.push({
                        size: {
                            width: idealSize.width * resolution,
                            height: idealSize.height * resolution
                        },
                        resolution,
                        outPath: outPath.replace(/\.([a-zA-Z]+)$/, `@${resolution}x.$1`)
                    });
                }
                for (let j = 0; j < imgsArray.length; j++) {
                    const imgObj = imgsArray[j];
                    const outputFn = file.extension === 'jpg' ? 'jpeg' : file.extension;
                    const img = __sharp(path);
                    if (!img[outputFn]) {
                        yield img.resize(imgObj.size).toFile(imgObj.outPath);
                        continue;
                    }
                    yield img.resize(imgObj.size)[outputFn]({
                        quality: params.quality
                    }).toFile(imgObj.outPath);
                }
                const compressedFile = __SFile.new(outPath);
                compressedStats.bytes += compressedFile.stats.bytes;
                filesStack[path].compressed.push(compressedFile);
            }
            const gainedBytes = sourceStats.bytes - compressedStats.bytes;
            resolve({
                source: {
                    bytes: sourceStats.bytes.toFixed(4),
                    kbytes: (sourceStats.bytes * 0.001).toFixed(4),
                    mbytes: (sourceStats.bytes * 0.000001).toFixed(4),
                    gbytes: (sourceStats.bytes * 0.00000001).toFixed(4),
                },
                compressed: {
                    bytes: compressedStats.bytes.toFixed(4),
                    kbytes: (compressedStats.bytes * 0.001).toFixed(4),
                    mbytes: (compressedStats.bytes * 0.000001).toFixed(4),
                    gbytes: (compressedStats.bytes * 0.00000001).toFixed(4),
                },
                gain: {
                    percentage: 100 - Math.round(100 / sourceStats.bytes * compressedStats.bytes),
                    bytes: (gainedBytes).toFixed(4),
                    kbytes: (gainedBytes * 0.001).toFixed(4),
                    mbytes: (gainedBytes * 0.000001).toFixed(4),
                    gbytes: (gainedBytes * 0.00000001).toFixed(4)
                },
                files: filesStack
            });
        }));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ltYWdlc0NvbXByZXNzb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTSW1hZ2VzQ29tcHJlc3Nvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUU3QyxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLE9BQWlDLE1BQU0sc0JBQXNCLENBQUM7QUFDckUsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFDMUQsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFDM0MsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBQzVCLE9BQU8sV0FBVyxNQUFNLHlDQUF5QyxDQUFDO0FBQ2xFLE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hFLE9BQU8sWUFBWSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2xFLE9BQU8sWUFBWSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2xFLE9BQU8sV0FBVyxNQUFNLFlBQVksQ0FBQztBQWlGckMsTUFBTSxDQUFDLE9BQU8sT0FBTyxpQkFBa0IsU0FBUSxRQUFRO0lBRW5EOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksd0JBQXdCO1FBQ3hCLE9BQWEsSUFBSSxDQUFDLFNBQVUsQ0FBQyxnQkFBZ0IsQ0FBQztJQUNsRCxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUFrRDtRQUUxRCxNQUFNLGVBQWUsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLDJDQUEyQyxDQUFDLENBQUM7UUFFeEYsS0FBSyxDQUFDLFdBQVcsQ0FBQztZQUNkLGdCQUFnQixFQUFFO2dCQUNkLGVBQWU7YUFDbEI7U0FDSixFQUFFLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7Ozs7T0FlRztJ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