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
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import { __writeFileSync } from '@coffeekraken/sugar/fs';
import { __packageJsonSync } from '@coffeekraken/sugar/package';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
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
        return new __SPromise(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
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
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<yellow>[build]</yellow> Start generating your favicon files...`,
            });
            // generate
            __favicons(params.input, finalSettings, (error, response) => {
                if (error) {
                    return reject(error.message);
                }
                response.images.forEach((imageObj) => {
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>[build]</yellow> Saving file "<cyan>${__path.relative(__packageRootDir(), params.outDir)}/${imageObj.name}</cyan>"`,
                    });
                    __writeFileSync(`${params.outDir}/${imageObj.name}`, imageObj.contents);
                });
                response.files.forEach((fileObj) => {
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>[build]</yellow> Saving file "<cyan>${__path.relative(__packageRootDir(), params.outDir)}/${fileObj.name}</cyan>"`,
                    });
                    __writeFileSync(`${params.outDir}/${fileObj.name}`, fileObj.contents);
                });
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[build]</yellow> Saving file "<cyan>${__path.relative(__packageRootDir(), params.outDir)}/favicon.html</cyan>"`,
                });
                __writeFileSync(`${params.outDir}/favicon.html`, response.html.join('\n'));
                resolve();
            });
        }), {
            metas: {
                id: this.constructor.name,
            },
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBR2pELE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLFVBQVUsTUFBTSxVQUFVLENBQUM7QUFDbEMsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLHFDQUFxQyxNQUFNLGlEQUFpRCxDQUFDO0FBcUVwRyxNQUFNLENBQUMsT0FBTyxPQUFPLGVBQWdCLFNBQVEsVUFBVTtJQUNuRDs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQTRDO1FBQ3BELEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsTUFBTSxDQUNGLE1BQW1DLEVBQ25DLFFBQTRDO1FBRTVDLE9BQU8sSUFBSSxVQUFVLENBQ2pCLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7O1lBQ2hDLGFBQWE7WUFDYixNQUFNLEdBQUcscUNBQXFDLENBQUMsS0FBSyxDQUNoRCxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxFQUFFLENBQ2YsQ0FBQztZ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