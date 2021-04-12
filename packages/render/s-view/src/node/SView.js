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
const sugar_1 = __importDefault(require("@coffeekraken/sugar/shared/config/sugar"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const glob_1 = __importDefault(require("glob"));
const SViewEngine_1 = __importDefault(require("./engines/SViewEngine"));
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const s_duration_1 = __importDefault(require("@coffeekraken/s-duration"));
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
    constructor(viewPathOrViewString, settings) {
        // save the settings
        super(deepMerge_1.default({
            view: {
                rootDirs: sugar_1.default('views.rootDirs'),
                cacheDir: sugar_1.default('views.cacheDir'),
                engine: null,
                engineSettings: {},
                defaultData: {}
            }
        }, settings || {}));
        this.viewSettings.rootDirs = this.constructor.getRootDirs(this.viewSettings.rootDirs || []);
        Object.keys(SView.engines).forEach((ext) => {
            viewPathOrViewString = viewPathOrViewString.replace(`.${ext}`, '');
        });
        // if the "engine" setting is an instance, save it as engineInstance
        if (typeof this.viewSettings.engine !== 'string' &&
            this.viewSettings.engine instanceof SViewEngine_1.default) {
            this._engineInstance = this.viewSettings.engine;
        }
        // detect and save the view doted path or the view template string
        if (viewPathOrViewString.split(' ').length === 1 &&
            viewPathOrViewString.trim() === viewPathOrViewString) {
            // check if we can find the view path passed
            if (path_1.default.isAbsolute(viewPathOrViewString)) {
                if (!fs_1.default.existsSync(viewPathOrViewString)) {
                    throw new Error(`Sorry but the absolute path to the view "<cyan>${viewPathOrViewString}</cyan>" does not exist...`);
                }
                this._viewPath = viewPathOrViewString;
            }
            else if (!viewPathOrViewString.match(/\//gm)) {
                // doted path
                for (let i = 0; i < this.viewSettings.rootDirs.length; i++) {
                    const rootDir = this.viewSettings.rootDirs[i];
                    const viewPath = `${rootDir}/${viewPathOrViewString
                        .split('.')
                        .join('/')}.[!data]*`;
                    const matches = glob_1.default.sync(viewPath);
                    if (matches && matches.length) {
                        this._viewPath = matches[0];
                        const extension = this._viewPath.split('.').slice(1).join('.');
                        if (!this.viewSettings.engine)
                            this.viewSettings.engine = extension;
                        break;
                    }
                }
                if (!this._viewPath) {
                    throw new Error(`Sorry but the passed dot path "<cyan>${viewPathOrViewString}</cyan>" does not resolve to any existing views...`);
                }
            }
            else {
            }
        }
        else {
            this._viewString = viewPathOrViewString;
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
    static registerEngine(enginePath) {
        if (!enginePath.match(/\.js$/))
            enginePath += '.js';
        // make sure the engine path exists
        if (!fs_1.default.existsSync(enginePath)) {
            throw new Error(`Sorry but the engine "<yellow>${enginePath}</yellow>" that you want to register does not exists...`);
        }
        // get the engine class
        let EngineClass = require(enginePath); // eslint-disable-line
        EngineClass = EngineClass.default || EngineClass;
        // make sure we have names defined
        if (!EngineClass.names ||
            !Array.isArray(EngineClass.names) ||
            !EngineClass.names.length) {
            throw new Error(`You try to register an SViews engine with the class "<yellow>${EngineClass.name}</yellow>" but you forgot to specify the static property "<cyan>names</cyan>" with something like "<green>['twig.js','twig']</green>"...`);
        }
        // register the engine under each names
        EngineClass.names.forEach((name) => {
            // register the engine in the stack
            SView.engines[name] = EngineClass;
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
    static registerDataHandler(handlerPath) {
        if (handlerPath.slice(-3) !== '.js')
            handlerPath += '.js';
        // make sure the engine path exists
        if (!fs_1.default.existsSync(handlerPath)) {
            throw new Error(`Sorry but the data handler "<yellow>${handlerPath}</yellow>" that you want to register does not exists...`);
        }
        // get the engine class
        const HandlerClass = require(handlerPath).default; // eslint-disable-line
        // make sure we have extensions defined
        if (!HandlerClass.extensions ||
            !Array.isArray(HandlerClass.extensions) ||
            !HandlerClass.extensions.length) {
            throw new Error(`You try to register an SViews data handler with the class "<yellow>${HandlerClass.name}</yellow>" but you forgot to specify the property "<cyan>extensions</cyan>" with something like "<green>['json','js']</green>"...`);
        }
        // register the engine under each names
        HandlerClass.extensions.forEach((extension) => {
            // register the engine in the stack
            SView.dataHandlers[extension] = HandlerClass;
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
        const viewsDirs = sugar_1.default('views.rootDirs');
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
            const infoObj = {
                path: finalViewPath,
                relPath: path_1.default.relative(viewsDir, finalViewPath),
                type: viewType
            };
            // return the infos
            return infoObj;
        }
        return undefined;
    }
    /**
     * @name      viewSettings
     * @type      ISViewSettings
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
     * @name          _getEngineByName
     * @type          Function
     * @private
     *
     * This method take an engine name and tries to returns you the engine instance
     * registered in the stack
     *
     * @param     {String}    name    The engine name wanted
     * @return    {SViewsEngine|undefined}     The engine class or undefined
     *
     * @since     2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _getEngineByName(name) {
        if (SView.engines[name] !== undefined)
            return SView.engines[name];
        else if (name.includes('.')) {
            const engineName = name.split('.')[0];
            if (SView.engines[engineName])
                return SView.engines[engineName];
        }
        return undefined;
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
        return new s_promise_1.default(({ resolve, reject }) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const renderSettings = (deepMerge_1.default(this.viewSettings, settings || {}));
            data = deepMerge_1.default(renderSettings.defaultData, data);
            const duration = new s_duration_1.default();
            if (this._viewString) {
                if (!renderSettings.engine) {
                    // loop on the engines to get the better one
                    for (let i = 0; i < Object.keys(SView.engines).length; i++) {
                        const enginePath = SView.engines[Object.keys(SView.engines)[i]];
                        let EngineClass = require(enginePath); // eslint-disable-line
                        EngineClass = EngineClass.default || EngineClass;
                        if (EngineClass.input === 'string' &&
                            EngineClass.canRender(this._viewString)) {
                            renderSettings.engine = Object.keys(SView.engines)[i];
                            break;
                        }
                    }
                }
                else if (renderSettings.engine instanceof SViewEngine_1.default) {
                    if (!renderSettings.engine.constructor.canRender(this._viewString)) {
                        return reject(`It seems that you've passed directly an SViewEngine engine as the settings.engine option but this engine cannot render your passed template string...`);
                    }
                }
                if (!renderSettings.engine) {
                    return reject(`Sorry but it seems that the passed template string cannot be rendered using any of the available engines:\n- ${Object.keys(SView.engines)
                        .map((l) => {
                        return `<yellow>${l}</yellow>`;
                    })
                        .join('\n- ')}`);
                }
            }
            else if (this._viewPath) {
                const viewPathWithoutExtension = this._viewPath.replace(`.${renderSettings.engine}`, '');
                // loop on each dataHandlers available
                let dataHandlerFn, dataFilePath;
                Object.keys(SView.dataHandlers).forEach((extension) => {
                    if (dataHandlerFn)
                        return;
                    if (fs_1.default.existsSync(`${viewPathWithoutExtension}.${extension}`)) {
                        dataFilePath = `${viewPathWithoutExtension}.${extension}`;
                        dataHandlerFn = require(SView.dataHandlers[extension]);
                    }
                });
                // check if we have a data file
                if (dataFilePath && dataHandlerFn) {
                    const dataObj = yield dataHandlerFn(dataFilePath);
                    data = deepMerge_1.default(dataObj, data);
                }
            }
            if (!this._engineInstance && typeof renderSettings.engine === 'string') {
                // get the engine class
                const EngineClass = this._getEngineByName(renderSettings.engine);
                if (EngineClass) {
                    this._engineInstance = new EngineClass({
                        viewEngine: {
                            rootDirs: [...((_a = this.viewSettings.rootDirs) !== null && _a !== void 0 ? _a : [])],
                            cacheDir: this.viewSettings.cacheDir
                        }
                    });
                }
            }
            if (this._engineInstance) {
                const renderPromise = this._engineInstance.render(this._viewPath || this._viewString || '', data, renderSettings);
                const result = yield renderPromise;
                if (renderPromise.isRejected()) {
                    const resObj = Object.assign({ engine: this._engineInstance.engineMetas }, duration.end());
                    if (this._viewPath) {
                        resObj.view = SView.getViewMetas(this._viewPath);
                    }
                    return reject(resObj);
                }
                // resolve the render process
                const resObj = Object.assign(Object.assign({ engine: this._engineInstance.engineMetas }, duration.end()), { value: result });
                if (this._viewPath) {
                    resObj.view = SView.getViewMetas(this._viewPath);
                }
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
    ...sugar_1.default('views.rootDirs'),
    path_1.default.resolve(__dirname, '../php/views/blade')
];
const defaultEngines = sugar_1.default('views.engines') || {};
Object.keys(defaultEngines).forEach((name) => {
    SView.registerEngine(defaultEngines[name]);
});
const defaultDataHandlers = sugar_1.default('views.dataHandlers') || {};
Object.keys(defaultDataHandlers).forEach((name) => {
    SView.registerDataHandler(defaultDataHandlers[name]);
});
exports.default = SView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1ZpZXcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLHFGQUErRDtBQUMvRCw0RkFBc0U7QUFDdEUsb0ZBQW9FO0FBQ3BFLGdEQUEwQjtBQUMxQiw0Q0FBc0I7QUFDdEIsZ0RBQTBCO0FBQzFCLHdFQUcrQjtBQUMvQixvRUFBNkM7QUFDN0MsMEVBQXlFO0FBRXpFLHdFQUFnRTtBQThFaEUsYUFBYTtBQUNiLE1BQU0sS0FBTSxTQUFRLGlCQUFRO0lBcVQxQjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLG9CQUFvQixFQUFFLFFBQTZCO1FBQzdELG9CQUFvQjtRQUNwQixLQUFLLENBQ0gsbUJBQVcsQ0FDVDtZQUNFLElBQUksRUFBRTtnQkFDSixRQUFRLEVBQUUsZUFBYSxDQUFDLGdCQUFnQixDQUFDO2dCQUN6QyxRQUFRLEVBQUUsZUFBYSxDQUFDLGdCQUFnQixDQUFDO2dCQUN6QyxNQUFNLEVBQUUsSUFBSTtnQkFDWixjQUFjLEVBQUUsRUFBRTtnQkFDbEIsV0FBVyxFQUFFLEVBQUU7YUFDaEI7U0FDRixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO1FBQ0YsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEdBQVMsSUFBSSxDQUFDLFdBQVksQ0FBQyxXQUFXLENBQzlELElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FDakMsQ0FBQztRQUVGLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ3pDLG9CQUFvQixHQUFHLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3JFLENBQUMsQ0FBQyxDQUFDO1FBRUgsb0VBQW9FO1FBQ3BFLElBQ0UsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFD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