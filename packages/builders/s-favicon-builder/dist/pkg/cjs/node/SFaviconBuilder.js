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
const fs_1 = require("@coffeekraken/sugar/fs");
const object_1 = require("@coffeekraken/sugar/object");
const package_1 = require("@coffeekraken/sugar/package");
const path_1 = require("@coffeekraken/sugar/path");
const favicons_1 = __importDefault(require("favicons"));
const fs_2 = __importDefault(require("fs"));
const path_2 = __importDefault(require("path"));
const SFaviconBuilderBuildParamsInterface_1 = __importDefault(require("./interface/SFaviconBuilderBuildParamsInterface"));
class SFaviconBuilder extends s_builder_1.default {
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
        super((0, object_1.__deepMerge)({}, settings !== null && settings !== void 0 ? settings : {}));
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
            params = SFaviconBuilderBuildParamsInterface_1.default.apply(params !== null && params !== void 0 ? params : {});
            const packageJson = (0, package_1.__packageJsonSync)(process.cwd(), {
                standardize: true,
            });
            const finalSettings = (0, object_1.__deepMerge)({
                path: `/${path_2.default.relative((0, path_1.__packageRootDir)(), params.outDir)}`,
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
            if (!fs_2.default.existsSync(params.input)) {
                throw new Error(`The input favicon file "<cyan>${params.input}</cyan>" does not exists...`);
            }
            console.log(`<yellow>[build]</yellow> Start generating your favicon files...`);
            // generate
            (0, favicons_1.default)(params.input, finalSettings, (error, response) => {
                if (error) {
                    return reject(error.message);
                }
                response.images.forEach((imageObj) => {
                    console.log(`<yellow>[build]</yellow> Saving file "<cyan>${path_2.default.relative((0, path_1.__packageRootDir)(), params.outDir)}/${imageObj.name}</cyan>"`);
                    (0, fs_1.__writeFileSync)(`${params.outDir}/${imageObj.name}`, imageObj.contents);
                });
                response.files.forEach((fileObj) => {
                    console.log(`<yellow>[build]</yellow> Saving file "<cyan>${path_2.default.relative((0, path_1.__packageRootDir)(), params.outDir)}/${fileObj.name}</cyan>"`);
                    (0, fs_1.__writeFileSync)(`${params.outDir}/${fileObj.name}`, fileObj.contents);
                });
                console.log(`<yellow>[build]</yellow> Saving file "<cyan>${path_2.default.relative((0, path_1.__packageRootDir)(), params.outDir)}/favicon.html</cyan>"`);
                (0, fs_1.__writeFileSync)(`${params.outDir}/favicon.html`, response.html.join('\n'));
                resolve();
            });
        }));
    }
}
exports.default = SFaviconBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esd0VBQWlEO0FBR2pELCtDQUF5RDtBQUN6RCx1REFBeUQ7QUFDekQseURBQWdFO0FBQ2hFLG1EQUE0RDtBQUM1RCx3REFBa0M7QUFDbEMsNENBQXNCO0FBQ3RCLGdEQUEwQjtBQUMxQiwwSEFBb0c7QUE2RXBHLE1BQXFCLGVBQWdCLFNBQVEsbUJBQVU7SUFDbkQ7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUE0QztRQUNwRCxLQUFLLENBQUMsSUFBQSxvQkFBVyxFQUFDLEVBQUUsRUFBRSxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNILE1BQU0sQ0FDRixNQUFtQyxFQUNuQyxRQUE0QztRQUU1QyxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFOztZQUN6QyxhQUFhO1lBQ2IsTUFBTSxHQUFHLDZDQUFxQyxDQUFDLEtBQUssQ0FBQyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxFQUFFLENBQUMsQ0FBQztZQUVuRSxNQUFNLFdBQVcsR0FBRyxJQUFBLDJCQUFpQixFQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDakQsV0FBVyxFQUFFLElBQUk7YUFDcEIsQ0FBQyxDQUFDO1lBRUgsTUFBTSxhQUFhLEdBQTZCLElBQUEsb0JBQVcsRUFDdkQ7Z0JBQ0ksSUFBSSxFQUFFLElBQUksY0FBTSxDQUFDLFFBQVEsQ0FDckIsSUFBQSx1QkFBZ0IsR0FBRSxFQUNsQixNQUFNLENBQUMsTUFBTSxDQUNoQixFQUFFO2dCQUNILE9BQU8sRUFBRSxXQUFXLENBQUMsSUFBSTtnQkFDekIsWUFBWSxFQUFFLFdBQVcsQ0FBQyxJQUFJO2dCQUM5Qixj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