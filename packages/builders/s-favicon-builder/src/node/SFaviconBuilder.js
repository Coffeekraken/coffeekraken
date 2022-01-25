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
import __SPromise from '@coffeekraken/s-promise';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SFaviconBuilderBuildParamsInterface from './interface/SFaviconBuilderBuildParamsInterface';
import __favicons from 'favicons';
import __fs from 'fs';
import __SLog from '@coffeekraken/s-log';
import __path from 'path';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __writeFileSync from '@coffeekraken/sugar/node/fs/writeFileSync';
import __packageSyncJson from '@coffeekraken/sugar/node/package/jsonSync';
export default class SFaviconBuilder extends __SBuilder {
    /**
     * @name            faviconBuilderSettings
     * @type            ISFaviconBuilderSettings
     * @get
     *
     * Access the favicon builder settings
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get faviconBuilderSettings() {
        return this._settings.faviconBuilder;
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
        super(__deepMerge({
            faviconBuilder: {},
        }, settings !== null && settings !== void 0 ? settings : {}));
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _build(params, settings) {
        return new __SPromise(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            // @ts-ignore
            params = __SFaviconBuilderBuildParamsInterface.apply(params !== null && params !== void 0 ? params : {});
            const packageJson = __packageSyncJson(process.cwd(), {
                standardize: true
            });
            const finalSettings = __deepMerge({
                path: `/${__path.relative(__packageRoot(), params.outDir)}`,
                appName: packageJson.name,
                appShortName: packageJson.name,
                appDescription: packageJson.description,
                developerName: (_a = packageJson.author) === null || _a === void 0 ? void 0 : _a.name,
                developerURL: (_b = packageJson.author) === null || _b === void 0 ? void 0 : _b.url,
                dir: "auto",
                lang: "en-US",
                background: "#fff",
                theme_color: "#fff",
                appleStatusBarStyle: "black-translucent",
                display: "standalone",
                orientation: "any",
                scope: "/",
                start_url: "/?homescreen=1",
                version: "1.0",
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
            }, this.faviconBuilderSettings, settings !== null && settings !== void 0 ? settings : {}, (_c = params.settings) !== null && _c !== void 0 ? _c : {});
            // ensure input file exists
            if (!__fs.existsSync(params.input)) {
                throw new Error(`The input favicon file "<cyan>${params.input}</cyan>" does not exists...`);
            }
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<yellow>[favicon]</yellow> Start generating your favicon files...`
            });
            // generate
            __favicons(params.input, finalSettings, (error, response) => {
                if (error) {
                    return reject(error.message);
                }
                response.images.forEach(imageObj => {
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>[favicon]</yellow> Saving file "<cyan>${__path.relative(__packageRoot(), params.outDir)}/${imageObj.name}</cyan>"`
                    });
                    __writeFileSync(`${params.outDir}/${imageObj.name}`, imageObj.contents);
                });
                response.files.forEach(fileObj => {
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>[favicon]</yellow> Saving file "<cyan>${__path.relative(__packageRoot(), params.outDir)}/${fileObj.name}</cyan>"`
                    });
                    __writeFileSync(`${params.outDir}/${fileObj.name}`, fileObj.contents);
                });
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[favicon]</yellow> Saving file "<cyan>${__path.relative(__packageRoot(), params.outDir)}/favicon.html</cyan>"`
                });
                __writeFileSync(`${params.outDir}/favicon.html`, response.html.join("\n"));
                resolve();
            });
        }), {
            metas: {
                id: this.constructor.name,
            },
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zhdmljb25CdWlsZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0Zhdmljb25CdWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sVUFBcUMsTUFBTSx5QkFBeUIsQ0FBQztBQUc1RSxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLHFDQUFxQyxNQUFNLGlEQUFpRCxDQUFDO0FBQ3BHLE9BQU8sVUFBVSxNQUFNLFVBQVUsQ0FBQztBQUNsQyxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxNQUFNLE1BQU0scUJBQXFCLENBQUM7QUFDekMsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sYUFBYSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3RFLE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hFLE9BQU8saUJBQWlCLE1BQU0sMkNBQTJDLENBQUM7QUFxRTFFLE1BQU0sQ0FBQyxPQUFPLE9BQU8sZUFBZ0IsU0FBUSxVQUFVO0lBQ25EOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksc0JBQXNCO1FBQ3RCLE9BQWEsSUFBSSxDQUFDLFNBQVUsQ0FBQyxjQUFjLENBQUM7SUFDaEQsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBZ0Q7UUFDeEQsS0FBSyxDQUNELFdBQVcsQ0FDUDtZQUNJLGNBQWMsRUFBRSxFQUFFO1NBQ3JCLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDSCxNQUFNLENBQ0YsTUFBbUMsRUFDbkMsUUFBNEM7UUFFNUMsT0FBTyxJQUFJLFVBQVUsQ0FDakIsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTs7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