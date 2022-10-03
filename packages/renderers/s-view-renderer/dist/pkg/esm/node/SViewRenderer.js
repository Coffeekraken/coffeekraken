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
import { __unique } from '@coffeekraken/sugar/array';
import { __extension, __writeJsonSync } from '@coffeekraken/sugar/fs';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __packageTmpDir } from '@coffeekraken/sugar/path';
import { __uniqid } from '@coffeekraken/sugar/string';
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
        /**
         * Load the shared data if exists
         */
        this._needLoad = true;
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
            // // @ts-ignore
            // __path.resolve(
            //     __packageRootDir(__dirname()),
            //     'src/php/views/blade',
            // ),
            // // @ts-ignore
            // __path.resolve(__packageRootDir(__dirname()), 'src/php/views/twig'),
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
            const finalData = __deepMerge(data !== null && data !== void 0 ? data : {}, {});
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
        const handledViewsExtensions = Object.keys(SViewRenderer.engines);
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
                    const potentialViewGlob = `${rootDir}/${viewDotPath
                        .split('.')
                        .join('/')}.@(${handledViewsExtensions.join('|')})`;
                    const matches = __glob.sync(potentialViewGlob);
                    if (matches && matches.length) {
                        for (let j = 0; j < matches.length; j++) {
                            const potentialPath = matches[j];
                            // exclude .data files
                            if (potentialPath.match(/\.data\.[a-zA-Z0-9]+/)) {
                                continue;
                            }
                            finalViewPath = potentialPath;
                            break;
                        }
                    }
                    if (finalViewPath) {
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
    _loadSharedData() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            // quick and dirty thottle
            if (!this._needLoad) {
                return;
            }
            this._needLoad = false;
            setTimeout(() => {
                this._needLoad = true;
            }, 1000);
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
        });
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
            // load shared data
            yield this._loadSharedData();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBRW5ELE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBRzNDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3RELE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sZ0NBQWdDLE1BQU0sNENBQTRDLENBQUM7QUFzRTFGLGFBQWE7QUFDYixNQUFNLGFBQWMsU0FBUSxRQUFRO0lBbVBoQzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQXlCO1FBQ2pDLG9CQUFvQjtRQUNwQixLQUFLLENBQ0QsV0FBVztRQUNQLGFBQWE7UUFDYixnQ0FBZ0MsQ0FBQyxRQUFRLEVBQUUsRUFDM0MsUUFBUSxJQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO1FBVU4sWUFBTyxHQUFHLEtBQUssQ0FBQztRQXNJaEI7O1dBRUc7UUFDSCxjQUFTLEdBQUcsSUFBSSxDQUFDO1FBakpiLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFTLElBQUksQ0FBQyxXQUFZLENBQUMsV0FBVyxDQUN4RCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQy9CLENBQUM7UUFFRixzREFBc0Q7UUFDdEQsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEdBQUcsZUFBZSxFQUFFLDRCQUE0QixRQUFRLEVBQUUsT0FBTyxDQUFDO0lBQ2pHLENBQUM7SUFwUEQ7Ozs7Ozs7Ozs7T0FVRztJQUNILE1BQU0sS0FBSyxlQUFlO1FBQ3RCLE9BQU87WUFDSCxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUM7WUFDOUMsZ0JBQWdCO1lBQ2hCLGtCQUFrQjtZQUNsQixxQ0FBcUM7WUFDckMsNkJBQTZCO1lBQzdCLEtBQUs7WUFDTCxnQkFBZ0I7WUFDaEIsdUVBQXVFO1NBQzFFLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsR0FBRyxFQUFFO1FBQzVCLE9BQU8sUUFBUSxDQUFDO1lBQ1osR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNwRCxHQUFHLGFBQWEsQ0FBQyxlQUFlO1NBQ25DLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILE1BQU0sQ0FBQyxNQUFNLENBQ1QsUUFBZ0IsRUFDaEIsT0FBWSxJQUFJLEVBQ2hCLFFBQWlDO1FBRWpDLE9BQU8sSUFBSSxVQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTs7WUFDdEQsTUFBTSxZQUFZLEdBQUcsSUFBSSxhQUFhLENBQUMsV0FBVyxDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFcEUsTUFBTSxTQUFTLEdBQUcsV0FBVyxDQUFDLElBQUksYUFBSixJQUFJLGNBQUosSUFBSSxHQUFJLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUU5QyxJQUFJLFVBQVUsQ0FBQztZQUVmLFVBQVUsR0FBRyxNQUFNLFlBQVksQ0FBQyxNQUFNLENBQ2xDLFFBQVEsRUFDUixTQUFTLEVBQ1QsTUFBQSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsWUFBWSxtQ0FBSSxFQUFFLENBQy9CLENBQUM7WUFFRixJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDckIsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsTUFBTSxDQUFDLGNBQWMsQ0FDakIsV0FBbUIsRUFDbkIsVUFBOEI7UUFFOUIsdUNBQXVDO1FBQ3ZDLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDO1lBQ2xDLENBQUMsQ0FBQyxVQUFVO1lBQ1osQ0FBQyxDQUFDLFVBQVUsYUFBVixVQUFVLHVCQUFWLFVBQVUsQ0FBRSxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDbEQsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ2xCLElBQUksYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7Z0JBQUUsT0FBTztZQUV2QyxtQ0FBbUM7WUFDbkMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxXQUFXLENBQUM7UUFDN0MsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxNQUFNLENBQUMsaUJBQWlCLENBQ3BCLGFBQXFCLEVBQ3JCLFVBQTZCO1FBRTdCLHVDQUF1QztRQUN2QyxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztZQUNsQyxDQUFDLENBQUMsVUFBVTtZQUNaLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQ3ZCLElBQUksYUFBYSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7Z0JBQUUsT0FBTztZQUMvQyxtQ0FBbUM7WUFDbkMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxhQUFhLENBQUM7UUFDdkQsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDSCxNQUFNLENBQUMsWUFBWSxDQUFDLFFBQWdCO1FBQ2hDLE1BQU0sU0FBUyxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUU5RCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN2QyxNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFOUIsSUFBSSxJQUFJLEdBQUcsR0FBRyxRQUFRLElBQUksUUFBUSxFQUFFLENBQUM7WUFDckMsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUM3QixJQUFJLEdBQUcsUUFBUSxDQUFDO2FBQ25CO1lBRUQsSUFBSSxhQUFhLEVBQUUsUUFBUSxDQUFDO1lBRTVCLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDdkIsYUFBYSxHQUFHLElBQUksQ0FBQztnQkFDckIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3BELFFBQVEsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDckQ7aUJBQU07Z0JBQ0gsS0FDSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQ1QsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFDN0MsQ0FBQyxFQUFFLEVBQ0w7b0JBQ0UsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3hELElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksSUFBSSxTQUFTLEVBQUUsQ0FBQyxFQUFFO3dCQUN6QyxhQUFhLEdBQUcsR0FBRyxJQUFJLElBQUksU0FBUyxFQUFFLENBQUM7d0JBQ3ZDLFFBQVEsR0FBRyxTQUFTLENBQUM7d0JBQ3JCLE1BQU07cUJBQ1Q7aUJBQ0o7YUFDSjtZQUVELGtDQUFrQztZQUNsQyxJQUFJLENBQUMsYUFBYTtnQkFBRSxTQUFTO1lBRTdCLHdCQUF3QjtZQUN4QixNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBRTNDLG1CQUFtQjtZQUNuQixPQUFPLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUM3QjtRQUVELE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUF1REssS0FBSzs7WUFDUCxJQUFJLElBQUksQ0FBQyxPQUFPO2dCQUFFLE9BQU87WUFDekIsTUFBTSxjQUFjLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN4RSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDNUMsTUFBTSxJQUFJLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixhQUFhO2dCQUNiLE1BQU0sRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3BELFdBQVcsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7b0JBQ25DLGFBQWEsQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUNuRCxDQUFDLENBQUMsQ0FBQzthQUNOO1lBRUQsTUFBTSxtQkFBbUIsR0FDckIsY0FBYyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN2RCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsbUJBQW1CLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNqRCxNQUFNLElBQUksR0FBRyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEMsYUFBYTtnQkFDYixNQUFNLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxHQUFHLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN0RCxhQUFhLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO29CQUNyQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsYUFBYSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUN4RCxDQUFDLENBQUMsQ0FBQzthQUNOO1lBRUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDeEIsQ0FBQztLQUFBO0lBRUQsOEJBQThCLENBQUMsUUFBZ0I7UUFDM0MscUNBQXFDO1FBQ3JDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDaEUsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFeEQsTUFBTSxHQUFHLEdBQUcsSUFBSSxNQUFNLENBQUMsR0FBRyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1lBQ3hDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDcEIsNkJBQTZCO2dCQUM3QixPQUFPLGFBQWEsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3hDLE1BQU07YUFDVDtTQUNKO0lBQ0wsQ0FBQztJQUVELHdCQUF3QixDQUFDLFFBQWdCO1FBQ3JDLG1DQUFtQztRQUNuQyxLQUFLLElBQUksQ0FBQyxXQUFXLEVBQUUsYUFBYSxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FDbkQsYUFBYSxDQUFDLFNBQVMsQ0FDMUIsRUFBRTtZQUNDLElBQUkscUJBQXFCLEdBQUcsUUFBUSxDQUFDO1lBRXJDLEtBQUssSUFBSSxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUN2QyxhQUFhLENBQUMsT0FBTyxDQUN4QixFQUFFO2dCQUNDLGFBQWE7Z0JBQ2IsU0FBUyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtvQkFDakMsTUFBTSxHQUFHLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO29CQUNuQyxxQkFBcUIsR0FBRyxxQkFBcUIsQ0FBQyxPQUFPLENBQ2pELEdBQUcsRUFDSCxFQUFFLENBQ0wsQ0FBQztnQkFDTixDQUFDLENBQUMsQ0FBQzthQUNOO1lBRUQsZ0JBQWdCO1lBQ2hCLHFCQUFxQixJQUFJLFNBQVMsV0FBVyxFQUFFLENBQUM7WUFFaEQscUNBQXFDO1lBQ3JDLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLHFCQUFxQixFQUFFLENBQUMsRUFBRTtnQkFDN0MsT0FBTztvQkFDSCxZQUFZLEVBQUUsR0FBRyxxQkFBcUIsRUFBRTtvQkFDeEMsYUFBYTtpQkFDaEIsQ0FBQzthQUNMO1NBQ0o7SUFDTCxDQUFDO0lBRUQsaUJBQWlCLENBQUMsV0FBbUI7UUFDakMsSUFBSSxhQUFxQixDQUFDO1FBRTFCLE1BQU0sc0JBQXNCLEdBQWEsTUFBTSxDQUFDLElBQUksQ0FDaEQsYUFBYSxDQUFDLE9BQU8sQ0FDeEIsQ0FBQztRQUVGLHNEQUFzRDtRQUN0RCxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUMvQyxXQUFXLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3JELENBQUMsQ0FBQyxDQUFDO1FBRUgsa0VBQWtFO1FBQ2xFLElBQ0ksV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQztZQUNuQyxXQUFXLENBQUMsSUFBSSxFQUFFLEtBQUssV0FBVyxFQUNwQztZQUNFLDRDQUE0QztZQUM1QyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEVBQUU7Z0JBQ2hDLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsRUFBRTtvQkFDOUIsbUJBQW1CO29CQUNuQiw4RkFBOEY7b0JBQzlGLEtBQUs7b0JBQ0wsYUFBYSxHQUFHLFdBQVcsQ0FBQztpQkFDL0I7YUFDSjtpQkFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDbkMsYUFBYTtnQkFDYixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUNwRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDMUMsTUFBTSxpQkFBaUIsR0FBRyxHQUFHLE9BQU8sSUFBSSxXQUFXO3lCQUM5QyxLQUFLLENBQUMsR0FBRyxDQUFDO3lCQUNWLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztvQkFFeEQsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO29CQUMvQyxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFO3dCQUMzQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTs0QkFDckMsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUNqQyxzQkFBc0I7NEJBQ3RCLElBQUksYUFBYSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFO2dDQUM3QyxTQUFTOzZCQUNaOzRCQUNELGFBQWEsR0FBRyxhQUFhLENBQUM7NEJBQzlCLE1BQU07eUJBQ1Q7cUJBQ0o7b0JBQ0QsSUFBSSxhQUFhLEVBQUU7d0JBQ2YsTUFBTTtxQkFDVDtpQkFDSjthQUNKO1NBQ0o7YUFBTTtZQUNILG1CQUFtQjtZQUNuQix1SEFBdUg7WUFDdkgsS0FBSztTQUNSO1FBRUQsYUFBYTtRQUNiLE9BQU8sYUFBYSxDQUFDO0lBQ3pCLENBQUM7SUFNSyxlQUFlOzs7WUFDakIsMEJBQTBCO1lBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNqQixPQUFPO2FBQ1Y7WUFDRCxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN2QixVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNaLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQzFCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUVULHdCQUF3QjtZQUN4QixJQUFJLFVBQVUsR0FBRyxNQUFBLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxtQ0FBSSxFQUFFLENBQUM7WUFFaEQsY0FBYztZQUNkLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUU7Z0JBQy9CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQzNELE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN0RCxNQUFNLFNBQVMsR0FBRyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7b0JBQzVDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFO3dCQUNyQyxNQUFNLElBQUksS0FBSyxDQUNYLHNDQUFzQyxTQUFTLDRDQUE0QyxDQUM5RixDQUFDO3FCQUNMO29CQUNELE1BQU0sZUFBZSxHQUFHLE1BQU0sYUFBYSxDQUFDLFNBQVMsQ0FDakQsU0FBUyxDQUNaLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUNyQixJQUFJLGVBQWUsRUFBRTt3QkFDakIsVUFBVSxHQUFHLFdBQVcsQ0FBQyxVQUFVLEVBQUUsZUFBZSxDQUFDLENBQUM7cUJBQ3pEO2lCQUNKO2FBQ0o7WUFFRCx1QkFBdUI7WUFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7WUFFOUIsbUNBQW1DO1lBQ25DLGVBQWUsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsVUFBVSxDQUFDLENBQUM7O0tBQ3pEO0lBRUQ7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDSCxNQUFNLENBQ0YsV0FBbUIsRUFDbkIsSUFBSSxHQUFHLEVBQUUsRUFDVCxRQUEwQztRQUUxQyxPQUFPLElBQUksVUFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7O1lBQ3RELHVCQUF1QjtZQUN2QixNQUFNLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUVuQixtQkFBbUI7WUFDbkIsTUFBTSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7WUFFN0IsMEJBQTBCO1lBQzFCLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMxRCxJQUFJLENBQUMsYUFBYSxFQUFFO2dCQUNoQixNQUFNLElBQUksS0FBSyxDQUNYLCtDQUErQyxXQUFXLHNCQUFzQixDQUNuRixDQUFDO2FBQ0w7WUFFRCx5REFBeUQ7WUFDekQsTUFBTSxtQkFBbUIsR0FDckIsSUFBSSxDQUFDLDhCQUE4QixDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3ZELElBQUksQ0FBQyxtQkFBbUIsRUFBRTtnQkFDdEIsTUFBTSxJQUFJLEtBQUssQ0FDWCxpRUFBaUUsV0FBVyxNQUFNLENBQ3JGLENBQUM7YUFDTDtZQUVELDJCQUEyQjtZQUMzQixNQUFNLG9CQUFvQixHQUN0QixJQUFJLENBQUMsd0JBQXdCLENBQUMsYUFBYSxDQUFDLENBQUM7WUFFakQsTUFBTSxvQkFBb0IsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUN0QyxFQUFFLEVBQ3NCLENBQ3BCLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsSUFBSSxFQUFFLENBQUMsQ0FDN0MsQ0FDSixDQUFDO1lBRUYsTUFBTSxRQUFRLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztZQUVuQyxJQUFJLG9CQUFvQixFQUFFO2dCQUN0QixNQUFNLFVBQVUsR0FDWixNQUFNLG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ3pDLG9CQUFvQixDQUFDLFlBQVksQ0FDcEMsQ0FBQztnQkFDTixJQUFJLFVBQVU7b0JBQUUsSUFBSSxHQUFHLFdBQVcsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDeEQ7WUFFRCxNQUFNLGNBQWMsR0FBRyxXQUFXLENBQzlCLE1BQUEsTUFBQSxtQkFBbUIsQ0FBQyxTQUFTLDBDQUFFLFFBQVEsRUFBRSxtQ0FBSSxFQUFFLEVBQy9DLE1BQUEsb0JBQW9CLENBQUMsZUFBZSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsQ0FBQyxtQ0FDeEQsRUFBRSxDQUNULENBQUM7WUFFRixNQUFNLGdCQUFnQixHQUFHLElBQUksbUJBQW1CLENBQUMsY0FBYyxDQUFDLENBQUM7WUFFakUsSUFBSSxhQUFhLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQztZQUVqQyxhQUFhLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxDQUNuQyxhQUFhLEVBQ2IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQ3ZCLElBQUksQ0FBQyxtQkFBbUIsRUFDeEIsb0JBQW9CLENBQ3ZCLENBQUM7WUFDRixJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDcEIsTUFBTSxHQUFHLE1BQU0sYUFBYSxDQUFDO1lBRTdCLDZCQUE2QjtZQUM3QixNQUFNLE1BQU07Z0JBQ1IsNENBQTRDO2dCQUM1QyxJQUFJLEVBQUUsYUFBYSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsSUFDNUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxLQUNqQixLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFDbkIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLLEdBQ3RCLENBQUM7WUFDRixPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEIsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNQLENBQUM7O0FBN2hCRDs7Ozs7Ozs7O0dBU0c7QUFDSSxxQkFBTyxHQUFHLEVBQUUsQ0FBQztBQUVwQjs7Ozs7Ozs7O0dBU0c7QUFDSSx1QkFBUyxHQUFHLEVBQUUsQ0FBQztBQTBnQjFCLGVBQWUsYUFBYSxDQUFDIn0=