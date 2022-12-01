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
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
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
        return new s_promise_1.default(({ resolve, reject, pipe }) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const viewInstance = new SViewRenderer((0, object_1.__deepMerge)(settings !== null && settings !== void 0 ? settings : {}));
            const finalData = (0, object_1.__deepMerge)(data !== null && data !== void 0 ? data : {}, {});
            let resPromise;
            resPromise = yield viewInstance.render(viewPath, finalData, (_a = settings === null || settings === void 0 ? void 0 : settings.viewRenderer) !== null && _a !== void 0 ? _a : {});
            pipe(resPromise);
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
        return new s_promise_1.default(({ resolve, reject, pipe }) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g;
            let finalViewPath, finalViewRelPath;
            // ensure all is loaded
            yield this._load();
            // load shared data
            yield this._loadSharedData();
            if (fs_2.default.existsSync(viewDotPath)) {
                // absolute view path
                finalViewPath = viewDotPath;
                finalViewRelPath = viewDotPath.replace(`${(0, path_1.__packageRootDir)()}/`, '');
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
            pipe(renderPromise);
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
            const resObj = Object.assign(Object.assign({}, duration.end()), { value: result.value, error: (_g = (_f = (_e = result.error) === null || _e === void 0 ? void 0 : _e.toString) === null || _f === void 0 ? void 0 : _f.call(_e)) !== null && _g !== void 0 ? _g : result.error });
            if (resObj.error) {
                reject(resObj);
            }
            else {
                resolve(resObj);
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvRUFBNkM7QUFFN0MsMEVBQW1EO0FBRW5ELHVDQUF1QztBQUN2Qyw0RkFBbUU7QUFFbkUsd0VBQWlEO0FBQ2pELGtGQUEwRDtBQUMxRCxxREFBcUQ7QUFDckQsK0NBQXlEO0FBQ3pELHVEQUF5RDtBQUN6RCxtREFBNkU7QUFDN0UsdURBQXNEO0FBQ3RELDRDQUFzQjtBQUN0QixnREFBMEI7QUFDMUIsZ0RBQTBCO0FBQzFCLGdIQUEwRjtBQXFFMUYsYUFBYTtBQUNiLE1BQU0sYUFBYyxTQUFRLGlCQUFRO0lBdUloQzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQWlDO1FBQ3pDLG9CQUFvQjtRQUNwQixLQUFLLENBQ0QsSUFBQSxvQkFBVztRQUNQLGFBQWE7UUFDYix3Q0FBZ0MsQ0FBQyxRQUFRLEVBQUUsRUFDM0MsUUFBUSxJQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO1FBVU4sWUFBTyxHQUFHLEtBQUssQ0FBQztRQTZJaEI7O1dBRUc7UUFDSCxjQUFTLEdBQUcsSUFBSSxDQUFDO1FBeEpiLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFTLElBQUksQ0FBQyxXQUFZLENBQUMsV0FBVyxDQUN4RCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQy9CLENBQUM7UUFFRixzREFBc0Q7UUFDdEQsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEdBQUcsSUFBQSxzQkFBZSxHQUFFLDRCQUE0QixJQUFBLGlCQUFRLEdBQUUsT0FBTyxDQUFDO0lBQ2pHLENBQUM7SUFwSkQ7Ozs7Ozs7Ozs7T0FVRztJQUNILE1BQU0sS0FBSyxlQUFlO1FBQ3RCLE9BQU8sd0JBQWMsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQ7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