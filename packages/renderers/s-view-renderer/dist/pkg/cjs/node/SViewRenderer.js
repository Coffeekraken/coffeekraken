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
const dirname_1 = __importDefault(require("@coffeekraken/sugar/node/fs/dirname"));
const extension_1 = __importDefault(require("@coffeekraken/sugar/node/fs/extension"));
const writeJsonSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/writeJsonSync"));
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
const packageTmpDir_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageTmpDir"));
const unique_1 = __importDefault(require("@coffeekraken/sugar/shared/array/unique"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const uniqid_1 = __importDefault(require("@coffeekraken/sugar/shared/string/uniqid"));
const fs_1 = __importDefault(require("fs"));
const glob_1 = __importDefault(require("glob"));
const path_1 = __importDefault(require("path"));
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
        this._sharedDataFilePath = `${(0, packageTmpDir_1.default)()}/viewRenderer/sharedData-${(0, uniqid_1.default)()}.json`;
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
            path_1.default.resolve((0, packageRoot_1.default)((0, dirname_1.default)()), 'src/php/views/blade'),
            // @ts-ignore
            path_1.default.resolve((0, packageRoot_1.default)((0, dirname_1.default)()), 'src/php/views/twig'),
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
            if (path_1.default.isAbsolute(viewPath)) {
                path = viewPath;
            }
            let finalViewPath, viewType;
            if (fs_1.default.existsSync(path)) {
                finalViewPath = path;
                const fileName = path.split('/').slice(-1).join('');
                viewType = fileName.split('.').slice(1).join('.');
            }
            else {
                for (let i = 0; i < Object.keys(SViewRenderer.engines).length; i++) {
                    const engineExt = Object.keys(SViewRenderer.engines)[i];
                    if (fs_1.default.existsSync(`${path}.${engineExt}`)) {
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
                    const extension = (0, extension_1.default)(dataFilePath);
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
            (0, writeJsonSync_1.default)(this._sharedDataFilePath, sharedData);
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
            if (fs_1.default.existsSync(`${potentialDataFilePath}`)) {
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
            if (path_1.default.isAbsolute(viewDotPath)) {
                if (fs_1.default.existsSync(viewDotPath)) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvRUFBNkM7QUFFN0MsMEVBQW1EO0FBRW5ELGtFQUEyQztBQUczQyx3RUFBaUQ7QUFDakQsa0ZBQTBEO0FBQzFELGtGQUE0RDtBQUM1RCxzRkFBZ0U7QUFDaEUsOEZBQXdFO0FBQ3hFLDRGQUFzRTtBQUN0RSxnR0FBMEU7QUFDMUUscUZBQStEO0FBQy9ELDRGQUFzRTtBQUN0RSxzRkFBZ0U7QUFDaEUsNENBQXNCO0FBQ3RCLGdEQUEwQjtBQUMxQixnREFBMEI7QUFDMUIsZ0hBQTBGO0FBc0UxRixhQUFhO0FBQ2IsTUFBTSxhQUFjLFNBQVEsaUJBQVE7SUFnUGhDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBeUI7UUFDakMsb0JBQW9CO1FBQ3BCLEtBQUssQ0FDRCxJQUFBLG1CQUFXO1FBQ1AsYUFBYTtRQUNiLHdDQUFnQyxDQUFDLFFBQVEsRUFBRSxFQUMzQyxRQUFRLElBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUFVTixZQUFPLEdBQUcsS0FBSyxDQUFDO1FBUlosSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQVMsSUFBSSxDQUFDLFdBQVksQ0FBQyxXQUFXLENBQ3hELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FDL0IsQ0FBQztRQUVGLHNEQUFzRDtRQUN0RCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsR0FBRyxJQUFBLHVCQUFlLEdBQUUsNEJBQTRCLElBQUEsZ0JBQVEsR0FBRSxPQUFPLENBQUM7SUFDakcsQ0FBQztJQWpQRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsTUFBTSxLQUFLLGVBQWU7UUFDdEIsT0FBTztZQUNILEdBQUcsd0JBQWMsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUM7WUFDOUMsYUFBYTtZQUNiLGNBQU0sQ0FB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