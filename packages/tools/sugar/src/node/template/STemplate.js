"use strict";
// @ts-nocheck
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
const unique_1 = __importDefault(require("../array/unique"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const sugar_1 = __importDefault(require("../config/sugar"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const SError_1 = __importDefault(require("../error/SError"));
const glob_1 = __importDefault(require("glob"));
const STemplateEngine_1 = __importDefault(require("./engines/STemplateEngine"));
const SPromise_1 = __importDefault(require("../promise/SPromise"));
/**
 * @name          STemplate
 * @namespace     sugar.node.template
 * @type          Class
 * @wip
 *
 * This class represent a template that can be rendered using all the supported render engines listed in the features bellow.
 *
 * @feature       2.0.0         Support for ```bladePhp``` render engine
 * @feature       2.0.0         Simply render your template using the ```render``` method that returns you back a nice SPromise instance resolved once the template has been rendered correctly
 *
 * @param       {String}        viewPathOrTemplateString      The view doted file path relative to the ```rootDir``` setting, or directly a template string to render using the engine specify in ```engine``` setting...
 * @param       {Object}        [settings={}]           An object of settings to configure your template rendering process:
 * - rootDir (@config.views.rootDir) {String}: Specify either 1 rootDir in which to search for your view, or an Array of rootDir to search in
 * - engine (null) {String|STemplateEngine}: Specify the engine to use in order to render your template. By default it will try to automatically detect the engine but you can specify it yourself. Can be a string like "blade.php" that identify a registered template engine, or directly an STemplateEngine based template engine instance
 * - engineSettings ({}) {Object}: Specify some settings that will be passed to the corresponding engine
 * - defaultData ({}) {Object}: A data object to use by default when calling the ```render``` method. Can be overrided obviously in the ```render``` method
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import STemplate from '@coffeekraken/sugar/node/template/STemplate';
 * const myTemplate = new STemplate('my.cool.view', {
 *    title: 'Hello'
 * }, {
 *    engine: 'blade'
 * });
 * const result = await myTemplate.render({
 *    title: 'World'
 * });
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class STemplate {
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
    constructor(viewPathOrTemplateString, settings = {}) {
        /**
         * @name      _settings
         * @type      Object
         * @private
         *
         * Store the passed settings
         *
         * @since     2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._settings = {};
        /**
         * @name      _viewPath
         * @type      String
         * @default   null
         * @private
         *
         * Store the view doted path if the passed parameter is a valid path
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._viewPath = null;
        /**
         * @name      _templateString
         * @type      String
         * @default    null
         * @private
         *
         * Store the template string if the passed view is a template string and not a view path
         *
         * @since     2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._templateString = null;
        /**
         * @name      _engineInstance
         * @type      __STemplateEngine
         * @private
         *
         * Store the engine instance used to render the passed template
         *
         * @since     2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._engineInstance = null;
        // save the settings
        this._settings = deepMerge_1.default({
            id: 'STemplate',
            rootDirs: [],
            engine: null,
            engineSettings: {},
            defaultData: {}
        }, settings);
        this._settings.rootDirs = this.constructor.getRootDirs(settings.rootDirs || []);
        Object.keys(STemplate.engines).forEach((ext) => {
            viewPathOrTemplateString = viewPathOrTemplateString.replace(`.${ext}`, '');
        });
        // if the "engine" setting is an instance, save it as engineInstance
        if (this._settings.engine instanceof STemplateEngine_1.default) {
            this._engineInstance = this._settings.engine;
        }
        // detect and save the view doted path or the view template string
        if (viewPathOrTemplateString.split(' ').length === 1 &&
            viewPathOrTemplateString.trim() === viewPathOrTemplateString) {
            // check if we can find the view path passed
            if (path_1.default.isAbsolute(viewPathOrTemplateString)) {
                if (!fs_1.default.existsSync(viewPathOrTemplateString)) {
                    throw new SError_1.default(`Sorry but the absolute path to the view "<cyan>${viewPathOrTemplateString}</cyan>" does not exist...`);
                }
                this._viewPath = viewPathOrTemplateString;
            }
            else if (!viewPathOrTemplateString.match(/\//gm)) {
                // doted path
                for (let i = 0; i < this._settings.rootDirs.length; i++) {
                    const rootDir = this._settings.rootDirs[i];
                    const viewPath = `${rootDir}/${viewPathOrTemplateString
                        .split('.')
                        .join('/')}.[!data]*`;
                    const matches = glob_1.default.sync(viewPath);
                    if (matches && matches.length) {
                        this._viewPath = matches[0];
                        const extension = this._viewPath.split('.').slice(1).join('.');
                        if (!this._settings.engine)
                            this._settings.engine = extension;
                        break;
                    }
                }
                if (!this._viewPath) {
                    throw new SError_1.default(`Sorry but the passed dot path "<cyan>${viewPathOrTemplateString}</cyan>" does not resolve to any existing views...`);
                }
            }
            else {
            }
        }
        else {
            this._templateString = viewPathOrTemplateString;
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
            ...STemplate.defaultRootDirs
        ]);
    }
    /**
     * @name      registerEngine
     * @type      Function
     * @static
     *
     * This static method can be used to register a compatible __STemplateEngine engine class
     * into the available STemplate engines.
     *
     * @param       {String}        extension       The file extension to detect the engine. For example "blade.php" will be used to render all the files names "%name.blade.php"
     * @param       {String}        enginePath      The absolute path to the engine class file
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static registerEngine(extension, enginePath) {
        if (enginePath.slice(-3) !== '.js')
            enginePath += '.js';
        // make sure the engine path exists
        if (!fs_1.default.existsSync(enginePath)) {
            throw new SError_1.default(`Sorry but the engine "<yellow>${extension}</yellow>" that you want to register using the path "<cyan>${enginePath}</cyan>" does not exists...`);
        }
        // register the engine in the stack
        STemplate.engines[extension] = enginePath;
    }
    /**
     * @name      registerDataHandler
     * @type      Function
     * @static
     *
     * This static method can be used to register a compatible __STemplateEngine engine class
     * into the available STemplate engines.
     *
     * @param       {String}        extension       The file extension to detect the engine. For example "blade.php" will be used to render all the files names "%name.blade.php"
     * @param       {String}        handlerPath      The absolute path to the engine class file
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static registerDataHandler(extension, handlerPath) {
        if (handlerPath.slice(-3) !== '.js')
            handlerPath += '.js';
        // make sure the engine path exists
        if (!fs_1.default.existsSync(handlerPath)) {
            throw new SError_1.default(`Sorry but the data handler "<yellow>${extension}</yellow>" that you want to register using the path "<cyan>${handlerPath}</cyan>" does not exists...`);
        }
        // register the engine in the stack
        STemplate.dataHandlers[extension] = handlerPath;
    }
    /**
     * @name					getViewInfo
     * @type 					Function
     * @static
     *
     * This static method allows you to give a "potential" view path (with or without the extension) and get
     * back an object that describe the view with infos like "type", "path", "extension", etc...
     * If nothing is found, you will get ```false``` back.
     *
     * @param       {String}      viewPath        The view path to check. Either a relative path to the @config.frontend.viewsDir configuration, or an absolute path
     * @return      {Object|Boolean}              Return an object describing the view or ```false``` if not found
     *
     * @since
     * @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static getViewInfo(viewPath) {
        const viewsDir = sugar_1.default('views.rootDir');
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
            for (let i = 0; i < Object.keys(STemplate.engines).length; i++) {
                const engineExt = Object.keys(STemplate.engines)[i];
                if (fs_1.default.existsSync(`${path}.${engineExt}`)) {
                    finalViewPath = `${path}.${engineExt}`;
                    viewType = engineExt;
                    break;
                }
            }
        }
        // check if we have a view founded
        if (!finalViewPath)
            return false;
        // build the info object
        const infoObj = {
            path: finalViewPath,
            relPath: path_1.default.relative(viewsDir, finalViewPath),
            type: viewType
        };
        // return the infos
        return infoObj;
    }
    /**
     * @name          render
     * @type          Function
     * @async
     *
     * Main method to render your view by passing it an object of data to use as well as an object of settings to override the default passed onces
     *
     * @param       {Object}        [data={}]       An object of data to use to render the view.
     * @param       {Object}        [settings={}]     An object of settings that will be passed to the render engine method to use to override the default onces passed in the constructor. Check the used engine render documentation
     * @return      {SPromise}                    An SPromise instance that will be resolved once the rendering process has correctly finished
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    render(data = {}, settings = {}) {
        return new SPromise_1.default(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            settings = deepMerge_1.default(this._settings, settings);
            data = deepMerge_1.default(settings.defaultData, data);
            if (this._templateString) {
                if (!settings.engine) {
                    // loop on the engines to get the better one
                    for (let i = 0; i < Object.keys(STemplate.engines).length; i++) {
                        const enginePath = STemplate.engines[Object.keys(STemplate.engines)[i]];
                        const EngineClass = require(enginePath);
                        if (EngineClass.input === 'string' &&
                            EngineClass.canRender(this._templateString)) {
                            settings.engine = Object.keys(STemplate.engines)[i];
                            break;
                        }
                    }
                }
                else if (this._settings.engine instanceof STemplateEngine_1.default) {
                    if (!settings.engine.constructor.canRender(this._templateString)) {
                        return reject(`It seems that you've passed directly an __STemplateEngine engine as the settings.engine option but this engine cannot render your passed template string...`);
                    }
                }
                if (!settings.engine) {
                    return reject(`Sorry but it seems that the passed template string cannot be rendered using any of the available engines:\n- ${Object.keys(STemplate.engines)
                        .map((l) => {
                        return `<yellow>${l}</yellow>`;
                    })
                        .join('\n- ')}`);
                }
            }
            else if (this._viewPath) {
                const viewPathWithoutExtension = this._viewPath.replace(`.${settings.engine}`, '');
                // loop on each dataHandlers available
                let dataHandlerFn, dataFilePath;
                Object.keys(STemplate.dataHandlers).forEach((extension) => {
                    if (dataHandlerFn)
                        return;
                    if (fs_1.default.existsSync(`${viewPathWithoutExtension}.${extension}`)) {
                        dataFilePath = `${viewPathWithoutExtension}.${extension}`;
                        dataHandlerFn = require(STemplate.dataHandlers[extension]);
                    }
                });
                // check if we have a data file
                if (dataFilePath && dataHandlerFn) {
                    const dataObj = yield dataHandlerFn(dataFilePath);
                    data = deepMerge_1.default(dataObj, data);
                }
            }
            if (!this._engineInstance) {
                // get the engine class
                const EngineClass = require(STemplate.engines[settings.engine]);
                this._engineInstance = new EngineClass(Object.assign({}, settings.engineSettings));
            }
            const renderPromise = this._engineInstance.render(this._viewPath || this._templateString, data, settings);
            const result = yield renderPromise;
            if (renderPromise.isRejected()) {
                return reject({
                    view: this._viewPath,
                    engine: settings.engine,
                    content: '0cc'
                });
            }
            // resolve the render process
            resolve({
                view: this._viewPath,
                engine: settings.engine,
                content: result
            });
        }), {
            id: settings.id + '.render'
        });
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
STemplate.engines = {};
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
STemplate.dataHandlers = {};
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
STemplate.defaultRootDirs = [
    sugar_1.default('views.rootDir'),
    path_1.default.resolve(__dirname, '../../php/views/blade')
];
const defaultEngines = sugar_1.default('views.engines') || {};
Object.keys(defaultEngines).forEach((extension) => {
    STemplate.registerEngine(extension, defaultEngines[extension]);
});
const defaultDataHandlers = sugar_1.default('views.dataHandlers') || {};
Object.keys(defaultDataHandlers).forEach((extension) => {
    STemplate.registerDataHandler(extension, defaultDataHandlers[extension]);
});
module.exports = STemplate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RlbXBsYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1RlbXBsYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7O0FBRWQsNkRBQXVDO0FBQ3ZDLG9FQUE4QztBQUM5Qyw0REFBNEM7QUFDNUMsZ0RBQTBCO0FBQzFCLDRDQUFzQjtBQUN0Qiw2REFBdUM7QUFDdkMsZ0RBQTBCO0FBQzFCLGdGQUEwRDtBQUMxRCxtRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUNHO0FBQ0gsTUFBTSxTQUFTO0lBd05iOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksd0JBQXdCLEVBQUUsUUFBUSxHQUFHLEVBQUU7UUFqT25EOzs7Ozs7Ozs7V0FTRztRQUNILGNBQVMsR0FBRyxFQUFFLENBQUM7UUFFZjs7Ozs7Ozs7OztXQVVHO1FBQ0gsY0FBUyxHQUFHLElBQUksQ0FBQztRQUVqQjs7Ozs7Ozs7OztXQVVHO1FBQ0gsb0JBQWUsR0FBRyxJQUFJLENBQUM7UUFFdkI7Ozs7Ozs7OztXQVNHO1FBQ0gsb0JBQWUsR0FBRyxJQUFJLENBQUM7UUFrTHJCLG9CQUFvQjtRQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLG1CQUFXLENBQzFCO1lBQ0UsRUFBRSxFQUFFLFdBQVc7WUFDZixRQUFRLEVBQUUsRUFBRTtZQUNaLE1BQU0sRUFBRSxJQUFJO1lBQ1osY0FBYyxFQUFFLEVBQUU7WUFDbEIsV0FBVyxFQUFFLEVBQUU7U0FDaEIsRUFDRCxRQUFRLENBQ1QsQ0FBQztRQUNGLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUNwRCxRQUFRLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FDeEIsQ0FBQztRQUVGLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lB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