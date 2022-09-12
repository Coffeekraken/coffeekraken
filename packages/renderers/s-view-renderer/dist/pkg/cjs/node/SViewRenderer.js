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
const s_file_1 = __importDefault(require("@coffeekraken/s-file"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const fs_1 = require("@coffeekraken/sugar/fs");
const path_1 = require("@coffeekraken/sugar/path");
const unique_1 = __importDefault(require("@coffeekraken/sugar/shared/array/unique"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const uniqid_1 = __importDefault(require("@coffeekraken/sugar/shared/string/uniqid"));
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
        super((0, deepMerge_1.default)(
        // @ts-ignore
        SViewRendererSettingsInterface_1.default.defaults(), settings || {}));
        this._loaded = false;
        this.settings.rootDirs = this.constructor.getRootDirs(this.settings.rootDirs || []);
        // create a shared data file path to store shared data
        this._sharedDataFilePath = `${(0, path_1.__packageTmpDir)()}/viewRenderer/sharedData-${(0, uniqid_1.default)()}.json`;
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
        return [
            ...s_sugar_config_1.default.get('viewRenderer.rootDirs'),
            // @ts-ignore
            path_2.default.resolve((0, path_1.__packageRootDir)((0, fs_1.__dirname)()), 'src/php/views/blade'),
            // @ts-ignore
            path_2.default.resolve((0, path_1.__packageRootDir)((0, fs_1.__dirname)()), 'src/php/views/twig'),
        ];
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
        return (0, unique_1.default)([
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
            const viewInstance = new SViewRenderer((0, deepMerge_1.default)(settings !== null && settings !== void 0 ? settings : {}));
            const finalData = (0, deepMerge_1.default)(data !== null && data !== void 0 ? data : {}, {});
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
    /**
     * @name      registerDataFiles
     * @type      Function
     * @static
     *
     * This static method can be used to register some SDataFiles classes
     *
     * @param       {Class}        DataFileClass      The data file class
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static registerDataFiles(DataFileClass, extensions) {
        // register the engine under each names
        const exts = Array.isArray(extensions)
            ? extensions
            : extensions.split(',').map((l) => l.trim());
        exts.forEach((extension) => {
            if (SViewRenderer.dataFiles[extension])
                return;
            // register the engine in the stack
            SViewRenderer.dataFiles[extension] = DataFileClass;
        });
    }
    /**
     * @name					getViewMetas
     * @type 					Function
     * @static
     *
     * This static method allows you to give a "potential" view path (with or without the extension) and get
     * back an object that describe the view with infos like "type", "path", "extension", etc...
     * If nothing is found, you will get ```false``` back.
     *
     * @param       {String}      viewPath        The view path to check. Either a relative path to the @config.frontend.viewsDir configuration, or an absolute path
     * @return      {Object|Boolean}              Return an object describing the view or ```false``` if not found
     *
     * @since
     * @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static getViewMetas(viewPath) {
        const viewsDirs = s_sugar_config_1.default.get('viewRenderer.rootDirs');
        for (let i = 0; i < viewsDirs.length; i++) {
            const viewsDir = viewsDirs[i];
            let path = `${viewsDir}/${viewPath}`;
            if (path_2.default.isAbsolute(viewPath)) {
                path = viewPath;
            }
            let finalViewPath, viewType;
            if (fs_2.default.existsSync(path)) {
                finalViewPath = path;
                const fileName = path.split('/').slice(-1).join('');
                viewType = fileName.split('.').slice(1).join('.');
            }
            else {
                for (let i = 0; i < Object.keys(SViewRenderer.engines).length; i++) {
                    const engineExt = Object.keys(SViewRenderer.engines)[i];
                    if (fs_2.default.existsSync(`${path}.${engineExt}`)) {
                        finalViewPath = `${path}.${engineExt}`;
                        viewType = engineExt;
                        break;
                    }
                }
            }
            // check if we have a view founded
            if (!finalViewPath)
                continue;
            // build the info object
            const infoObj = s_file_1.default.new(finalViewPath);
            // return the infos
            return infoObj.toObject();
        }
        return undefined;
    }
    _load() {
        var _a;
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
            const defaultDataHandlers = s_sugar_config_1.default.get('viewRenderer.dataFiles') || [];
            for (let i = 0; i < defaultDataHandlers.length; i++) {
                const path = defaultDataHandlers[i];
                // @ts-ignore
                const { default: DataFileClass } = yield Promise.resolve().then(() => __importStar(require(path)));
                DataFileClass.extensions.forEach((ext) => {
                    SViewRenderer.registerDataFiles(DataFileClass, ext);
                });
            }
            // track the shared data
            let sharedData = (_a = this.settings.sharedData) !== null && _a !== void 0 ? _a : {};
            // shared data
            if (this.settings.sharedDataFiles) {
                for (let i = 0; i < this.settings.sharedDataFiles.length; i++) {
                    const dataFilePath = this.settings.sharedDataFiles[i];
                    const extension = (0, fs_1.__extension)(dataFilePath);
                    if (!SViewRenderer.dataFiles[extension]) {
                        throw new Error(`<red>[render]</red> The extension "${extension}" is not registered as a data file handler`);
                    }
                    const sharedDataFiles = yield SViewRenderer.dataFiles[extension].load(dataFilePath);
                    if (sharedDataFiles) {
                        sharedData = (0, deepMerge_1.default)(sharedData, sharedDataFiles);
                    }
                }
            }
            // save the shared data
            this._sharedData = sharedData;
            // save the shared data on the disk
            (0, fs_1.__writeJsonSync)(this._sharedDataFilePath, sharedData);
            this._loaded = true;
        });
    }
    _getRendererEngineClassForView(viewPath) {
        // try to get an engine for this view
        for (let i = 0; i < Object.keys(SViewRenderer.engines).length; i++) {
            const engineExt = Object.keys(SViewRenderer.engines)[i];
            const reg = new RegExp(`${engineExt}$`);
            if (reg.test(viewPath)) {
                // this._viewExt = engineExt;
                return SViewRenderer.engines[engineExt];
                break;
            }
        }
    }
    _getDataFileClassForView(viewPath) {
        // loop on each dataFiles available
        for (let [dataFileExt, DataFileClass] of Object.entries(SViewRenderer.dataFiles)) {
            let potentialDataFilePath = viewPath;
            for (let [key, engineObj] of Object.entries(SViewRenderer.engines)) {
                // @ts-ignore
                engineObj.extensions.forEach((ext) => {
                    const reg = new RegExp(`.${ext}$`);
                    potentialDataFilePath = potentialDataFilePath.replace(reg, '');
                });
            }
            // add extension
            potentialDataFilePath += `.data.${dataFileExt}`;
            // check if exists and return if true
            if (fs_2.default.existsSync(`${potentialDataFilePath}`)) {
                return {
                    dataFilePath: `${potentialDataFilePath}`,
                    DataFileClass,
                };
            }
        }
    }
    _getFinalViewPath(viewDotPath) {
        let finalViewPath;
        const handledViewsExtensions = Object.keys(SViewRenderer.engines);
        // remove all the engines extensions from the viewPath
        Object.keys(SViewRenderer.engines).forEach((ext) => {
            viewDotPath = viewDotPath.replace(`.${ext}`, '');
        });
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
            else if (!viewDotPath.match(/\//gm)) {
                // doted path
                for (let i = 0; i < this.settings.rootDirs.length; i++) {
                    const rootDir = this.settings.rootDirs[i];
                    const potentialViewPath = `${rootDir}/${viewDotPath
                        .split('.')
                        .join('/')}.!(data)@(${handledViewsExtensions.join('|')})`;
                    const matches = glob_1.default.sync(potentialViewPath);
                    if (matches && matches.length) {
                        finalViewPath = matches[0];
                        break;
                    }
                }
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
    /**
     * @name          render
     * @type          Function
     * @async
     *
     * Main method to render your view by passing it an object of data to use as well as an object of settings to override the default passed onces
     *
     * @param       {String}        viewDotPath        The dotPath of the view you want to render
     * @param       {Object}        [data={}]       An object of data to use to render the view.
     * @param       {Object}        [settings={}]     An object of settings that will be passed to the render engine method to use to override the default onces passed in the constructor. Check the used engine render documentation
     * @return      {SPromise}                    An SPromise instance that will be resolved once the rendering process has correctly finished
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    render(viewDotPath, data = {}, settings) {
        return new s_promise_1.default(({ resolve, reject, pipe }) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            // ensure all is loaded
            yield this._load();
            // get the final view path
            const finalViewPath = this._getFinalViewPath(viewDotPath);
            if (!finalViewPath) {
                throw new Error(`<red>[render]</red> The passed viewDotPath "${viewDotPath}" does not exists...`);
            }
            // get the view renderer engine class for the passed view
            const RendererEngineClass = this._getRendererEngineClassForView(finalViewPath);
            if (!RendererEngineClass) {
                throw new Error(`<red>[render]</red> No engine is registered for your dotPath "${viewDotPath}"...`);
            }
            // data file class and path
            const dataFileClassAndPath = this._getDataFileClassForView(finalViewPath);
            const viewRendererSettings = Object.assign({}, ((0, deepMerge_1.default)(this.settings, settings || {})));
            const duration = new s_duration_1.default();
            if (dataFileClassAndPath) {
                const gettedData = yield dataFileClassAndPath.DataFileClass.load(dataFileClassAndPath.dataFilePath);
                if (gettedData)
                    data = (0, deepMerge_1.default)(gettedData, data);
            }
            const engineSettings = (0, deepMerge_1.default)((_b = (_a = RendererEngineClass.interface) === null || _a === void 0 ? void 0 : _a.defaults()) !== null && _b !== void 0 ? _b : {}, (_c = viewRendererSettings.enginesSettings[RendererEngineClass.id]) !== null && _c !== void 0 ? _c : {});
            const rendererInstance = new RendererEngineClass(engineSettings);
            let renderPromise, result, error;
            renderPromise = rendererInstance.render(finalViewPath, Object.assign({}, data), this._sharedDataFilePath, viewRendererSettings);
            pipe(renderPromise);
            result = yield renderPromise;
            // resolve the render process
            const resObj = Object.assign(Object.assign({ 
                // engine: this._engineInstance.engineMetas,
                view: SViewRenderer.getViewMetas(finalViewPath) }, duration.end()), { value: result.value, error: result.error });
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
/**
 * @name       dataFiles
 * @type      Object
 * @static
 *
 * Store the registered dataFiles using the ```registerDataFiles``` static method
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
SViewRenderer.dataFiles = {};
exports.default = SViewRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvRUFBNkM7QUFFN0MsMEVBQW1EO0FBRW5ELGtFQUEyQztBQUczQyx3RUFBaUQ7QUFDakQsa0ZBQTBEO0FBQzFELCtDQUlnQztBQUNoQyxtREFBNkU7QUFDN0UscUZBQStEO0FBQy9ELDRGQUFzRTtBQUN0RSxzRkFBZ0U7QUFDaEUsNENBQXNCO0FBQ3RCLGdEQUEwQjtBQUMxQixnREFBMEI7QUFDMUIsZ0hBQTBGO0FBc0UxRixhQUFhO0FBQ2IsTUFBTSxhQUFjLFNBQVEsaUJBQVE7SUFtUGhDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBeUI7UUFDakMsb0JBQW9CO1FBQ3BCLEtBQUssQ0FDRCxJQUFBLG1CQUFXO1FBQ1AsYUFBYTtRQUNiLHdDQUFnQyxDQUFDLFFBQVEsRUFBRSxFQUMzQyxRQUFRLElBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUFVTixZQUFPLEdBQUcsS0FBSyxDQUFDO1FBUlosSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQVMsSUFBSSxDQUFDLFdBQVksQ0FBQyxXQUFXLENBQ3hELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FDL0IsQ0FBQztRQUVGLHNEQUFzRDtRQUN0RCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsR0FBRyxJQUFBLHNCQUFlLEdBQUUsNEJBQTRCLElBQUEsZ0JBQVEsR0FBRSxPQUFPLENBQUM7SUFDakcsQ0FBQztJQXBQRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsTUFBTSxLQUFLLGVBQWU7UUFDdEIsT0FBTztZQUNILEdBQUcsd0JBQWMsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUM7WUFDOUMsYUFBYTtZQUNiLGNBQU0sQ0FBQyxPQUFPLENBQ1YsSUFBQSx1QkFBZ0IsRUFBQyxJQUFBLGNBQVMs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