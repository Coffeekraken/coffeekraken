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
        Object.keys(defaultEngines).forEach((ext) => {
            SView.registerEngine(defaultEngines[ext], ext);
        });
        const defaultDataHandlers = __SugarConfig.get('views.dataHandlers') || {};
        Object.keys(defaultDataHandlers).forEach((ext) => {
            SView.registerDataHandler(defaultDataHandlers[ext], ext);
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