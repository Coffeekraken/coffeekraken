import type { ISBuilderSettings } from '@coffeekraken/s-builder';
import __SBuilder from '@coffeekraken/s-builder';
import __SFile from '@coffeekraken/s-file';
import type { IResolveGlobSettings } from '@coffeekraken/s-glob';
import { __writeFileSync } from '@coffeekraken/sugar/fs';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __packageJsonSync } from '@coffeekraken/sugar/package';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __favicons from 'favicons';
import __fs from 'fs';
import __path from 'path';
import __SFaviconBuilderBuildParamsInterface from './interface/SFaviconBuilderBuildParamsInterface';

/**
 * @name            SFaviconBuilder
 * @namespace       node
 * @type            Class
 * @interface       ./interface/SFaviconBuilderBuildParamsInterface.ts
 * @extends         SBuilder
 * @platform        node
 * @status          beta
 *
 * This class allows you to generate all the favicons you need for your website.
 *
 * @param           {ISFaviconBuilderSettings}         [settings={}]           Some settings to configure your image compression process
 *
 * @example         js
 * import SFaviconBuilder from '@coffeekraken/s-favicon-builder';
 * const builder = new SFaviconBuilder({
 *      faviconBuilder: {
 *          // some settings...
 *      }
 * });
 * await builder.build('src/** /*.jpg');
 *
 * @see             https://www.npmjs.com/package/favicons
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISFaviconBuilderSettings extends ISBuilderSettings {
    resolveGlob: Partial<IResolveGlobSettings>;
}

export interface ISFaviconBuilderBuildParams {
    input: string;
    outDir: string;
    settings: any;
}

export interface ISFaviconBuilderImageResult {
    source: __SFile;
    builded: __SFile[];
    webp: __SFile[];
}

export interface ISFaviconBuilderResultItem extends ISFaviconBuilderStats {
    fromSourceGain?: ISFaviconBuilderStats;
    fromBuildedGain?: ISFaviconBuilderStats;
}

export interface ISFaviconBuilderAddParams {
    output: string;
}

export interface ISFaviconBuilderStats {
    percentage?: number;
    bytes: number | string;
    kbytes: number | string;
    mbytes: number | string;
    gbytes: number | string;
}

export interface ISFaviconBuilderResult {
    source: ISFaviconBuilderResultItem;
    builded: ISFaviconBuilderResultItem;
    webp: ISFaviconBuilderResultItem;
    files: Record<string, ISFaviconBuilderImageResult>;
}

export default class SFaviconBuilder extends __SBuilder {
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
    constructor(settings?: Partial<ISFaviconBuilderSettings>) {
        super(__deepMerge({}, settings ?? {}));
    }

    /**
     * @name            _build
     * @type            Function
     * @private
     * @async
     *
     * This method allows you to generate all the favicon files that you need using the AMAZING `Favicons` package
     *
     * @param       {ISFaviconBuilderBuildParams}              params            The parameters to build the favicon correctly. These parameters are passed by the SBuilder class
     * @param       {Partial<ISFaviconBuilderSettings>}       [settings={}]       Some settings to override the ones passed in the constructor if needed
     * @return      {SPromise<ISFaviconBuilderResult>}        A promise resolved with the ISFaviconBuilderResult object that store all the builded files stats, etc...
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _build(
        params: ISFaviconBuilderBuildParams,
        settings?: Partial<ISFaviconBuilderSettings>,
    ): Promise<ISFaviconBuilderResult | void> {
        return new Promise(async (resolve, reject) => {
            // @ts-ignore
            params = __SFaviconBuilderBuildParamsInterface.apply(params ?? {});

            const packageJson = __packageJsonSync(process.cwd(), {
                standardize: true,
            });

            const finalSettings = <ISFaviconBuilderSettings>__deepMerge(
                {
                    path: `/${__path.relative(
                        __packageRootDir(),
                        params.outDir,
                    )}`, // Path for overriding default icons path. `string`
                    appName: packageJson.name, // Your application's name. `string`
                    appShortName: packageJson.name, // Your application's short_name. `string`. Optional. If not set, appName will be used
                    appDescription: packageJson.description, // Your application's description. `string`
                    developerName: packageJson.author?.name, // Your (or your developer's) name. `string`
                    developerURL: packageJson.author?.url, // Your (or your developer's) URL. `string`
                    dir: 'auto', // Primary text direction for name, short_name, and description
                    lang: 'en-US', // Primary language for name and short_name
                    background: '#fff', // Background colour for flattened icons. `string`
                    theme_color: '#fff', // Theme color user for example in Android's task switcher. `string`
                    appleStatusBarStyle: 'black-translucent', // Style for Apple status bar: "black-translucent", "default", "black". `string`
                    display: 'standalone', // Preferred display mode: "fullscreen", "standalone", "minimal-ui" or "browser". `string`
                    orientation: 'any', // Default orientation: "any", "natural", "portrait" or "landscape". `string`
                    scope: '/', // set of URLs that the browser considers within your app
                    start_url: '/?homescreen=1', // Start URL when launching the application from a device. `string`
                    version: '1.0', // Your application's version string. `string`
                    logging: false, // Print logs to console? `boolean`
                    pixel_art: false, // Keeps pixels "sharp" when scaling up, for pixel art.  Only supported in offline mode.
                    loadManifestWithCredentials: false, // Browsers don't send cookies when fetching a manifest, enable this to fix that. `boolean`
                    icons: {
                        // Platform Options:
                        // - offset - offset in percentage
                        // - background:
                        //   * false - use default
                        //   * true - force use default, e.g. set background for Android icons
                        //   * color - set background for the specified icons
                        //   * mask - apply mask in order to create circle icon (applied by default for firefox). `boolean`
                        //   * overlayGlow - apply glow effect after mask has been applied (applied by default for firefox). `boolean`
                        //   * overlayShadow - apply drop shadow after mask has been applied .`boolean`
                        //
                        android: true, // Create Android homescreen icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
                        appleIcon: true, // Create Apple touch icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
                        appleStartup: true, // Create Apple startup images. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
                        coast: true, // Create Opera Coast icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
                        favicons: true, // Create regular favicons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
                        firefox: true, // Create Firefox OS icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
                        windows: true, // Create Windows 8 tile icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
                        yandex: true, // Create Yandex browser icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
                    },
                },
                this.settings,
                settings ?? {},
                params.settings ?? {},
            );

            // ensure input file exists
            if (!__fs.existsSync(params.input)) {
                throw new Error(
                    `The input favicon file "<cyan>${params.input}</cyan>" does not exists...`,
                );
            }

            console.log(
                `<yellow>[build]</yellow> Start generating your favicon files...`,
            );

            // generate
            __favicons(params.input, finalSettings, (error, response) => {
                if (error) {
                    return reject(error.message);
                }

                response.images.forEach((imageObj) => {
                    console.log(
                        `<yellow>[build]</yellow> Saving file "<cyan>${__path.relative(
                            __packageRootDir(),
                            params.outDir,
                        )}/${imageObj.name}</cyan>"`,
                    );
                    __writeFileSync(
                        `${params.outDir}/${imageObj.name}`,
                        imageObj.contents,
                    );
                });

                response.files.forEach((fileObj) => {
                    console.log(
                        `<yellow>[build]</yellow> Saving file "<cyan>${__path.relative(
                            __packageRootDir(),
                            params.outDir,
                        )}/${fileObj.name}</cyan>"`,
                    );
                    __writeFileSync(
                        `${params.outDir}/${fileObj.name}`,
                        fileObj.contents,
                    );
                });

                console.log(
                    `<yellow>[build]</yellow> Saving file "<cyan>${__path.relative(
                        __packageRootDir(),
                        params.outDir,
                    )}/favicon.html</cyan>"`,
                );
                __writeFileSync(
                    `${params.outDir}/favicon.html`,
                    response.html.join('\n'),
                );

                resolve();
            });
        });
    }
}
