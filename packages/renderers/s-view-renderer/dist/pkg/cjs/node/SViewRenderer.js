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
        return Object.values(s_sugar_config_1.default.get('viewRenderer.rootDirs'));
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
        // doted path
        for (let i = 0; i < this.settings.rootDirs.length; i++) {
            const rootDir = this.settings.rootDirs[i];
            const potentialViewGlob = `${rootDir}/${viewDotPath
                .split('.')
                .join('/')}.@(${handledViewsExtensions.join('|')})`;
            const matches = glob_1.default.sync(potentialViewGlob);
            if (matches && matches.length) {
                for (let j = 0; j < matches.length; j++) {
                    const potentialPath = matches[j];
                    // exclude .data files
                    if (potentialPath.match(/\.data\.[a-zA-Z0-9]+/)) {
                        continue;
                    }
                    finalViewPath = potentialPath;
                    break;
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
            var _a, _b, _c, _d;
            // ensure all is loaded
            yield this._load();
            // load shared data
            yield this._loadSharedData();
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
            console.log('VIEW', viewDotPath);
            // try to get the final view path
            const finalViewPath = this._getFinalViewPath(viewDotPath);
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
            renderPromise = rendererInstance.render(viewDotPath, Object.assign({}, data), this._sharedDataFilePath, viewRendererSettings);
            pipe(renderPromise);
            result = yield renderPromise;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvRUFBNkM7QUFFN0MsMEVBQW1EO0FBRW5ELHVDQUF1QztBQUN2Qyw0RkFBbUU7QUFFbkUsd0VBQWlEO0FBQ2pELGtGQUEwRDtBQUMxRCxxREFBcUQ7QUFDckQsK0NBQXlEO0FBQ3pELHVEQUF5RDtBQUN6RCxtREFBMkQ7QUFDM0QsdURBQXNEO0FBQ3RELDRDQUFzQjtBQUN0QixnREFBMEI7QUFDMUIsZ0RBQTBCO0FBQzFCLGdIQUEwRjtBQXVFMUYsYUFBYTtBQUNiLE1BQU0sYUFBYyxTQUFRLGlCQUFRO0lBdUloQzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQXlCO1FBQ2pDLG9CQUFvQjtRQUNwQixLQUFLLENBQ0QsSUFBQSxvQkFBVztRQUNQLGFBQWE7UUFDYix3Q0FBZ0MsQ0FBQyxRQUFRLEVBQUUsRUFDM0MsUUFBUSxJQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO1FBVU4sWUFBTyxHQUFHLEtBQUssQ0FBQztRQStHaEI7O1dBRUc7UUFDSCxjQUFTLEdBQUcsSUFBSSxDQUFDO1FBMUhiLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFTLElBQUksQ0FBQyxXQUFZLENBQUMsV0FBVyxDQUN4RCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQy9CLENBQUM7UUFFRixzREFBc0Q7UUFDdEQsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEdBQUcsSUFBQSxzQkFBZSxHQUFFLDRCQUE0QixJQUFBLGlCQUFRLEdBQUUsT0FBTyxDQUFDO0lBQ2pHLENBQUM7SUFwSkQ7Ozs7Ozs7Ozs7T0FVRztJQUNILE1BQU0sS0FBSyxlQUFlO1FBQ3RCLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyx3QkFBYyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxD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