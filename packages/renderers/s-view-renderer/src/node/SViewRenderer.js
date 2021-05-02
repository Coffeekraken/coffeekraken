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
const unique_1 = __importDefault(require("@coffeekraken/sugar/shared/array/unique"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const glob_1 = __importDefault(require("glob"));
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const s_duration_1 = __importDefault(require("@coffeekraken/s-duration"));
const s_file_1 = __importDefault(require("@coffeekraken/s-file"));
// import __page404 from './pages/404';
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
// @ts-ignore
class SView extends s_class_1.default {
    /**
     * @name      constructor
     * @type      Function
     * @constructor
     *
     * Constructor
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(viewPath, settings) {
        // save the settings
        super(deepMerge_1.default({
            view: {
                rootDirs: s_sugar_config_1.default('views.rootDirs'),
                cacheDir: s_sugar_config_1.default('views.cacheDir'),
                engine: null,
                engineSettings: {},
                defaultData: {}
            }
        }, settings || {}));
        /**
         * @name      _viewPath
         * @type      String
         * @default   undefined
         * @private
         *
         * Store the view doted path if the passed parameter is a valid path
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._viewPath = '';
        this._originalViewPath = viewPath;
        this.viewSettings.rootDirs = this.constructor.getRootDirs(this.viewSettings.rootDirs || []);
        Object.keys(SView.engines).forEach((ext) => {
            viewPath = viewPath.replace(`.${ext}`, '');
        });
        // detect and save the view doted path or the view template string
        if (viewPath.split(' ').length === 1 && viewPath.trim() === viewPath) {
            // check if we can find the view path passed
            if (path_1.default.isAbsolute(viewPath)) {
                if (fs_1.default.existsSync(viewPath)) {
                    // throw new Error(
                    //   `Sorry but the absolute path to the view "<cyan>${viewPath}</cyan>" does not exist...`
                    // );
                    this._viewPath = viewPath;
                }
            }
            else if (!viewPath.match(/\//gm)) {
                // doted path
                for (let i = 0; i < this.viewSettings.rootDirs.length; i++) {
                    const rootDir = this.viewSettings.rootDirs[i];
                    const potentialViewPath = `${rootDir}/${viewPath
                        .split('.')
                        .join('/')}.[!data]*`;
                    const matches = glob_1.default.sync(potentialViewPath);
                    if (matches && matches.length) {
                        this._viewPath = matches[0];
                        const extension = this._viewPath.split('.').slice(1).join('.');
                        if (!this.viewSettings.engine)
                            this.viewSettings.engine = extension;
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
        let viewExt;
        // try to get an engine for this view
        if (this._viewPath) {
            for (let i = 0; i < Object.keys(SView.engines).length; i++) {
                const engineExt = Object.keys(SView.engines)[i];
                const reg = new RegExp(`${engineExt}$`);
                if (reg.test(this._viewPath)) {
                    viewExt = engineExt;
                    this._enginePath = SView.engines[engineExt].path;
                    break;
                }
            }
        }
        // get the datahandler path
        if (this._viewPath) {
            const viewPathWithoutExtension = this._viewPath.replace(`.${viewExt}`, '');
            // loop on each dataHandlers available
            Object.keys(SView.dataHandlers).forEach((extension) => {
                if (this._dataHandlerPath)
                    return;
                if (fs_1.default.existsSync(`${viewPathWithoutExtension}.data.${extension}`)) {
                    this._dataFilePath = `${viewPathWithoutExtension}.data.${extension}`;
                    this._dataHandlerPath = SView.dataHandlers[extension].path;
                }
            });
        }
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static getRootDirs(rootDirs = []) {
        return unique_1.default([
            ...(Array.isArray(rootDirs) ? rootDirs : [rootDirs]),
            ...SView.defaultRootDirs
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
        return new s_promise_1.default(({ resolve, reject }) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const viewInstance = new SView(viewPath, deepMerge_1.default({
                view: {}
            }, settings !== null && settings !== void 0 ? settings : {}));
            let resultObj;
            try {
                resultObj = yield viewInstance.render(data, (_a = settings === null || settings === void 0 ? void 0 : settings.view) !== null && _a !== void 0 ? _a : {});
                resultObj.status = 200;
                return resolve(Object.assign({}, resultObj));
            }
            catch (e) {
                const errorViewInstance = new SView('pages.501', Object.assign({}, settings));
                resultObj = yield errorViewInstance.render(Object.assign(Object.assign({}, data), { error: e }), (_b = settings === null || settings === void 0 ? void 0 : settings.view) !== null && _b !== void 0 ? _b : {});
                resultObj.status = 501;
                return reject(Object.assign({}, resultObj));
            }
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
     * @param       {String}        extension       The file extension to detect the engine. For example "blade.php" will be used to render all the files names "%name.blade.php"
     * @param       {String}        enginePath      The absolute path to the engine class file
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static registerEngine(enginePath, extensions) {
        if (!enginePath.match(/\.js$/))
            enginePath += '.js';
        // make sure the engine path exists
        if (!fs_1.default.existsSync(enginePath)) {
            throw new Error(`Sorry but the engine "<yellow>${enginePath}</yellow>" that you want to register does not exists...`);
        }
        // register the engine under each names
        const exts = Array.isArray(extensions)
            ? extensions
            : extensions.split(',').map((l) => l.trim());
        exts.forEach((ext) => {
            // register the engine in the stack
            SView.engines[ext] = {
                path: enginePath
            };
        });
    }
    /**
     * @name      registerDataHandler
     * @type      Function
     * @static
     *
     * This static method can be used to register a compatible __SViewEngine engine class
     * into the available SViews engines.
     *
     * @param       {String}        handlerPath      The absolute path to the engine class file
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static registerDataHandler(handlerPath, extensions) {
        if (handlerPath.slice(-3) !== '.js')
            handlerPath += '.js';
        // make sure the engine path exists
        if (!fs_1.default.existsSync(handlerPath)) {
            throw new Error(`Sorry but the data handler "<yellow>${handlerPath}</yellow>" that you want to register does not exists...`);
        }
        // register the engine under each names
        const exts = Array.isArray(extensions)
            ? extensions
            : extensions.split(',').map((l) => l.trim());
        exts.forEach((extension) => {
            // register the engine in the stack
            SView.dataHandlers[extension] = {
                path: handlerPath
            };
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
     * @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static getViewMetas(viewPath) {
        const viewsDirs = s_sugar_config_1.default('views.rootDirs');
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
                for (let i = 0; i < Object.keys(SView.engines).length; i++) {
                    const engineExt = Object.keys(SView.engines)[i];
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
    /**
     * @name      viewSettings
     * @type      ISViewRendererSettings
     * @get
     *
     * Access the template settings
     *
     * @since     2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get viewSettings() {
        return this._settings.view;
    }
    /**
     * @name          render
     * @type          Function
     * @async
     *
     * Main method to render your view by passing it an object of data to use as well as an object of settings to override the default passed onces
     *
     * @param       {Object}        [data={}]       An object of data to use to render the view.
     * @param       {Object}        [settings={}]     An object of settings that will be passed to the render engine method to use to override the default onces passed in the constructor. Check the used engine render documentation
     * @return      {SPromise}                    An SPromise instance that will be resolved once the rendering process has correctly finished
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    render(data = {}, settings) {
        // @ts-ignore
        // if (!this._viewPath) {
        //   return __page404({
        //     title: 'Passed view does not exists',
        //     body: `Sorry but the passed dot path "<cyan>${this._originalViewPath}</cyan>" does not resolve to any existing views...`
        //   });
        // }
        // // @ts-ignore
        // if (!this._enginePath) {
        //   return __page404({
        //     title: 'View not supported',
        //     body: `<red>[${this.constructor.name}.render]</red> It seems that no registered engines can handle your view`
        //   });
        // }
        return new s_promise_1.default(({ resolve, reject }) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const viewSettings = Object.assign({}, deepMerge_1.default(this.viewSettings, settings || {}));
            data = deepMerge_1.default(viewSettings.defaultData, data);
            const duration = new s_duration_1.default();
            // load engine, datahandler, etc...
            const engineObj = require(this._enginePath).default;
            let dataHandlerObj;
            if (this._dataHandlerPath && this._dataFilePath) {
                dataHandlerObj = require(this._dataHandlerPath).default;
                const gettedData = yield dataHandlerObj.handle(this._dataFilePath);
                if (gettedData)
                    data = deepMerge_1.default(gettedData, data);
            }
            const engineSettings = deepMerge_1.default((_a = engineObj.settings) !== null && _a !== void 0 ? _a : {}, (_b = viewSettings.engineSettings) !== null && _b !== void 0 ? _b : {});
            viewSettings.engineSettings = engineSettings;
            if (engineObj) {
                const renderFn = engineObj.render.bind(this);
                const renderPromise = renderFn(this._viewPath, data, viewSettings);
                const result = yield renderPromise;
                if (renderPromise.isRejected()) {
                    const resObj = Object.assign({ view: SView.getViewMetas(this._viewPath) }, duration.end());
                    return reject(resObj);
                }
                // resolve the render process
                const resObj = Object.assign(Object.assign({ 
                    // engine: this._engineInstance.engineMetas,
                    view: SView.getViewMetas(this._viewPath) }, duration.end()), { value: result });
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SView.engines = {};
/**
 * @name       dataHandlers
 * @type      Object
 * @static
 *
 * Store the registered dataHandlers using the ```registerDataHandler``` static method
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SView.dataHandlers = {};
/**
 * @name      defaultRootDirs
 * @type      Array
 * @static
 *
 * This static property store the default root directories where the class
 * will search for views to render
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SView.defaultRootDirs = [
    ...s_sugar_config_1.default('views.rootDirs'),
    path_1.default.resolve(__dirname, '../php/views/blade')
];
const defaultEngines = s_sugar_config_1.default('views.engines') || {};
Object.keys(defaultEngines).forEach((ext) => {
    SView.registerEngine(defaultEngines[ext], ext);
});
const defaultDataHandlers = s_sugar_config_1.default('views.dataHandlers') || {};
Object.keys(defaultDataHandlers).forEach((ext) => {
    SView.registerDataHandler(defaultDataHandlers[ext], ext);
});
exports.default = SView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1ZpZXdSZW5kZXJlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNWaWV3UmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxRkFBK0Q7QUFDL0QsNEZBQXNFO0FBQ3RFLGtGQUF5RDtBQUN6RCxnREFBMEI7QUFDMUIsNENBQXNCO0FBQ3RCLGdEQUEwQjtBQUMxQixvRUFBNkM7QUFDN0MsMEVBQXlFO0FBQ3pFLGtFQUE2RDtBQUM3RCx1Q0FBdUM7QUFDdkMsd0VBQWdFO0FBMEVoRSxhQUFhO0FBQ2IsTUFBTSxLQUFNLFNBQVEsaUJBQVE7SUFzVDFCOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBUSxFQUFFLFFBQTZCO1FBQ2pELG9CQUFvQjtRQUNwQixLQUFLLENBQ0gsbUJBQVcsQ0FDVDtZQUNFLElBQUksRUFBRTtnQkFDSixRQUFRLEVBQUUsd0JBQWEsQ0FBQyxnQkFBZ0IsQ0FBQztnQkFDekMsUUFBUSxFQUFFLHdCQUFhLENBQUMsZ0JBQWdCLENBQUM7Z0JBQ3pDLE1BQU0sRUFBRSxJQUFJO2dCQUNaLGNBQWMsRUFBRSxFQUFFO2dCQUNsQixXQUFXLEVBQUUsRUFBRTthQUNoQjtTQUNGLEVBQ0QsUUFBUSxJQUFJLEVBQUUsQ0FDZixDQUNGLENBQUM7UUE5VUo7Ozs7Ozs7Ozs7V0FVRztRQUNLLGNBQVMsR0FBRyxFQUFFLENBQUM7UUFxVXJCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxRQUFRLENBQUM7UUFFbEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEdBQVMsSUFBSSxDQUFDLFdBQVksQ0FBQyxXQUFXLENBQzlELElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FDakMsQ0FBQztRQUVGLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ3pDLFFBQVEsR0FBRyxRQUFRLENBQUMsT0FB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