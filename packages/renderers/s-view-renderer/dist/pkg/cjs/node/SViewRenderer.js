"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const s_duration_1 = __importDefault(require("@coffeekraken/s-duration"));
// import __page404 from './pages/404';
const s_data_file_generic_1 = __importDefault(require("@coffeekraken/s-data-file-generic"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const array_1 = require("@coffeekraken/sugar/array");
const fs_1 = require("@coffeekraken/sugar/fs");
const object_1 = require("@coffeekraken/sugar/object");
const path_1 = require("@coffeekraken/sugar/path");
const string_1 = require("@coffeekraken/sugar/string");
const fs_2 = __importDefault(require("fs"));
const glob_1 = __importDefault(require("glob"));
const path_2 = __importDefault(require("path"));
const SViewRendererSettingsInterface_1 = __importDefault(require("./interface/SViewRendererSettingsInterface"));
// @ts-ignore
class SViewRenderer extends s_class_1.default {
    /**
     * @name      constructor
     * @type      Function
     * @constructor
     *
     * Constructor
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings) {
        // save the settings
        super((0, object_1.__deepMerge)(
        // @ts-ignore
        SViewRendererSettingsInterface_1.default.defaults(), settings || {}));
        this._loaded = false;
        /**
         * Load the shared data if exists
         */
        this._needLoad = true;
        this.settings.rootDirs = this.constructor.getRootDirs(this.settings.rootDirs || []);
        // create a shared data file path to store shared data
        this._sharedDataFilePath = `${(0, path_1.__packageTmpDir)()}/viewRenderer/sharedData-${(0, string_1.__uniqid)()}.json`;
    }
    /**
     * @name      defaultRootDirs
     * @type      Array
     * @static
     *
     * This static property store the default root directories where the class
     * will search for views to render
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static get defaultRootDirs() {
        return s_sugar_config_1.default.get('viewRenderer.rootDirs');
    }
    /**
     * @name      getRootDirs
     * @type      Function
     * @static
     *
     * This function accept an array of root directories
     * and return the final array with the default root directories
     * added correctly
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static getRootDirs(rootDirs = []) {
        return (0, array_1.__unique)([
            ...(Array.isArray(rootDirs) ? rootDirs : [rootDirs]),
            ...SViewRenderer.defaultRootDirs,
        ]);
    }
    /**
     * @name      render
     * @type      Function
     * @static
     *
     * This static method allows you to render quickly a passed view
     *
     * @param     {String}    viewPath      The doted view path relative to the views.rootDir config
     * @param     {Any}         [data=null
     *
     * @since       2.0.0
     */
    static render(viewPath, data = null, settings) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const viewInstance = new SViewRenderer((0, object_1.__deepMerge)(settings !== null && settings !== void 0 ? settings : {}));
            const finalData = (0, object_1.__deepMerge)(data !== null && data !== void 0 ? data : {}, {});
            const result = yield viewInstance.render(viewPath, finalData, (_a = settings === null || settings === void 0 ? void 0 : settings.viewRenderer) !== null && _a !== void 0 ? _a : {});
            resolve(result);
        }));
    }
    /**
     * @name      registerEngine
     * @type      Function
     * @static
     *
     * This static method can be used to register a compatible __SViewEngine engine class
     * into the available SViews engines.
     *
     * @param       {Class}        EngineClass      The class of the engine
     * @param       {String}        extension       The file extension to detect the engine. For example "blade.php" will be used to render all the files names "%name.blade.php"
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static registerEngine(EngineClass, extensions) {
        // register the engine under each names
        const exts = Array.isArray(extensions)
            ? extensions
            : extensions === null || extensions === void 0 ? void 0 : extensions.split(',').map((l) => l.trim());
        exts === null || exts === void 0 ? void 0 : exts.forEach((ext) => {
            if (SViewRenderer.engines[ext])
                return;
            // register the engine in the stack
            SViewRenderer.engines[ext] = EngineClass;
        });
    }
    _load() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._loaded)
                return;
            const defaultEngines = s_sugar_config_1.default.get('viewRenderer.engines') || [];
            for (let i = 0; i < defaultEngines.length; i++) {
                const path = defaultEngines[i];
                // @ts-ignore
                const { default: EngineClass } = yield Promise.resolve().then(() => __importStar(require(path)));
                EngineClass.extensions.forEach((ext) => {
                    SViewRenderer.registerEngine(EngineClass, ext);
                });
            }
            this._loaded = true;
        });
    }
    /**
     * Try to get the render engine class from the finalViewPath.
     */
    _getRendererEngineClassFromFinalViewPath(finalViewPath) {
        // try to get an engine for this view
        for (let i = 0; i < Object.keys(SViewRenderer.engines).length; i++) {
            const engineExt = Object.keys(SViewRenderer.engines)[i];
            const reg = new RegExp(`${engineExt}$`);
            if (reg.test(finalViewPath)) {
                // this._viewExt = engineExt;
                return SViewRenderer.engines[engineExt];
                break;
            }
        }
    }
    /**
     * Get the render engine class from the engine id
     */
    _getRendererEngineClassFromEngineId(engineId) {
        // try to get an engine for this view
        for (let [ext, EngineClass] of Object.entries(SViewRenderer.engines)) {
            if (EngineClass.id === engineId) {
                return EngineClass;
            }
        }
    }
    _getFinalViewPath(viewDotPath) {
        let finalViewPath;
        const handledViewsExtensions = Object.keys(SViewRenderer.engines);
        // direct view path
        if (fs_2.default.existsSync(viewDotPath)) {
            return viewDotPath;
        }
        // direct from the rootDirs
        for (let i = 0; i < this.settings.rootDirs.length; i++) {
            const rootDir = this.settings.rootDirs[i];
            if (fs_2.default.existsSync(`${rootDir}/${viewDotPath}`)) {
                return `${rootDir}/${viewDotPath}`;
            }
        }
        // doted path
        for (let i = 0; i < this.settings.rootDirs.length; i++) {
            const rootDir = this.settings.rootDirs[i], viewName = viewDotPath.split('.').slice(-1)[0], viewPath = viewDotPath.replace(/\./gm, '/'), globPart = `@(${handledViewsExtensions.join('|')})`;
            const potentialViewGlob1 = `${rootDir}/${viewPath}.${globPart}`, potentialViewGlob2 = `${rootDir}/${viewPath}/${viewName}.${globPart}`;
            let potentialPath;
            let matches = glob_1.default.sync(potentialViewGlob1);
            if (matches && matches.length) {
                for (let j = 0; j < matches.length; j++) {
                    potentialPath = matches[j];
                    // exclude .data files
                    if (potentialPath.match(/\.data\.[a-zA-Z0-9]+/)) {
                        continue;
                    }
                    finalViewPath = potentialPath;
                    break;
                }
            }
            else {
                // try to add the name of the view again like
                // if it is stored in a folder with the same name
                // retry again with new glob string
                matches = glob_1.default.sync(potentialViewGlob2);
                if (matches && matches.length) {
                    for (let j = 0; j < matches.length; j++) {
                        potentialPath = matches[j];
                        // exclude .data files
                        if (potentialPath.match(/\.data\.[a-zA-Z0-9]+/)) {
                            continue;
                        }
                        finalViewPath = potentialPath;
                        break;
                    }
                }
            }
            // @ts-ignore
            if (finalViewPath) {
                break;
            }
        }
        // // remove all the engines extensions from the viewPath
        // Object.keys(SViewRenderer.engines).forEach((ext) => {
        //     viewDotPath = viewDotPath.replace(`.${ext}`, '');
        // });
        // detect and save the view doted path or the view template string
        if (viewDotPath.split(' ').length === 1 &&
            viewDotPath.trim() === viewDotPath) {
            // check if we can find the view path passed
            if (path_2.default.isAbsolute(viewDotPath)) {
                if (fs_2.default.existsSync(viewDotPath)) {
                    // throw new Error(
                    //   `Sorry but the absolute path to the view "<cyan>${viewDotPath}</cyan>" does not exist...`
                    // );
                    finalViewPath = viewDotPath;
                }
            }
            else {
            }
        }
        else {
            // throw new Error(
            //   `<red>[SView]</red> It seems that the passed viewPath "<yellow>${viewPath}</yellow>" argument is not a valid path`
            // );
        }
        // @ts-ignore
        return finalViewPath;
    }
    _loadSharedData() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            // quick and dirty thottle
            if (!this._needLoad) {
                return;
            }
            this._needLoad = false;
            setTimeout(() => {
                this._needLoad = true;
            }, 1000);
            // track the shared data
            let sharedData = (_a = this.settings.sharedData) !== null && _a !== void 0 ? _a : {};
            // shared data
            if (this.settings.sharedDataFiles) {
                for (let i = 0; i < this.settings.sharedDataFiles.length; i++) {
                    const dataFilePath = this.settings.sharedDataFiles[i];
                    sharedData = (0, object_1.__deepMerge)(sharedData, yield s_data_file_generic_1.default.load(dataFilePath));
                }
            }
            // save the shared data
            this._sharedData = sharedData;
            // save the shared data on the disk
            (0, fs_1.__writeJsonSync)(this._sharedDataFilePath, sharedData);
        });
    }
    /**
     * @name          render
     * @type          Function
     * @async
     *
     * Main method to render your view by passing it an object of data to use as well as an object of settings to override the default passed onces
     *
     * @param       {String}        viewDotPath        The dotPath of the view you want to render
     * @param       {String|Object|Promise<Object>}        [data={}]       An object of data to use to render the view. If is a string, use the SDataGeneric class to resolve the data
     * @param       {Object}        [settings={}]     An object of settings that will be passed to the render engine method to use to override the default onces passed in the constructor. Check the used engine render documentation
     * @return      {SPromise}                    An SPromise instance that will be resolved once the rendering process has correctly finished
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    render(viewDotPath, data = {}, settings) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            let finalViewPath, finalViewRelPath;
            // ensure all is loaded
            yield this._load();
            // load shared data
            yield this._loadSharedData();
            if (fs_2.default.existsSync(viewDotPath)) {
                // absolute view path
                finalViewPath = viewDotPath;
                finalViewRelPath = path_2.default.basename(viewDotPath);
                // finalViewRelPath = viewDotPath.replace(
                //     `${__packageRootDir()}/`,
                //     '',
                // );
                // add a rootDir to handle absolute path
                this.settings.rootDirs.unshift(path_2.default.dirname(viewDotPath));
            }
            // ensure viewDotPath is a dotPath and not something line path/my/view.twig
            viewDotPath = viewDotPath
                .replace(/\.(twig|blade.php|hbs|php|tpl|volt)$/, '')
                .replace(/\//gm, '.');
            // get the final settings
            const viewRendererSettings = Object.assign({}, ((0, object_1.__deepMerge)(this.settings, settings || {})));
            let RendererEngineClass, engine = viewRendererSettings.defaultEngine;
            if (viewDotPath.match(/^[a-z]+\:\/\//)) {
                const parts = viewDotPath.split('://');
                // @ts-ignore
                engine = parts[0];
                viewDotPath = parts[1];
            }
            // try to get the final view path
            if (!finalViewPath) {
                finalViewPath = this._getFinalViewPath(viewDotPath);
            }
            if (!fs_2.default.existsSync(finalViewPath)) {
                return reject(`It seems that the view you passed "<cyan>${finalViewPath}</cyan>" does not exists...`);
            }
            // make sure the view has been found
            if (!finalViewPath) {
                throw new Error(`<red>[SViewRenderer]</red> Sorry but the requested view "<cyan>${viewDotPath}</cyan>" does not exists in any of these folders:\n${this.settings.rootDirs
                    .map((dir) => `- <cyan>${dir}</cyan>`)
                    .join('\n')}`);
            }
            // get the view renderer engine class for the passed view
            // try to get the engine class from the final view part
            if (finalViewPath && !RendererEngineClass) {
                RendererEngineClass =
                    this._getRendererEngineClassFromFinalViewPath(finalViewPath);
            }
            // if we don't have any RenderClass yet, get it from the passed engine of the default engine
            if (!RendererEngineClass) {
                RendererEngineClass =
                    this._getRendererEngineClassFromEngineId(engine);
            }
            if (!RendererEngineClass) {
                throw new Error(`<red>[render]</red> No engine is registered for your dotPath "${viewDotPath}"...`);
            }
            // use the generic data file class to load the data
            // if the passed data is a string
            if (typeof data === 'string') {
                data = yield s_data_file_generic_1.default.load(data);
            }
            else {
                // resolve data if is a promise
                data = yield data;
            }
            // load the .data.... view neighbour file
            data = (0, object_1.__deepMerge)((_a = (yield s_data_file_generic_1.default.load(finalViewPath))) !== null && _a !== void 0 ? _a : {}, data !== null && data !== void 0 ? data : {});
            const duration = new s_duration_1.default();
            const engineSettings = (0, object_1.__deepMerge)((_c = (_b = RendererEngineClass.interface) === null || _b === void 0 ? void 0 : _b.defaults()) !== null && _c !== void 0 ? _c : {}, (_d = viewRendererSettings.enginesSettings[RendererEngineClass.id]) !== null && _d !== void 0 ? _d : {});
            const rendererInstance = new RendererEngineClass(engineSettings);
            let renderPromise, result, error;
            renderPromise = rendererInstance.render(finalViewRelPath !== null && finalViewRelPath !== void 0 ? finalViewRelPath : viewDotPath, Object.assign({}, data), this._sharedDataFilePath, viewRendererSettings);
            result = yield renderPromise;
            // stringify js errors
            if (result.error && result.error instanceof Error) {
                result.error = [
                    result.error.toString(),
                    ' ',
                    result.error.stack,
                ].join('\n');
            }
            // resolve the render process
            const resObj = Object.assign(Object.assign({}, duration.end()), { value: result.value, error: result.error });
            resolve(resObj);
        }));
    }
}
/**
 * @name       engines
 * @type      Object
 * @static
 *
 * Store the registered engines using the ```registerEngine``` static method
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
SViewRenderer.engines = {};
exports.default = SViewRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvRUFBNkM7QUFFN0MsMEVBQW1EO0FBRW5ELHVDQUF1QztBQUN2Qyw0RkFBbUU7QUFFbkUsa0ZBQTBEO0FBQzFELHFEQUFxRDtBQUNyRCwrQ0FBeUQ7QUFDekQsdURBQXlEO0FBQ3pELG1EQUEyRDtBQUMzRCx1REFBc0Q7QUFDdEQsNENBQXNCO0FBQ3RCLGdEQUEwQjtBQUMxQixnREFBMEI7QUFDMUIsZ0hBQTBGO0FBc0UxRixhQUFhO0FBQ2IsTUFBTSxhQUFjLFNBQVEsaUJBQVE7SUFxSWhDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBaUM7UUFDekMsb0JBQW9CO1FBQ3BCLEtBQUssQ0FDRCxJQUFBLG9CQUFXO1FBQ1AsYUFBYTtRQUNiLHdDQUFnQyxDQUFDLFFBQVEsRUFBRSxFQUMzQyxRQUFRLElBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUFVTixZQUFPLEdBQUcsS0FBSyxDQUFDO1FBNkloQjs7V0FFRztRQUNILGNBQVMsR0FBRyxJQUFJLENBQUM7UUF4SmIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQVMsSUFBSSxDQUFDLFdBQVksQ0FBQyxXQUFXLENBQ3hELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FDL0IsQ0FBQztRQUVGLHNEQUFzRDtRQUN0RCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsR0FBRyxJQUFBLHNCQUFlLEdBQUUsNEJBQTRCLElBQUEsaUJBQVEsR0FBRSxPQUFPLENBQUM7SUFDakcsQ0FBQztJQWxKRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsTUFBTSxLQUFLLGVBQWU7UUFDdEIsT0FBTyx3QkFBYyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FX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