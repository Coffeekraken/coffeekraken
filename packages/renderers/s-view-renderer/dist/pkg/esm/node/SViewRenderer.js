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
// import __page404 from './pages/404';
import __SDataFileGeneric from '@coffeekraken/s-data-file-generic';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __unique } from '@coffeekraken/sugar/array';
import { __writeJsonSync } from '@coffeekraken/sugar/fs';
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
        return __SSugarConfig.get('viewRenderer.rootDirs');
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
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const viewInstance = new SViewRenderer(__deepMerge(settings !== null && settings !== void 0 ? settings : {}));
            const finalData = __deepMerge(data !== null && data !== void 0 ? data : {}, {});
            const result = yield viewInstance.render(viewPath, finalData, (_a = settings === null || settings === void 0 ? void 0 : settings.viewRenderer) !== null && _a !== void 0 ? _a : {});
            resolve(result);
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
            this._loaded = true;
        });
    }
    /**
     * Try to get the render engine class from the finalViewPath.
     */
    _getRendererEngineClassFromFinalViewPath(finalViewPath) {
        // try to get an engine for this view
        for (let i = 0; i < Object.keys(SViewRenderer.engines).length; i++) {
            const engineExt = Object.keys(SViewRenderer.engines)[i];
            const reg = new RegExp(`${engineExt}$`);
            if (reg.test(finalViewPath)) {
                // this._viewExt = engineExt;
                return SViewRenderer.engines[engineExt];
                break;
            }
        }
    }
    /**
     * Get the render engine class from the engine id
     */
    _getRendererEngineClassFromEngineId(engineId) {
        // try to get an engine for this view
        for (let [ext, EngineClass] of Object.entries(SViewRenderer.engines)) {
            if (EngineClass.id === engineId) {
                return EngineClass;
            }
        }
    }
    _getFinalViewPath(viewDotPath) {
        let finalViewPath;
        const handledViewsExtensions = Object.keys(SViewRenderer.engines);
        // direct view path
        if (__fs.existsSync(viewDotPath)) {
            return viewDotPath;
        }
        // direct from the rootDirs
        for (let i = 0; i < this.settings.rootDirs.length; i++) {
            const rootDir = this.settings.rootDirs[i];
            if (__fs.existsSync(`${rootDir}/${viewDotPath}`)) {
                return `${rootDir}/${viewDotPath}`;
            }
        }
        // doted path
        for (let i = 0; i < this.settings.rootDirs.length; i++) {
            const rootDir = this.settings.rootDirs[i], viewName = viewDotPath.split('.').slice(-1)[0], viewPath = viewDotPath.replace(/\./gm, '/'), globPart = `@(${handledViewsExtensions.join('|')})`;
            const potentialViewGlob1 = `${rootDir}/${viewPath}.${globPart}`, potentialViewGlob2 = `${rootDir}/${viewPath}/${viewName}.${globPart}`;
            let potentialPath;
            let matches = __glob.sync(potentialViewGlob1);
            if (matches && matches.length) {
                for (let j = 0; j < matches.length; j++) {
                    potentialPath = matches[j];
                    // exclude .data files
                    if (potentialPath.match(/\.data\.[a-zA-Z0-9]+/)) {
                        continue;
                    }
                    finalViewPath = potentialPath;
                    break;
                }
            }
            else {
                // try to add the name of the view again like
                // if it is stored in a folder with the same name
                // retry again with new glob string
                matches = __glob.sync(potentialViewGlob2);
                if (matches && matches.length) {
                    for (let j = 0; j < matches.length; j++) {
                        potentialPath = matches[j];
                        // exclude .data files
                        if (potentialPath.match(/\.data\.[a-zA-Z0-9]+/)) {
                            continue;
                        }
                        finalViewPath = potentialPath;
                        break;
                    }
                }
            }
            // @ts-ignore
            if (finalViewPath) {
                break;
            }
        }
        // // remove all the engines extensions from the viewPath
        // Object.keys(SViewRenderer.engines).forEach((ext) => {
        //     viewDotPath = viewDotPath.replace(`.${ext}`, '');
        // });
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
            else {
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
                    sharedData = __deepMerge(sharedData, yield __SDataFileGeneric.load(dataFilePath));
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
     * @param       {String|Object|Promise<Object>}        [data={}]       An object of data to use to render the view. If is a string, use the SDataGeneric class to resolve the data
     * @param       {Object}        [settings={}]     An object of settings that will be passed to the render engine method to use to override the default onces passed in the constructor. Check the used engine render documentation
     * @return      {SPromise}                    An SPromise instance that will be resolved once the rendering process has correctly finished
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    render(viewDotPath, data = {}, settings) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            let finalViewPath, finalViewRelPath;
            // ensure all is loaded
            yield this._load();
            // load shared data
            yield this._loadSharedData();
            if (__fs.existsSync(viewDotPath)) {
                // absolute view path
                finalViewPath = viewDotPath;
                finalViewRelPath = __path.basename(viewDotPath);
                // finalViewRelPath = viewDotPath.replace(
                //     `${__packageRootDir()}/`,
                //     '',
                // );
                // add a rootDir to handle absolute path
                this.settings.rootDirs.unshift(__path.dirname(viewDotPath));
            }
            // ensure viewDotPath is a dotPath and not something line path/my/view.twig
            viewDotPath = viewDotPath
                .replace(/\.(twig|blade.php|hbs|php|tpl|volt)$/, '')
                .replace(/\//gm, '.');
            // get the final settings
            const viewRendererSettings = Object.assign({}, (__deepMerge(this.settings, settings || {})));
            let RendererEngineClass, engine = viewRendererSettings.defaultEngine;
            if (viewDotPath.match(/^[a-z]+\:\/\//)) {
                const parts = viewDotPath.split('://');
                // @ts-ignore
                engine = parts[0];
                viewDotPath = parts[1];
            }
            // try to get the final view path
            if (!finalViewPath) {
                finalViewPath = this._getFinalViewPath(viewDotPath);
            }
            if (!__fs.existsSync(finalViewPath)) {
                return reject(`It seems that the view you passed "<cyan>${finalViewPath}</cyan>" does not exists...`);
            }
            // make sure the view has been found
            if (!finalViewPath) {
                throw new Error(`<red>[SViewRenderer]</red> Sorry but the requested view "<cyan>${viewDotPath}</cyan>" does not exists in any of these folders:\n${this.settings.rootDirs
                    .map((dir) => `- <cyan>${dir}</cyan>`)
                    .join('\n')}`);
            }
            // get the view renderer engine class for the passed view
            // try to get the engine class from the final view part
            if (finalViewPath && !RendererEngineClass) {
                RendererEngineClass =
                    this._getRendererEngineClassFromFinalViewPath(finalViewPath);
            }
            // if we don't have any RenderClass yet, get it from the passed engine of the default engine
            if (!RendererEngineClass) {
                RendererEngineClass =
                    this._getRendererEngineClassFromEngineId(engine);
            }
            if (!RendererEngineClass) {
                throw new Error(`<red>[render]</red> No engine is registered for your dotPath "${viewDotPath}"...`);
            }
            // use the generic data file class to load the data
            // if the passed data is a string
            if (typeof data === 'string') {
                data = yield __SDataFileGeneric.load(data);
            }
            else {
                // resolve data if is a promise
                data = yield data;
            }
            // load the .data.... view neighbour file
            data = __deepMerge((_a = (yield __SDataFileGeneric.load(finalViewPath))) !== null && _a !== void 0 ? _a : {}, data !== null && data !== void 0 ? data : {});
            const duration = new __SDuration();
            const engineSettings = __deepMerge((_c = (_b = RendererEngineClass.interface) === null || _b === void 0 ? void 0 : _b.defaults()) !== null && _c !== void 0 ? _c : {}, (_d = viewRendererSettings.enginesSettings[RendererEngineClass.id]) !== null && _d !== void 0 ? _d : {});
            const rendererInstance = new RendererEngineClass(engineSettings);
            let renderPromise, result, error;
            renderPromise = rendererInstance.render(finalViewRelPath !== null && finalViewRelPath !== void 0 ? finalViewRelPath : viewDotPath, Object.assign({}, data), this._sharedDataFilePath, viewRendererSettings);
            result = yield renderPromise;
            // stringify js errors
            if (result.error && result.error instanceof Error) {
                result.error = [
                    result.error.toString(),
                    ' ',
                    result.error.stack,
                ].join('\n');
            }
            // resolve the render process
            const resObj = Object.assign(Object.assign({}, duration.end()), { value: result.value, error: result.error });
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
export default SViewRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBRW5ELHVDQUF1QztBQUN2QyxPQUFPLGtCQUFrQixNQUFNLG1DQUFtQyxDQUFDO0FBRW5FLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDekQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDdEQsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxnQ0FBZ0MsTUFBTSw0Q0FBNEMsQ0FBQztBQXNFMUYsYUFBYTtBQUNiLE1BQU0sYUFBYyxTQUFRLFFBQVE7SUFxSWhDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBaUM7UUFDekMsb0JBQW9CO1FBQ3BCLEtBQUssQ0FDRCxXQUFXO1FBQ1AsYUFBYTtRQUNiLGdDQUFnQyxDQUFDLFFBQVEsRUFBRSxFQUMzQyxRQUFRLElBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUFVTixZQUFPLEdBQUcsS0FBSyxDQUFDO1FBNkloQjs7V0FFRztRQUNILGNBQVMsR0FBRyxJQUFJLENBQUM7UUF4SmIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQVMsSUFBSSxDQUFDLFdBQVksQ0FBQyxXQUFXLENBQ3hELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FDL0IsQ0FBQztRQUVGLHNEQUFzRDtRQUN0RCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsR0FBRyxlQUFlLEVBQUUsNEJBQTRCLFFBQVEsRUFBRSxPQUFPLENBQUM7SUFDakcsQ0FBQztJQWxKRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsTUFBTSxLQUFLLGVBQWU7UUFDdEIsT0FBTyxjQUFjLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEdBQUcsRUFBRTtRQUM1QixPQUFPLFFBQVEsQ0FBQztZQUNaLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDcEQsR0FBRyxhQUFhLENBQUMsZUFBZTtTQUNuQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxNQUFNLENBQUMsTUFBTSxDQUNULFFBQWdCLEVBQ2hCLE9BQVksSUFBSSxFQUNoQixRQUF5QztRQUV6QyxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLEVBQUU7O1lBQ2pDLE1BQU0sWUFBWSxHQUFHLElBQUksYUFBYSxDQUFDLFdBQVcsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBRXBFLE1BQU0sU0FBUyxHQUFHLFdBQVcsQ0FBQyxJQUFJLGFBQUosSUFBSSxjQUFKLElBQUksR0FBSSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFOUMsTUFBTSxNQUFNLEdBQUcsTUFBTSxZQUFZLENBQUMsTUFBTSxDQUNwQyxRQUFRLEVBQ1IsU0FBUyxFQUNULE1BQUEsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLFlBQVksbUNBQUksRUFBRSxDQUMvQixDQUFDO1lBRUYsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BCLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILE1BQU0sQ0FBQyxjQUFjLENBQ2pCLFdBQW1CLEVBQ25CLFVBQThCO1FBRTlCLHVDQUF1QztRQUN2QyxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztZQUNsQyxDQUFDLENBQUMsVUFBVTtZQUNaLENBQUMsQ0FBQyxVQUFVLGFBQVYsVUFBVSx1QkFBVixVQUFVLENBQUUsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ2xELElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNsQixJQUFJLGFBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO2dCQUFFLE9BQU87WUFFdkMsbUNBQW1DO1lBQ25DLGFBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsV0FBVyxDQUFDO1FBQzdDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQXVESyxLQUFLOztZQUNQLElBQUksSUFBSSxDQUFDLE9BQU87Z0JBQUUsT0FBTztZQUN6QixNQUFNLGNBQWMsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3hFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUM1QyxNQUFNLElBQUksR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLGFBQWE7Z0JBQ2IsTUFBTSxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsR0FBRyxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDcEQsV0FBVyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtvQkFDbkMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ25ELENBQUMsQ0FBQyxDQUFDO2FBQ047WUFFRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUN4QixDQUFDO0tBQUE7SUFFRDs7T0FFRztJQUNILHdDQUF3QyxDQUFDLGFBQXFCO1FBQzFELHFDQUFxQztRQUNyQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2hFLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hELE1BQU0sR0FBRyxHQUFHLElBQUksTUFBTSxDQUFDLEdBQUcsU0FBUyxHQUFHLENBQUMsQ0FBQztZQUN4QyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUU7Z0JBQ3pCLDZCQUE2QjtnQkFDN0IsT0FBTyxhQUFhLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUN4QyxNQUFNO2FBQ1Q7U0FDSjtJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNILG1DQUFtQyxDQUFDLFFBQWdCO1FBQ2hELHFDQUFxQztRQUNyQyxLQUFLLElBQUksQ0FBQyxHQUFHLEVBQUUsV0FBVyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDbEUsSUFBSSxXQUFXLENBQUMsRUFBRSxLQUFLLFFBQVEsRUFBRTtnQkFDN0IsT0FBTyxXQUFXLENBQUM7YUFDdEI7U0FDSjtJQUNMLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxXQUFtQjtRQUNqQyxJQUFJLGFBQXFCLENBQUM7UUFFMUIsTUFBTSxzQkFBc0IsR0FBYSxNQUFNLENBQUMsSUFBSSxDQUNoRCxhQUFhLENBQUMsT0FBTyxDQUN4QixDQUFDO1FBRUYsbUJBQW1CO1FBQ25CLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUM5QixPQUFPLFdBQVcsQ0FBQztTQUN0QjtRQUVELDJCQUEyQjtRQUMzQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3BELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFDLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLE9BQU8sSUFBSSxXQUFXLEVBQUUsQ0FBQyxFQUFFO2dCQUM5QyxPQUFPLEdBQUcsT0FBTyxJQUFJLFdBQVcsRUFBRSxDQUFDO2FBQ3RDO1NBQ0o7UUFFRCxhQUFhO1FBQ2IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNwRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFDckMsUUFBUSxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQzlDLFFBQVEsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFDM0MsUUFBUSxHQUFHLEtBQUssc0JBQXNCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFFeEQsTUFBTSxrQkFBa0IsR0FBRyxHQUFHLE9BQU8sSUFBSSxRQUFRLElBQUksUUFBUSxFQUFFLEVBQzNELGtCQUFrQixHQUFHLEdBQUcsT0FBTyxJQUFJLFFBQVEsSUFBSSxRQUFRLElBQUksUUFBUSxFQUFFLENBQUM7WUFFMUUsSUFBSSxhQUFhLENBQUM7WUFDbEIsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBRTlDLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUU7Z0JBQzNCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUNyQyxhQUFhLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMzQixzQkFBc0I7b0JBQ3RCLElBQUksYUFBYSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFO3dCQUM3QyxTQUFTO3FCQUNaO29CQUNELGFBQWEsR0FBRyxhQUFhLENBQUM7b0JBQzlCLE1BQU07aUJBQ1Q7YUFDSjtpQkFBTTtnQkFDSCw2Q0FBNkM7Z0JBQzdDLGlEQUFpRDtnQkFDakQsbUNBQW1DO2dCQUNuQyxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2dCQUMxQyxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFO29CQUMzQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTt3QkFDckMsYUFBYSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDM0Isc0JBQXNCO3dCQUN0QixJQUFJLGFBQWEsQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUMsRUFBRTs0QkFDN0MsU0FBUzt5QkFDWjt3QkFDRCxhQUFhLEdBQUcsYUFBYSxDQUFDO3dCQUM5QixNQUFNO3FCQUNUO2lCQUNKO2FBQ0o7WUFFRCxhQUFhO1lBQ2IsSUFBSSxhQUFhLEVBQUU7Z0JBQ2YsTUFBTTthQUNUO1NBQ0o7UUFFRCx5REFBeUQ7UUFDekQsd0RBQXdEO1FBQ3hELHdEQUF3RDtRQUN4RCxNQUFNO1FBRU4sa0VBQWtFO1FBQ2xFLElBQ0ksV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQztZQUNuQyxXQUFXLENBQUMsSUFBSSxFQUFFLEtBQUssV0FBVyxFQUNwQztZQUNFLDRDQUE0QztZQUM1QyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEVBQUU7Z0JBQ2hDLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsRUFBRTtvQkFDOUIsbUJBQW1CO29CQUNuQiw4RkFBOEY7b0JBQzlGLEtBQUs7b0JBQ0wsYUFBYSxHQUFHLFdBQVcsQ0FBQztpQkFDL0I7YUFDSjtpQkFBTTthQUNOO1NBQ0o7YUFBTTtZQUNILG1CQUFtQjtZQUNuQix1SEFBdUg7WUFDdkgsS0FBSztTQUNSO1FBRUQsYUFBYTtRQUNiLE9BQU8sYUFBYSxDQUFDO0lBQ3pCLENBQUM7SUFNSyxlQUFlOzs7WUFDakIsMEJBQTBCO1lBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNqQixPQUFPO2FBQ1Y7WUFDRCxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN2QixVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNaLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQzFCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUVULHdCQUF3QjtZQUN4QixJQUFJLFVBQVUsR0FBRyxNQUFBLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxtQ0FBSSxFQUFFLENBQUM7WUFFaEQsY0FBYztZQUNkLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUU7Z0JBQy9CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQzNELE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN0RCxVQUFVLEdBQUcsV0FBVyxDQUNwQixVQUFVLEVBQ1YsTUFBTSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQzlDLENBQUM7aUJBQ0w7YUFDSjtZQUVELHVCQUF1QjtZQUN2QixJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQztZQUU5QixtQ0FBbUM7WUFDbkMsZUFBZSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxVQUFVLENBQUMsQ0FBQzs7S0FDekQ7SUFFRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNILE1BQU0sQ0FDRixXQUFtQixFQUNuQixPQUFvQyxFQUFFLEVBQ3RDLFFBQTBDO1FBRTFDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7O1lBQ3pDLElBQUksYUFBYSxFQUFFLGdCQUFnQixDQUFDO1lBRXBDLHVCQUF1QjtZQUN2QixNQUFNLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUVuQixtQkFBbUI7WUFDbkIsTUFBTSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7WUFFN0IsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFFO2dCQUM5QixxQkFBcUI7Z0JBQ3JCLGFBQWEsR0FBRyxXQUFXLENBQUM7Z0JBQzVCLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ2hELDBDQUEwQztnQkFDMUMsZ0NBQWdDO2dCQUNoQyxVQUFVO2dCQUNWLEtBQUs7Z0JBQ0wsd0NBQXdDO2dCQUN4QyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2FBQy9EO1lBRUQsMkVBQTJFO1lBQzNFLFdBQVcsR0FBRyxXQUFXO2lCQUNwQixPQUFPLENBQUMsc0NBQXNDLEVBQUUsRUFBRSxDQUFDO2lCQUNuRCxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBRTFCLHlCQUF5QjtZQUN6QixNQUFNLG9CQUFvQixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQ3RDLEVBQUUsRUFDc0IsQ0FDcEIsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsUUFBUSxJQUFJLEVBQUUsQ0FBQyxDQUM3QyxDQUNKLENBQUM7WUFFRixJQUFJLG1CQUFtQixFQUNuQixNQUFNLEdBQUcsb0JBQW9CLENBQUMsYUFBYSxDQUFDO1lBRWhELElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsRUFBRTtnQkFDcEMsTUFBTSxLQUFLLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDdkMsYUFBYTtnQkFDYixNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsQixXQUFXLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzFCO1lBRUQsaUNBQWlDO1lBQ2pDLElBQUksQ0FBQyxhQUFhLEVBQUU7Z0JBQ2hCLGFBQWEsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDdkQ7WUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsRUFBRTtnQkFDakMsT0FBTyxNQUFNLENBQ1QsNENBQTRDLGFBQWEsNkJBQTZCLENBQ3pGLENBQUM7YUFDTDtZQUVELG9DQUFvQztZQUNwQyxJQUFJLENBQUMsYUFBYSxFQUFFO2dCQUNoQixNQUFNLElBQUksS0FBSyxDQUNYLGtFQUFrRSxXQUFXLHNEQUFzRCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVE7cUJBQ3BKLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQztxQkFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQ3BCLENBQUM7YUFDTDtZQUVELHlEQUF5RDtZQUN6RCx1REFBdUQ7WUFDdkQsSUFBSSxhQUFhLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtnQkFDdkMsbUJBQW1CO29CQUNmLElBQUksQ0FBQyx3Q0FBd0MsQ0FDekMsYUFBYSxDQUNoQixDQUFDO2FBQ1Q7WUFFRCw0RkFBNEY7WUFDNUYsSUFBSSxDQUFDLG1CQUFtQixFQUFFO2dCQUN0QixtQkFBbUI7b0JBQ2YsSUFBSSxDQUFDLG1DQUFtQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3hEO1lBRUQsSUFBSSxDQUFDLG1CQUFtQixFQUFFO2dCQUN0QixNQUFNLElBQUksS0FBSyxDQUNYLGlFQUFpRSxXQUFXLE1BQU0sQ0FDckYsQ0FBQzthQUNMO1lBRUQsbURBQW1EO1lBQ25ELGlDQUFpQztZQUNqQyxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtnQkFDMUIsSUFBSSxHQUFHLE1BQU0sa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzlDO2lCQUFNO2dCQUNILCtCQUErQjtnQkFDL0IsSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDO2FBQ3JCO1lBRUQseUNBQXlDO1lBQ3pDLElBQUksR0FBRyxXQUFXLENBQ2QsTUFBQSxDQUFDLE1BQU0sa0JBQWtCLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLG1DQUFJLEVBQUUsRUFDcEQsSUFBSSxhQUFKLElBQUksY0FBSixJQUFJLEdBQUksRUFBRSxDQUNiLENBQUM7WUFFRixNQUFNLFFBQVEsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1lBRW5DLE1BQU0sY0FBYyxHQUFHLFdBQVcsQ0FDOUIsTUFBQSxNQUFBLG1CQUFtQixDQUFDLFNBQVMsMENBQUUsUUFBUSxFQUFFLG1DQUFJLEVBQUUsRUFDL0MsTUFBQSxvQkFBb0IsQ0FBQyxlQUFlLENBQUMsbUJBQW1CLENBQUMsRUFBRSxDQUFDLG1DQUN4RCxFQUFFLENBQ1QsQ0FBQztZQUVGLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxtQkFBbUIsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUVqRSxJQUFJLGFBQWEsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDO1lBQ2pDLGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLENBQ25DLGdCQUFnQixhQUFoQixnQkFBZ0IsY0FBaEIsZ0JBQWdCLEdBQUksV0FBVyxFQUMvQixNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFDdkIsSUFBSSxDQUFDLG1CQUFtQixFQUN4QixvQkFBb0IsQ0FDdkIsQ0FBQztZQUNGLE1BQU0sR0FBRyxNQUFNLGFBQWEsQ0FBQztZQUU3QixzQkFBc0I7WUFDdEIsSUFBSSxNQUFNLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQyxLQUFLLFlBQVksS0FBSyxFQUFFO2dCQUMvQyxNQUFNLENBQUMsS0FBSyxHQUFHO29CQUNYLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO29CQUN2QixHQUFHO29CQUNILE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSztpQkFDckIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDaEI7WUFFRCw2QkFBNkI7WUFDN0IsTUFBTSxNQUFNLG1DQUVMLFFBQVEsQ0FBQyxHQUFHLEVBQUUsS0FDakIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQ25CLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSyxHQUN0QixDQUFDO1lBRUYsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BCLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDUCxDQUFDOztBQTllRDs7Ozs7Ozs7O0dBU0c7QUFDSSxxQkFBTyxHQUFHLEVBQUUsQ0FBQztBQXVleEIsZUFBZSxhQUFhLENBQUMifQ==