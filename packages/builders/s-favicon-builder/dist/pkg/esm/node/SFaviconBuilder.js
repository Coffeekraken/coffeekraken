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
import { __writeFileSync } from '@coffeekraken/sugar/fs';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __packageJsonSync } from '@coffeekraken/sugar/package';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __favicons from 'favicons';
import __fs from 'fs';
import __path from 'path';
import __SFaviconBuilderBuildParamsInterface from './interface/SFaviconBuilderBuildParamsInterface';
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
    constructor(settings) {
        super(__deepMerge({}, settings !== null && settings !== void 0 ? settings : {}));
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
    _build(params, settings) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            // @ts-ignore
            params = __SFaviconBuilderBuildParamsInterface.apply(params !== null && params !== void 0 ? params : {});
            const packageJson = __packageJsonSync(process.cwd(), {
                standardize: true,
            });
            const finalSettings = __deepMerge({
                path: `/${__path.relative(__packageRootDir(), params.outDir)}`,
                appName: packageJson.name,
                appShortName: packageJson.name,
                appDescription: packageJson.description,
                developerName: (_a = packageJson.author) === null || _a === void 0 ? void 0 : _a.name,
                developerURL: (_b = packageJson.author) === null || _b === void 0 ? void 0 : _b.url,
                dir: 'auto',
                lang: 'en-US',
                background: '#fff',
                theme_color: '#fff',
                appleStatusBarStyle: 'black-translucent',
                display: 'standalone',
                orientation: 'any',
                scope: '/',
                start_url: '/?homescreen=1',
                version: '1.0',
                logging: false,
                pixel_art: false,
                loadManifestWithCredentials: false,
                manifestMaskable: true,
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
                    android: true,
                    appleIcon: true,
                    appleStartup: true,
                    coast: true,
                    favicons: true,
                    firefox: true,
                    windows: true,
                    yandex: true, // Create Yandex browser icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
                },
            }, this.settings, settings !== null && settings !== void 0 ? settings : {}, (_c = params.settings) !== null && _c !== void 0 ? _c : {});
            // ensure input file exists
            if (!__fs.existsSync(params.input)) {
                throw new Error(`The input favicon file "<cyan>${params.input}</cyan>" does not exists...`);
            }
            console.log(`<yellow>[build]</yellow> Start generating your favicon files...`);
            // generate
            __favicons(params.input, finalSettings, (error, response) => {
                if (error) {
                    return reject(error.message);
                }
                response.images.forEach((imageObj) => {
                    console.log(`<yellow>[build]</yellow> Saving file "<cyan>${__path.relative(__packageRootDir(), params.outDir)}/${imageObj.name}</cyan>"`);
                    __writeFileSync(`${params.outDir}/${imageObj.name}`, imageObj.contents);
                });
                response.files.forEach((fileObj) => {
                    console.log(`<yellow>[build]</yellow> Saving file "<cyan>${__path.relative(__packageRootDir(), params.outDir)}/${fileObj.name}</cyan>"`);
                    __writeFileSync(`${params.outDir}/${fileObj.name}`, fileObj.contents);
                });
                console.log(`<yellow>[build]</yellow> Saving file "<cyan>${__path.relative(__packageRootDir(), params.outDir)}/${params.outFileName}</cyan>"`);
                __writeFileSync(`${params.outDir}/${params.outFileName}`, response.html.join('\n'));
                resolve();
            });
        }));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBR2pELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDNUQsT0FBTyxVQUFVLE1BQU0sVUFBVSxDQUFDO0FBQ2xDLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxxQ0FBcUMsTUFBTSxpREFBaUQsQ0FBQztBQThFcEcsTUFBTSxDQUFDLE9BQU8sT0FBTyxlQUFnQixTQUFRLFVBQVU7SUFDbkQ7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUE0QztRQUNwRCxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNILE1BQU0sQ0FDRixNQUFtQyxFQUNuQyxRQUE0QztRQUU1QyxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFOztZQUN6QyxhQUFhO1lBQ2IsTUFBTSxHQUFHLHFDQUFxQyxDQUFDLEtBQUssQ0FBQyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxFQUFFLENBQUMsQ0FBQztZQUVuRSxNQUFNLFdBQVcsR0FBRyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ2pELFdBQVcsRUFBRSxJQUFJ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