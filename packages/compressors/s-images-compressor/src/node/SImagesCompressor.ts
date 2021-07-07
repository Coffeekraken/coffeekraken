import __SClass from '@coffeekraken/s-class';
import __SBench from '@coffeekraken/s-bench';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SPromise from '@coffeekraken/s-promise';
import __SGlob, { IResolveGlobSettings } from '@coffeekraken/s-glob';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SFile from '@coffeekraken/s-file';
import __sharp from 'sharp';
import __srcImgDir from '@coffeekraken/sugar/node/path/srcImgDir';
import __ensureDirSync from '@coffeekraken/sugar/node/fs/ensureDirSync';
import __folderPath from '@coffeekraken/sugar/node/fs/folderPath';
import __removeSync from '@coffeekraken/sugar/node/fs/removeSync';
import __imageSize from 'image-size';

import __imagemin from 'imagemin';
import __imageminGifsicle from 'imagemin-gifsicle';
import __imageminJpegtran from 'imagemin-jpegtran';
import __imageminOptipng from 'imagemin-optipng';
import __imageminSvgo from 'imagemin-svgo';
import __imageminWebp from 'imagemin-webp';

/**
 * @name            SImagesCompressor
 * @namespace       node
 * @type            Class
 * @extends         SClass
 * @platform        node
 * @platform        ts
 * @status          beta
 * 
 * This class allows you to compress the more popular images formats like
 * "png", "jpg", "svg", "gif", etc... using different libraries like imagemin for now
 * and more if needed later like tinypng, etc...
 * 
 * @param           {ISImagesCompressorCtorSettings}         [settings={}]           Some settings to configure your image compression process
 * 
 * @example         js
 * import SImagesCompressor from '@coffeekraken/s-image-compressor';
 * const compressor = new SImagesCompressor({
 *      imageCompressor: {
 *          // some settings...
 *      }
 * });
 * await compressor.compress('src/** /*.jpg');
 * 
 * @see             https://www.npmjs.com/package/imagemin
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ISImagesCompressorPluginsSettings {
    gifsicle: any;
    jpegtran: any;
    optipng: any;
    svgo: any;
    webp: any;
    [key: string]: any;
}

export interface ISImagesCompressorSettings {
    resolveGlob: Partial<IResolveGlobSettings>;
    pluginsSettings: Partial<ISImagesCompressorPluginsSettings>;
}

export interface ISImagesCompressorCompressParams {
    input: string;
    outDir: string;
    quality: number;
    width: number;
    height: number;
    resolution: number[];
    clear: boolean;
}

export interface ISImagesCompressorCtorSettings {
    imagesCompressor: Partial<ISImagesCompressorSettings>;
}

export interface ISImagesCompressorImageResult {
    source: __SFile;
    compressed: __SFile[];
}

export interface ISImagesCompressorStats {

}

export interface ISImagesCompressorResult {
    source: ISImagesCompressorStats;
    compressed: ISImagesCompressorStats;
    files: Record<string, ISImagesCompressorImageResult>
}

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
    get imagesCompressorSettings(): ISImagesCompressorSettings {
        return (<any>this._settings).imagesCompressor;
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
    constructor(settings?: Partial<ISImagesCompressorCtorSettings>) {

        const pluginsSettings = __SSugarConfig.get('imagesCompressor.imagemin.pluginsSettings');

        super(__deepMerge({
            imagesCompressor: {
                pluginsSettings
            }
        }, settings ?? {}));
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
    compress(params: ISImagesCompressorCompressParams, settings?: Partial<ISImagesCompressorSettings>): __SPromise<ISImagesCompressorResult> {
        return new __SPromise(async ({resolve, reject, emit}) => {

            const finalSettings: ISImagesCompressorSettings = __deepMerge(
                this.imagesCompressorSettings,
                settings ?? {}
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
                bytes: 0
            };
            const compressedStats = {
                bytes: 0
            };

            // resolving globs
            await __SGlob.resolve(Array.from(params.input), {
                ...finalSettings.resolveGlob ?? {},
                cwd: __srcImgDir()
            }).forEach(file => {

                sourceStats.bytes += file.stats.bytes;

                filesStack[file.path] = {
                    source: file,
                    compressed: []
                };
            });

            for (let i=0; i < Object.keys(filesStack).length; i++) {

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
                    if (resolution === 1) continue;
                    if (file.extension === 'svg') continue;

                    imgsArray.push({
                        size: {
                            width: idealSize.width * resolution,
                            height: idealSize.height * resolution
                        },
                        resolution,
                        outPath: outPath.replace(/\.([a-zA-Z]+)$/, `@${resolution}x.$1`)
                    });

                }

                for (let j = 0; j<imgsArray.length; j++) {

                    const imgObj = imgsArray[j];

                    const outputFn = file.extension === 'jpg' ? 'jpeg' : file.extension;

                    const img = __sharp(path);

                    if (!img[outputFn]) {
                        await img.resize(imgObj.size).toFile(imgObj.outPath);
                        continue;
                    } 

                    await img.resize(imgObj.size)[outputFn]({
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

        });
    }

}