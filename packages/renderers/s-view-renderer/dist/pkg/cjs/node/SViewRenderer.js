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
            let resPromise;
            resPromise = yield viewInstance.render(viewPath, data, (_a = settings === null || settings === void 0 ? void 0 : settings.viewRenderer) !== null && _a !== void 0 ? _a : {});
            pipe(resPromise);
            // resPromise.catch(async (e) => {
            //     console.log('SOMEHTING', 'va');
            //     const errorViewInstance = new SViewRenderer({
            //         ...settings,
            //     });
            //     console.log('ERROR', e);
            //     const errorRes = await pipe(
            //         errorViewInstance.render(
            //             'pages.501',
            //             {
            //                 ...data,
            //                 error: e,
            //             },
            //             settings?.viewRenderer ?? {},
            //         ),
            //     );
            //     errorRes.status = 501;
            //     console.log('E', errorRes);
            //     reject(errorRes);
            // });
            // resPromise.then((res) => {
            //     res.status = 200;
            //     console.log('RES', res);
            //     resolve(res);
            // });
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
                        .join('/')}.!(data)*`;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvRUFBNkM7QUFFN0MsMEVBQW1EO0FBRW5ELGtFQUEyQztBQUczQyx3RUFBaUQ7QUFDakQsa0ZBQTBEO0FBQzFELGtGQUE0RDtBQUM1RCxzRkFBZ0U7QUFDaEUsOEZBQXdFO0FBQ3hFLDRGQUFzRTtBQUN0RSxnR0FBMEU7QUFDMUUscUZBQStEO0FBQy9ELDRGQUFzRTtBQUN0RSxzRkFBZ0U7QUFDaEUsNENBQXNCO0FBQ3RCLGdEQUEwQjtBQUMxQixnREFBMEI7QUFDMUIsZ0hBQTBGO0FBc0UxRixhQUFhO0FBQ2IsTUFBTSxhQUFjLFNBQVEsaUJBQVE7SUEwUWhDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBeUI7UUFDakMsb0JBQW9CO1FBQ3BCLEtBQUssQ0FDRCxJQUFBLG1CQUFXO1FBQ1AsYUFBYTtRQUNiLHdDQUFnQyxDQUFDLFFBQVEsRUFBRSxFQUMzQyxRQUFRLElBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUFVTixZQUFPLEdBQUcsS0FBSyxDQUFDO1FBUlosSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQVMsSUFBSSxDQUFDLFdBQVksQ0FBQyxXQUFXLENBQ3hELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FDL0IsQ0FBQztRQUVGLHNEQUFzRDtRQUN0RCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsR0FBRyxJQUFBLHVCQUFlLEdBQUUsNEJBQTRCLElBQUEsZ0JBQVEsR0FBRSxPQUFPLENBQUM7SUFDakcsQ0FBQztJQTNRRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsTUFBTSxLQUFLLGVBQWU7UUFDdEIsT0FBTztZQUNILEdBQUcsd0JBQWMsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUM7WUFDOUMsYUFBYTtZQUNiLGNBQU0sQ0FBQyxPQUFPLENBQUMsSUFBQSxxQkFBYSxFQUFDLElBQUEsaUJBQVMsR0FBRSxDQUFDLEVBQUUscUJBQXFCLENBQUM7U0FDcEUsQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBUSxHQUFHLEVBQUU7UUFDNUIsT0FBTyxJQUFBLGdCQUFRLEVBQUM7WUFDWixHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3BELEdBQUcsYUFBYSxDQUFDLGVBQWU7U0FDbkMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsTUFBTSxDQUFDLE1BQU0sQ0FDVCxRQUFnQixFQUNoQixPQUFZLElBQUksRUFDaEIsUUFBaUM7UUFFakMsT0FBTyxJQUFJLG1CQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTs7WUFDdEQsTUFBTSxZQUFZLEdBQUcsSUFBSSxhQUFhLENBQUMsSUFBQSxtQkFBVyxFQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFcEUsSUFBSSxVQUFVLENBQUM7WUFFZixVQUFVLEdBQUcsTUFBTSxZQUFZLENBQUMsTUFBTSxDQUNsQyxRQUFRLEVBQ1IsSUFBSSxFQUNKLE1BQUEsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLFlBQVksbUNBQUksRUFBRSxDQUMvQixDQUFDO1lBRUYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRWpCLGtDQUFrQztZQUNsQyxzQ0FBc0M7WUFFdEMsb0RBQW9EO1lBQ3BELHVCQUF1QjtZQUN2QixVQUFVO1lBRVYsK0JBQStCO1lBRS9CLG1DQUFtQztZQUNuQyxvQ0FBb0M7WUFDcEMsMkJBQTJCO1lBQzNCLGdCQUFnQjtZQUNoQiwyQkFBMkI7WUFDM0IsNEJBQTRCO1lBQzVCLGlCQUFpQjtZQUNqQiw0Q0FBNEM7WUFDNUMsYUFBYTtZQUNiLFNBQVM7WUFDVCw2QkFBNkI7WUFDN0Isa0NBQWtDO1lBQ2xDLHdCQUF3QjtZQUN4QixNQUFNO1lBRU4sNkJBQTZCO1lBQzdCLHdCQUF3QjtZQUN4QiwrQkFBK0I7WUFDL0Isb0JBQW9CO1lBQ3BCLE1BQU07UUFDVixDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCxNQUFNLENBQUMsY0FBYyxDQUNqQixXQUFtQixFQUNuQixVQUE4QjtRQUU5Qix1Q0FBdUM7UUFDdkMsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7WUFDbEMsQ0FBQyxDQUFDLFVBQVU7WUFDWixDQUFDLENBQUMsVUFBVSxhQUFWLFVBQVUsdUJBQVYsVUFBVSxDQUFFLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNsRCxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDbEIsSUFBSSxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztnQkFBRSxPQUFPO1lBRXZDLG1DQUFtQztZQUNuQyxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFdBQVcsQ0FBQztRQUM3QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILE1BQU0sQ0FBQyxpQkFBaUIsQ0FDcEIsYUFBcUIsRUFDckIsVUFBNkI7UUFFN0IsdUNBQXVDO1FBQ3ZDLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDO1lBQ2xDLENBQUMsQ0FBQyxVQUFVO1lBQ1osQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDdkIsSUFBSSxhQUFhLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQztnQkFBRSxPQUFPO1lBQy9DLG1DQUFtQztZQUNuQyxhQUFhLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLGFBQWEsQ0FBQztRQUN2RCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNILE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBZ0I7UUFDaEMsTUFBTSxTQUFTLEdBQUcsd0JBQWMsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUU5RCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN2QyxNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFOUIsSUFBSSxJQUFJLEdBQUcsR0FBRyxRQUFRLElBQUksUUFBUSxFQUFFLENBQUM7WUFDckMsSUFBSSxjQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUM3QixJQUFJLEdBQUcsUUFBUSxDQUFDO2FBQ25CO1lBRUQsSUFBSSxhQUFhLEVBQUUsUUFBUSxDQUFDO1lBRTVCLElBQUksWUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDdkIsYUFBYSxHQUFHLElBQUksQ0FBQztnQkFDckIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3BELFFBQVEsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDckQ7aUJBQU07Z0JBQ0gsS0FDSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQ1QsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFDN0MsQ0FBQyxFQUFFLEVBQ0w7b0JBQ0UsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3hELElBQUksWUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksSUFBSSxTQUFTLEVBQUUsQ0FBQyxFQUFFO3dCQUN6QyxhQUFhLEdBQUcsR0FBRyxJQUFJLElBQUksU0FBUyxFQUFFLENBQUM7d0JBQ3ZDLFFBQVEsR0FBRyxTQUFTLENBQUM7d0JBQ3JCLE1BQU07cUJBQ1Q7aUJBQ0o7YUFDSjtZQUVELGtDQUFrQztZQUNsQyxJQUFJLENBQUMsYUFBYTtnQkFBRSxTQUFTO1lBRTdCLHdCQUF3QjtZQUN4QixNQUFNLE9BQU8sR0FBRyxnQkFBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUUzQyxtQkFBbUI7WUFDbkIsT0FBTyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDN0I7UUFFRCxPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBdURLLEtBQUs7OztZQUNQLElBQUksSUFBSSxDQUFDLE9BQU87Z0JBQUUsT0FBTztZQUN6QixNQUFNLGNBQWMsR0FBRyx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN4RSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDNUMsTUFBTSxJQUFJLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixhQUFhO2dCQUNiLE1BQU0sRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLEdBQUcsd0RBQWEsSUFBSSxHQUFDLENBQUM7Z0JBQ3BELFdBQVcsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7b0JBQ25DLGFBQWEsQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUNuRCxDQUFDLENBQUMsQ0FBQzthQUNOO1lBRUQsTUFBTSxtQkFBbUIsR0FDckIsd0JBQWMsQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDdkQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDakQsTUFBTSxJQUFJLEdBQUcsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BDLGFBQWE7Z0JBQ2IsTUFBTSxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsR0FBRyx3REFBYSxJQUFJLEdBQUMsQ0FBQztnQkFDdEQsYUFBYSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtvQkFDckMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDeEQsQ0FBQyxDQUFDLENBQUM7YUFDTjtZQUVELHdCQUF3QjtZQUN4QixJQUFJLFVBQVUsR0FBRyxNQUFBLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxtQ0FBSSxFQUFFLENBQUM7WUFFaEQsY0FBYztZQUNkLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUU7Z0JBQy9CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQzNELE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN0RCxNQUFNLFNBQVMsR0FBRyxJQUFBLG1CQUFXLEVBQUMsWUFBWSxDQUFDLENBQUM7b0JBQzVDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFO3dCQUNyQyxNQUFNLElBQUksS0FBSyxDQUNYLHNDQUFzQyxTQUFTLDRDQUE0QyxDQUM5RixDQUFDO3FCQUNMO29CQUNELE1BQU0sZUFBZSxHQUFHLE1BQU0sYUFBYSxDQUFDLFNBQVMsQ0FDakQsU0FBUyxDQUNaLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUNyQixJQUFJLGVBQWUsRUFBRTt3QkFDakIsVUFBVSxHQUFHLElBQUEsbUJBQVcsRUFBQyxVQUFVLEVBQUUsZUFBZSxDQUFDLENBQUM7cUJBQ3pEO2lCQUNKO2FBQ0o7WUFFRCx1QkFBdUI7WUFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7WUFFOUIsbUNBQW1DO1lBQ25DLElBQUEsdUJBQWUsRUFBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFFdEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7O0tBQ3ZCO0lBRUQsOEJBQThCLENBQUMsUUFBZ0I7UUFDM0MscUNBQXFDO1FBQ3JDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDaEUsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEQsTUFBTSxHQUFHLEdBQUcsSUFBSSxNQUFNLENBQUMsR0FBRyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1lBQ3hDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDcEIsNkJBQTZCO2dCQUM3QixPQUFPLGFBQWEsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3hDLE1BQU07YUFDVDtTQUNKO0lBQ0wsQ0FBQztJQUVELHdCQUF3QixDQUFDLFFBQWdCO1FBQ3JDLG1DQUFtQztRQUNuQyxLQUFLLElBQUksQ0FBQyxXQUFXLEVBQUUsYUFBYSxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FDbkQsYUFBYSxDQUFDLFNBQVMsQ0FDMUIsRUFBRTtZQUNDLElBQUkscUJBQXFCLEdBQUcsUUFBUSxDQUFDO1lBRXJDLEtBQUssSUFBSSxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUN2QyxhQUFhLENBQUMsT0FBTyxDQUN4QixFQUFFO2dCQUNDLGFBQWE7Z0JBQ2IsU0FBUyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtvQkFDakMsTUFBTSxHQUFHLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO29CQUNuQyxxQkFBcUIsR0FBRyxxQkFBcUIsQ0FBQyxPQUFPLENBQ2pELEdBQUcsRUFDSCxFQUFFLENBQ0wsQ0FBQztnQkFDTixDQUFDLENBQUMsQ0FBQzthQUNOO1lBRUQsZ0JBQWdCO1lBQ2hCLHFCQUFxQixJQUFJLFNBQVMsV0FBVyxFQUFFLENBQUM7WUFFaEQscUNBQXFDO1lBQ3JDLElBQUksWUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLHFCQUFxQixFQUFFLENBQUMsRUFBRTtnQkFDN0MsT0FBTztvQkFDSCxZQUFZLEVBQUUsR0FBRyxxQkFBcUIsRUFBRTtvQkFDeEMsYUFBYTtpQkFDaEIsQ0FBQzthQUNMO1NBQ0o7SUFDTCxDQUFDO0lBRUQsaUJBQWlCLENBQUMsV0FBbUI7UUFDakMsSUFBSSxhQUFxQixDQUFDO1FBRTFCLHNEQUFzRDtRQUN0RCxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUMvQyxXQUFXLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3JELENBQUMsQ0FBQyxDQUFDO1FBRUgsa0VBQWtFO1FBQ2xFLElBQ0ksV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQztZQUNuQyxXQUFXLENBQUMsSUFBSSxFQUFFLEtBQUssV0FBVyxFQUNwQztZQUNFLDRDQUE0QztZQUM1QyxJQUFJLGNBQU0sQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEVBQUU7Z0JBQ2hDLElBQUksWUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsRUFBRTtvQkFDOUIsbUJBQW1CO29CQUNuQiw4RkFBOEY7b0JBQzlGLEtBQUs7b0JBQ0wsYUFBYSxHQUFHLFdBQVcsQ0FBQztpQkFDL0I7YUFDSjtpQkFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDbkMsYUFBYTtnQkFDYixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUNwRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDMUMsTUFBTSxpQkFBaUIsR0FBRyxHQUFHLE9BQU8sSUFBSSxXQUFXO3lCQUM5QyxLQUFLLENBQUMsR0FBRyxDQUFDO3lCQUNWLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDO29CQUMxQixNQUFNLE9BQU8sR0FBRyxjQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7b0JBQy9DLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUU7d0JBQzNCLGFBQWEsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzNCLE1BQU07cUJBQ1Q7aUJBQ0o7YUFDSjtTQUNKO2FBQU07WUFDSCxtQkFBbUI7WUFDbkIsdUhBQXVIO1lBQ3ZILEtBQUs7U0FDUjtRQUVELGFBQWE7UUFDYixPQUFPLGFBQWEsQ0FBQztJQUN6QixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDSCxNQUFNLENBQ0YsV0FBbUIsRUFDbkIsSUFBSSxHQUFHLEVBQUUsRUFDVCxRQUEwQztRQUUxQyxPQUFPLElBQUksbUJBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFOztZQUN0RCx1QkFBdUI7WUFDdkIsTUFBTSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFFbkIsMEJBQTBCO1lBQzFCLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMxRCxJQUFJLENBQUMsYUFBYSxFQUFFO2dCQUNoQixNQUFNLElBQUksS0FBSyxDQUNYLCtDQUErQyxXQUFXLHNCQUFzQixDQUNuRixDQUFDO2FBQ0w7WUFFRCx5REFBeUQ7WUFDekQsTUFBTSxtQkFBbUIsR0FDckIsSUFBSSxDQUFDLDhCQUE4QixDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3ZELElBQUksQ0FBQyxtQkFBbUIsRUFBRTtnQkFDdEIsTUFBTSxJQUFJLEtBQUssQ0FDWCxpRUFBaUUsV0FBVyxNQUFNLENBQ3JGLENBQUM7YUFDTDtZQUVELDJCQUEyQjtZQUMzQixNQUFNLG9CQUFvQixHQUN0QixJQUFJLENBQUMsd0JBQXdCLENBQUMsYUFBYSxDQUFDLENBQUM7WUFFakQsTUFBTSxvQkFBb0IsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUN0QyxFQUFFLEVBQ3NCLENBQ3BCLElBQUEsbUJBQVcsRUFBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsSUFBSSxFQUFFLENBQUMsQ0FDN0MsQ0FDSixDQUFDO1lBRUYsTUFBTSxRQUFRLEdBQUcsSUFBSSxvQkFBVyxFQUFFLENBQUM7WUFFbkMsSUFBSSxvQkFBb0IsRUFBRTtnQkFDdEIsTUFBTSxVQUFVLEdBQ1osTUFBTSxvQkFBb0IsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUN6QyxvQkFBb0IsQ0FBQyxZQUFZLENBQ3BDLENBQUM7Z0JBQ04sSUFBSSxVQUFVO29CQUFFLElBQUksR0FBRyxJQUFBLG1CQUFXLEVBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ3hEO1lBRUQsTUFBTSxjQUFjLEdBQUcsSUFBQSxtQkFBVyxFQUM5QixNQUFBLE1BQUEsbUJBQW1CLENBQUMsU0FBUywwQ0FBRSxRQUFRLEVBQUUsbUNBQUksRUFBRSxFQUMvQyxNQUFBLG9CQUFvQixDQUFDLGVBQWUsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLENBQUMsbUNBQ3hELEVBQUUsQ0FDVCxDQUFDO1lBRUYsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLG1CQUFtQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBRWpFLElBQUksYUFBYSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUM7WUFFakMsYUFBYSxHQUFHLGdCQUFnQixDQUFDLE1BQU0sQ0FDbkMsYUFBYSxFQUNiLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUN2QixJQUFJLENBQUMsbUJBQW1CLEVBQ3hCLG9CQUFvQixDQUN2QixDQUFDO1lBQ0YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3BCLE1BQU0sR0FBRyxNQUFNLGFBQWEsQ0FBQztZQUU3Qiw2QkFBNkI7WUFDN0IsTUFBTSxNQUFNO2dCQUNSLDRDQUE0QztnQkFDNUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLElBQzVDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsS0FDakIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQ25CLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSyxHQUN0QixDQUFDO1lBQ0YsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BCLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDUCxDQUFDOztBQWxoQkQ7Ozs7Ozs7OztHQVNHO0FBQ0kscUJBQU8sR0FBRyxFQUFFLENBQUM7QUFFcEI7Ozs7Ozs7OztHQVNHO0FBQ0ksdUJBQVMsR0FBRyxFQUFFLENBQUM7QUErZjFCLGtCQUFlLGFBQWEsQ0FBQyJ9