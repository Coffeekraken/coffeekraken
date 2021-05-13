var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __unique from '@coffeekraken/sugar/shared/array/unique';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __sugarConfig from '@coffeekraken/s-sugar-config';
import __path from 'path';
import __fs from 'fs';
import __glob from 'glob';
import __SClass from '@coffeekraken/s-class';
import __SDuration from '@coffeekraken/s-duration';
import __SFile from '@coffeekraken/s-file';
// import __page404 from './pages/404';
import __SPromise from '@coffeekraken/s-promise';
// @ts-ignore
class SView extends __SClass {
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
        super(__deepMerge({
            view: {
                rootDirs: __sugarConfig('views.rootDirs'),
                cacheDir: __sugarConfig('views.cacheDir'),
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
            if (__path.isAbsolute(viewPath)) {
                if (__fs.existsSync(viewPath)) {
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
                    const matches = __glob.sync(potentialViewPath);
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
                if (__fs.existsSync(`${viewPathWithoutExtension}.data.${extension}`)) {
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
        return __unique([
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
        return new __SPromise(({ resolve, reject }) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const viewInstance = new SView(viewPath, __deepMerge({
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
        if (!__fs.existsSync(enginePath)) {
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
        if (!__fs.existsSync(handlerPath)) {
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
        const viewsDirs = __sugarConfig('views.rootDirs');
        for (let i = 0; i < viewsDirs.length; i++) {
            const viewsDir = viewsDirs[i];
            let path = `${viewsDir}/${viewPath}`;
            if (__path.isAbsolute(viewPath)) {
                path = viewPath;
            }
            let finalViewPath, viewType;
            if (__fs.existsSync(path)) {
                finalViewPath = path;
                const fileName = path.split('/').slice(-1).join('');
                viewType = fileName.split('.').slice(1).join('.');
            }
            else {
                for (let i = 0; i < Object.keys(SView.engines).length; i++) {
                    const engineExt = Object.keys(SView.engines)[i];
                    if (__fs.existsSync(`${path}.${engineExt}`)) {
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
            const infoObj = __SFile.new(finalViewPath);
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
        return new __SPromise(({ resolve, reject }) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const viewSettings = Object.assign({}, __deepMerge(this.viewSettings, settings || {}));
            data = __deepMerge(viewSettings.defaultData, data);
            const duration = new __SDuration();
            // load engine, datahandler, etc...
            const engineObj = require(this._enginePath).default;
            let dataHandlerObj;
            if (this._dataHandlerPath && this._dataFilePath) {
                dataHandlerObj = require(this._dataHandlerPath).default;
                const gettedData = yield dataHandlerObj.handle(this._dataFilePath);
                if (gettedData)
                    data = __deepMerge(gettedData, data);
            }
            const engineSettings = __deepMerge((_a = engineObj.settings) !== null && _a !== void 0 ? _a : {}, (_b = viewSettings.engineSettings) !== null && _b !== void 0 ? _b : {});
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
    ...__sugarConfig('views.rootDirs'),
    __path.resolve(__dirname, '../php/views/blade')
];
const defaultEngines = __sugarConfig('views.engines') || {};
Object.keys(defaultEngines).forEach((ext) => {
    SView.registerEngine(defaultEngines[ext], ext);
});
const defaultDataHandlers = __sugarConfig('views.dataHandlers') || {};
Object.keys(defaultDataHandlers).forEach((ext) => {
    SView.registerDataHandler(defaultDataHandlers[ext], ext);
});
export default SView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1ZpZXdSZW5kZXJlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNWaWV3UmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxRQUFRLE1BQU0seUNBQXlDLENBQUM7QUFDL0QsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxhQUFhLE1BQU0sOEJBQThCLENBQUM7QUFDekQsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxXQUFpQyxNQUFNLDBCQUEwQixDQUFDO0FBQ3pFLE9BQU8sT0FBeUIsTUFBTSxzQkFBc0IsQ0FBQztBQUM3RCx1Q0FBdUM7QUFDdkMsT0FBTyxVQUF5QixNQUFNLHlCQUF5QixDQUFDO0FBMEVoRSxhQUFhO0FBQ2IsTUFBTSxLQUFNLFNBQVEsUUFBUTtJQXNUMUI7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUFRLEVBQUUsUUFBNkI7UUFDakQsb0JBQW9CO1FBQ3BCLEtBQUssQ0FDSCxXQUFXLENBQ1Q7WUFDRSxJQUFJLEVBQUU7Z0JBQ0osUUFBUSxFQUFFLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQztnQkFDekMsUUFBUSxFQUFFLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQztnQkFDekMsTUFBTSxFQUFFLElBQUk7Z0JBQ1osY0FBYyxFQUFFLEVBQUU7Z0JBQ2xCLFdBQVcsRUFBRSxFQUFFO2FBQ2hCO1NBQ0YsRUFDRCxRQUFRLElBQUksRUFBRSxDQUNmLENBQ0YsQ0FBQztRQTlVSjs7Ozs7Ozs7OztXQVVHO1FBQ0ssY0FBUyxHQUFHLEVBQUUsQ0FBQztRQXFVckIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFFBQVEsQ0FBQztRQUVsQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsR0FB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