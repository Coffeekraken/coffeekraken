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
import __packageSyncJson from '@coffeekraken/sugar/node/package/jsonSync';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
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
            const packageJson = __packageSyncJson(process.cwd(), {
                standardize: true,
            });
            const finalSettings = __deepMerge({
                path: `/${__path.relative(__packageRoot(), params.outDir)}`,
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
                        value: `<yellow>[build]</yellow> Saving file "<cyan>${__path.relative(__packageRoot(), params.outDir)}/${imageObj.name}</cyan>"`,
                    });
                    __writeFileSync(`${params.outDir}/${imageObj.name}`, imageObj.contents);
                });
                response.files.forEach((fileObj) => {
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>[build]</yellow> Saving file "<cyan>${__path.relative(__packageRoot(), params.outDir)}/${fileObj.name}</cyan>"`,
                    });
                    __writeFileSync(`${params.outDir}/${fileObj.name}`, fileObj.contents);
                });
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[build]</yellow> Saving file "<cyan>${__path.relative(__packageRoot(), params.outDir)}/favicon.html</cyan>"`,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBR2pELE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RCxPQUFPLGlCQUFpQixNQUFNLDJDQUEyQyxDQUFDO0FBQzFFLE9BQU8sYUFBYSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3RFLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sVUFBVSxNQUFNLFVBQVUsQ0FBQztBQUNsQyxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8scUNBQXFDLE1BQU0saURBQWlELENBQUM7QUFxRXBHLE1BQU0sQ0FBQyxPQUFPLE9BQU8sZUFBZ0IsU0FBUSxVQUFVO0lBQ25EOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBNEM7UUFDcEQsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDSCxNQUFNLENBQ0YsTUFBbUMsRUFDbkMsUUFBNEM7UUFFNUMsT0FBTyxJQUFJLFVBQVUsQ0FDakIsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTs7WUFDaEMsYUFBYTtZQUNiLE1BQU0sR0FBRyxxQ0FBcUMsQ0FBQyxLQUFLLENBQ2hELE1BQU0sYUFBTixNQUFNLGNBQU4sTUFBTSxHQUFJLEVBQUUsQ0FDZixDQUFDO1lBRUYsTUFBTSxXQUFXLEdBQUcsaUJB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