var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SClass from '@coffeekraken/s-class';
import __SDuration from '@coffeekraken/s-duration';
import __SFile from '@coffeekraken/s-file';
// import __page404 from './pages/404';
import __SPromise from '@coffeekraken/s-promise';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __unique from '@coffeekraken/sugar/shared/array/unique';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __fs from 'fs';
import __glob from 'glob';
import __path from 'path';
import __SViewRendererSettingsInterface from './interface/SViewRendererSettingsInterface';
// @ts-ignore
class SViewRenderer extends __SClass {
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
    constructor(viewPath, settings) {
        // save the settings
        super(__deepMerge({
            viewRenderer: __SViewRendererSettingsInterface.defaults(),
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
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this._viewPath = '';
        const defaultEngines = __SSugarConfig.get('viewRenderer.engines') || {};
        Object.keys(defaultEngines).forEach((id) => {
            const engineObj = defaultEngines[id];
            engineObj.extensions.forEach((ext) => {
                SViewRenderer.registerEngine(engineObj.path, ext);
            });
        });
        const defaultDataHandlers = __SSugarConfig.get('viewRenderer.dataHandlers') || {};
        Object.keys(defaultDataHandlers).forEach((id) => {
            const handlerObj = defaultDataHandlers[id];
            handlerObj.extensions.forEach((ext) => {
                SViewRenderer.registerDataHandler(handlerObj.path, ext);
            });
        });
        this._originalViewPath = viewPath;
        this.viewRendererSettings.rootDirs = this.constructor.getRootDirs(this.viewRendererSettings.rootDirs || []);
        Object.keys(SViewRenderer.engines).forEach((ext) => {
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
                for (let i = 0; i < this.viewRendererSettings.rootDirs.length; i++) {
                    const rootDir = this.viewRendererSettings.rootDirs[i];
                    const potentialViewPath = `${rootDir}/${viewPath
                        .split('.')
                        .join('/')}.[!data]*`;
                    const matches = __glob.sync(potentialViewPath);
                    if (matches && matches.length) {
                        this._viewPath = matches[0];
                        // const extension = this._viewPath
                        //     .split('.')
                        //     .slice(1)
                        //     .join('.');
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
            for (let i = 0; i < Object.keys(SViewRenderer.engines).length; i++) {
                const engineExt = Object.keys(SViewRenderer.engines)[i];
                const reg = new RegExp(`${engineExt}$`);
                if (reg.test(this._viewPath)) {
                    viewExt = engineExt;
                    this._enginePath = SViewRenderer.engines[engineExt].path;
                    break;
                }
            }
        }
        // get the datahandler path
        if (this._viewPath) {
            const viewPathWithoutExtension = this._viewPath.replace(`.${viewExt}`, '');
            // loop on each dataHandlers available
            Object.keys(SViewRenderer.dataHandlers).forEach((extension) => {
                if (this._dataHandlerPath)
                    return;
                if (__fs.existsSync(`${viewPathWithoutExtension}.data.${extension}`)) {
                    this._dataFilePath = `${viewPathWithoutExtension}.data.${extension}`;
                    this._dataHandlerPath = SViewRenderer.dataHandlers[extension].path;
                }
            });
        }
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
            ...__SSugarConfig.get('viewRenderer.rootDirs'),
            __path.resolve(__dirname(), '../php/views/blade'),
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
        return __unique([
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
        return new __SPromise(({ resolve, reject }) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const viewInstance = new SViewRenderer(viewPath, __deepMerge({
                viewRenderer: {},
            }, settings !== null && settings !== void 0 ? settings : {}));
            let resultObj;
            try {
                resultObj = yield viewInstance.render(data, (_a = settings === null || settings === void 0 ? void 0 : settings.viewRenderer) !== null && _a !== void 0 ? _a : {});
                resultObj.status = 200;
                return resolve(Object.assign({}, resultObj));
            }
            catch (e) {
                const errorViewInstance = new SViewRenderer('pages.501', Object.assign({}, settings));
                resultObj = yield errorViewInstance.render(Object.assign(Object.assign({}, data), { error: e }), (_b = settings === null || settings === void 0 ? void 0 : settings.viewRenderer) !== null && _b !== void 0 ? _b : {});
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
            if (SViewRenderer.engines[ext])
                return;
            // register the engine in the stack
            SViewRenderer.engines[ext] = {
                path: enginePath,
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
            if (SViewRenderer.dataHandlers[extension])
                return;
            // register the engine in the stack
            SViewRenderer.dataHandlers[extension] = {
                path: handlerPath,
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
     * @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static getViewMetas(viewPath) {
        const viewsDirs = __SSugarConfig.get('viewRenderer.rootDirs');
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
                for (let i = 0; i < Object.keys(SViewRenderer.engines).length; i++) {
                    const engineExt = Object.keys(SViewRenderer.engines)[i];
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
     * @name      viewRendererSettings
     * @type      ISViewRendererSettings
     * @get
     *
     * Access the template settings
     *
     * @since     2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get viewRendererSettings() {
        return this._settings.viewRenderer;
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
            const viewRendererSettings = Object.assign({}, (__deepMerge(this.viewRendererSettings, settings || {})));
            data = __deepMerge(viewRendererSettings.defaultData, data);
            const duration = new __SDuration();
            // load engine, datahandler, etc...
            const { default: engineObj } = yield import(this._enginePath);
            let dataHandlerObj;
            if (this._dataHandlerPath && this._dataFilePath) {
                dataHandlerObj = (yield import(this._dataHandlerPath)).default;
                const gettedData = yield dataHandlerObj.handle(this._dataFilePath);
                if (gettedData)
                    data = __deepMerge(gettedData, data);
            }
            const engineSettings = __deepMerge((_a = engineObj.settings) !== null && _a !== void 0 ? _a : {}, (_b = viewRendererSettings.enginesSettings[engineObj.id]) !== null && _b !== void 0 ? _b : {});
            viewRendererSettings.enginesSettings = engineSettings;
            if (engineObj) {
                const renderFn = engineObj.render.bind(this);
                const renderPromise = renderFn(this._viewPath, data, viewRendererSettings);
                const result = yield renderPromise;
                if (renderPromise.isRejected()) {
                    const resObj = Object.assign({ view: SViewRenderer.getViewMetas(this._viewPath) }, duration.end());
                    return reject(resObj);
                }
                // resolve the render process
                const resObj = Object.assign(Object.assign({ 
                    // engine: this._engineInstance.engineMetas,
                    view: SViewRenderer.getViewMetas(this._viewPath) }, duration.end()), { value: result });
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
/**
 * @name       dataHandlers
 * @type      Object
 * @static
 *
 * Store the registered dataHandlers using the ```registerDataHandler``` static method
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
SViewRenderer.dataHandlers = {};
export default SViewRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1ZpZXdSZW5kZXJlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNWaWV3UmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxXQUFpQyxNQUFNLDBCQUEwQixDQUFDO0FBQ3pFLE9BQU8sT0FBeUIsTUFBTSxzQkFBc0IsQ0FBQztBQUM3RCx1Q0FBdUM7QUFDdkMsT0FBTyxVQUF5QixNQUFNLHlCQUF5QixDQUFDO0FBQ2hFLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE9BQU8sUUFBUSxNQUFNLHlDQUF5QyxDQUFDO0FBQy9ELE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sZ0NBQWdDLE1BQU0sNENBQTRDLENBQUM7QUF1RTFGLGFBQWE7QUFDYixNQUFNLGFBQWMsU0FBUSxRQUFRO0lBOFRoQzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQVEsRUFBRSxRQUE2QjtRQUMvQyxvQkFBb0I7UUFDcEIsS0FBSyxDQUNELFdBQVcsQ0FDUDtZQUNJLFlBQVksRUFBRSxnQ0FBZ0MsQ0FBQyxRQUFRLEVBQUU7U0FDNUQsRUFDRCxRQUFRLElBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUFoVk47Ozs7Ozs7Ozs7V0FVRztRQUNLLGNBQVMsR0FBRyxFQUFFLENBQUM7UUF1VW5CLE1BQU0sY0FBYyxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDeEUsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFF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