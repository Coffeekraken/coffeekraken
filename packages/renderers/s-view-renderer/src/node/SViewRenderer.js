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
import __SugarConfig from '@coffeekraken/s-sugar-config';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __unique from '@coffeekraken/sugar/shared/array/unique';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __fs from 'fs';
import __glob from 'glob';
import __path from 'path';
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
                rootDirs: __SugarConfig.get('views.rootDirs'),
                cacheDir: __SugarConfig.get('views.cacheDir'),
                engine: null,
                engineSettings: {},
                defaultData: {},
            },
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
        const defaultEngines = __SugarConfig.get('views.engines') || {};
        Object.keys(defaultEngines).forEach((id) => {
            const engineObj = defaultEngines[id];
            engineObj.extensions.forEach((ext) => {
                SView.registerEngine(engineObj.path, ext);
            });
        });
        const defaultDataHandlers = __SugarConfig.get('views.dataHandlers') || {};
        Object.keys(defaultDataHandlers).forEach((id) => {
            const handlerObj = defaultDataHandlers[id];
            handlerObj.extensions.forEach((ext) => {
                SView.registerDataHandler(handlerObj.path, ext);
            });
        });
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
                        const extension = this._viewPath
                            .split('.')
                            .slice(1)
                            .join('.');
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
    static get defaultRootDirs() {
        return [
            ...__SugarConfig.get('views.rootDirs'),
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static getRootDirs(rootDirs = []) {
        return __unique([
            ...(Array.isArray(rootDirs) ? rootDirs : [rootDirs]),
            ...SView.defaultRootDirs,
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
                view: {},
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
            if (SView.engines[ext])
                return;
            // register the engine in the stack
            SView.engines[ext] = {
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
            if (SView.dataHandlers[extension])
                return;
            // register the engine in the stack
            SView.dataHandlers[extension] = {
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
     * @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static getViewMetas(viewPath) {
        const viewsDirs = __SugarConfig.get('views.rootDirs');
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
            const viewSettings = Object.assign({}, (__deepMerge(this.viewSettings, settings || {})));
            data = __deepMerge(viewSettings.defaultData, data);
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
export default SView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1ZpZXdSZW5kZXJlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNWaWV3UmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxXQUFpQyxNQUFNLDBCQUEwQixDQUFDO0FBQ3pFLE9BQU8sT0FBeUIsTUFBTSxzQkFBc0IsQ0FBQztBQUM3RCx1Q0FBdUM7QUFDdkMsT0FBTyxVQUF5QixNQUFNLHlCQUF5QixDQUFDO0FBQ2hFLE9BQU8sYUFBYSxNQUFNLDhCQUE4QixDQUFDO0FBQ3pELE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE9BQU8sUUFBUSxNQUFNLHlDQUF5QyxDQUFDO0FBQy9ELE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBMEUxQixhQUFhO0FBQ2IsTUFBTSxLQUFNLFNBQVEsUUFBUTtJQThUeEI7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUFRLEVBQUUsUUFBNkI7UUFDL0Msb0JBQW9CO1FBQ3BCLEtBQUssQ0FDRCxXQUFXLENBQ1A7WUFDSSxJQUFJLEVBQUU7Z0JBQ0YsUUFBUSxFQUFFLGFBQWEsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUM7Z0JBQzdDLFFBQVEsRUFBRSxhQUFhLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDO2dCQUM3QyxNQUFNLEVBQUUsSUFBSTtnQkFDWixjQUFjLEVBQUUsRUFBRTtnQkFDbEIsV0FBVyxFQUFFLEVBQUU7YUFDbEI7U0FDSixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQXRWTjs7Ozs7Ozs7OztXQVVHO1FBQ0ssY0FBUyxHQUFHLEVBQUUsQ0FBQztRQTZVbkIsTUFBTSxjQUFjLEdB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