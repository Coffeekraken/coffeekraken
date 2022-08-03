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
import __SPromise from '@coffeekraken/s-promise';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __extension from '@coffeekraken/sugar/node/fs/extension';
import __writeJsonSync from '@coffeekraken/sugar/node/fs/writeJsonSync';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __packageTmpDir from '@coffeekraken/sugar/node/path/packageTmpDir';
import __unique from '@coffeekraken/sugar/shared/array/unique';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __uniqid from '@coffeekraken/sugar/shared/string/uniqid';
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
    constructor(settings) {
        // save the settings
        super(__deepMerge(
        // @ts-ignore
        __SViewRendererSettingsInterface.defaults(), settings || {}));
        this._loaded = false;
        this.settings.rootDirs = this.constructor.getRootDirs(this.settings.rootDirs || []);
        // create a shared data file path to store shared data
        this._sharedDataFilePath = `${__packageTmpDir()}/viewRenderer/sharedData-${__uniqid()}.json`;
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
            // @ts-ignore
            __path.resolve(__packageRoot(__dirname()), 'src/php/views/blade'),
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
        return new __SPromise(({ resolve, reject, pipe }) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const viewInstance = new SViewRenderer(__deepMerge(settings !== null && settings !== void 0 ? settings : {}));
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
    _load() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (this._loaded)
                return;
            const defaultEngines = __SSugarConfig.get('viewRenderer.engines') || [];
            for (let i = 0; i < defaultEngines.length; i++) {
                const path = defaultEngines[i];
                // @ts-ignore
                const { default: EngineClass } = yield import(path);
                EngineClass.extensions.forEach((ext) => {
                    SViewRenderer.registerEngine(EngineClass, ext);
                });
            }
            const defaultDataHandlers = __SSugarConfig.get('viewRenderer.dataFiles') || [];
            for (let i = 0; i < defaultDataHandlers.length; i++) {
                const path = defaultDataHandlers[i];
                // @ts-ignore
                const { default: DataFileClass } = yield import(path);
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
                    const extension = __extension(dataFilePath);
                    if (!SViewRenderer.dataFiles[extension]) {
                        throw new Error(`<red>[render]</red> The extension "${extension}" is not registered as a data file handler`);
                    }
                    const sharedDataFiles = yield SViewRenderer.dataFiles[extension].load(dataFilePath);
                    if (sharedDataFiles) {
                        sharedData = __deepMerge(sharedData, sharedDataFiles);
                    }
                }
            }
            // save the shared data
            this._sharedData = sharedData;
            // save the shared data on the disk
            __writeJsonSync(this._sharedDataFilePath, sharedData);
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
            if (__fs.existsSync(`${potentialDataFilePath}`)) {
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
            if (__path.isAbsolute(viewDotPath)) {
                if (__fs.existsSync(viewDotPath)) {
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
                    const matches = __glob.sync(potentialViewPath);
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
        return new __SPromise(({ resolve, reject, pipe }) => __awaiter(this, void 0, void 0, function* () {
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
            const viewRendererSettings = Object.assign({}, (__deepMerge(this.settings, settings || {})));
            const duration = new __SDuration();
            if (dataFileClassAndPath) {
                const gettedData = yield dataFileClassAndPath.DataFileClass.load(dataFileClassAndPath.dataFilePath);
                if (gettedData)
                    data = __deepMerge(gettedData, data);
            }
            const engineSettings = __deepMerge((_b = (_a = RendererEngineClass.interface) === null || _a === void 0 ? void 0 : _a.defaults()) !== null && _b !== void 0 ? _b : {}, (_c = viewRendererSettings.enginesSettings[RendererEngineClass.id]) !== null && _c !== void 0 ? _c : {});
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
export default SViewRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBRW5ELE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBRzNDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE9BQU8sV0FBVyxNQUFNLHVDQUF1QyxDQUFDO0FBQ2hFLE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hFLE9BQU8sYUFBYSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3RFLE9BQU8sZUFBZSxNQUFNLDZDQUE2QyxDQUFDO0FBQzFFLE9BQU8sUUFBUSxNQUFNLHlDQUF5QyxDQUFDO0FBQy9ELE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sUUFBUSxNQUFNLDBDQUEwQyxDQUFDO0FBQ2hFLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sZ0NBQWdDLE1BQU0sNENBQTRDLENBQUM7QUFzRTFGLGFBQWE7QUFDYixNQUFNLGFBQWMsU0FBUSxRQUFRO0lBMFFoQzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQXlCO1FBQ2pDLG9CQUFvQjtRQUNwQixLQUFLLENBQ0QsV0FBVztRQUNQLGFBQWE7UUFDYixnQ0FBZ0MsQ0FBQyxRQUFRLEVBQUUsRUFDM0MsUUFBUSxJQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO1FBVU4sWUFBTyxHQUFHLEtBQUssQ0FBQztRQVJaLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFT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