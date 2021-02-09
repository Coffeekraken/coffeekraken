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
const unique_1 = __importDefault(require("../array/unique"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const sugar_1 = __importDefault(require("../config/sugar"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const SError_1 = __importDefault(require("../error/SError"));
const glob_1 = __importDefault(require("glob"));
const STemplateEngine_1 = __importDefault(require("./engines/STemplateEngine"));
const SClass_1 = __importDefault(require("../class/SClass"));
const SPromise_1 = __importDefault(require("../promise/SPromise"));
// @ts-ignore
class STemplate extends SClass_1.default {
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
    constructor(viewPathOrTemplateString, settings) {
        // save the settings
        super(deepMerge_1.default({
            id: 'STemplate',
            template: {
                rootDirs: [],
                engine: null,
                engineSettings: {},
                defaultData: {}
            }
        }, settings || {}));
        this.templateSettings.rootDirs = this.constructor.getRootDirs(this.templateSettings.rootDirs || []);
        Object.keys(STemplate.engines).forEach((ext) => {
            viewPathOrTemplateString = viewPathOrTemplateString.replace(`.${ext}`, '');
        });
        // if the "engine" setting is an instance, save it as engineInstance
        if (typeof this.templateSettings.engine !== 'string' &&
            this.templateSettings.engine instanceof STemplateEngine_1.default) {
            this._engineInstance = this.templateSettings.engine;
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
                for (let i = 0; i < this.templateSettings.rootDirs.length; i++) {
                    const rootDir = this.templateSettings.rootDirs[i];
                    const viewPath = `${rootDir}/${viewPathOrTemplateString
                        .split('.')
                        .join('/')}.[!data]*`;
                    const matches = glob_1.default.sync(viewPath);
                    if (matches && matches.length) {
                        this._viewPath = matches[0];
                        const extension = this._viewPath.split('.').slice(1).join('.');
                        if (!this.templateSettings.engine)
                            this.templateSettings.engine = extension;
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
    static registerEngine(enginePath) {
        if (!enginePath.match(/\.js$/))
            enginePath += '.js';
        // make sure the engine path exists
        if (!fs_1.default.existsSync(enginePath)) {
            throw new SError_1.default(`Sorry but the engine "<yellow>${enginePath}</yellow>" that you want to register does not exists...`);
        }
        // get the engine class
        const EngineClass = require(enginePath);
        // make sure we have names defined
        if (!EngineClass.names ||
            !Array.isArray(EngineClass.names) ||
            !EngineClass.names.length) {
            throw new Error(`You try to register an STemplate engine with the class "<yellow>${EngineClass.name}</yellow>" but you forgot to specify the static property "<cyan>names</cyan>" with something like "<green>['twig.js','twig']</green>"...`);
        }
        // register the engine under each names
        EngineClass.names.forEach((name) => {
            // register the engine in the stack
            STemplate.engines[name] = EngineClass;
        });
    }
    /**
     * @name      registerDataHandler
     * @type      Function
     * @static
     *
     * This static method can be used to register a compatible __STemplateEngine engine class
     * into the available STemplate engines.
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
            throw new SError_1.default(`Sorry but the data handler "<yellow>${handlerPath}</yellow>" that you want to register does not exists...`);
        }
        // get the engine class
        const HandlerClass = require(handlerPath).default;
        // make sure we have extensions defined
        if (!HandlerClass.extensions ||
            !Array.isArray(HandlerClass.extensions) ||
            !HandlerClass.extensions.length) {
            throw new Error(`You try to register an STemplate data handler with the class "<yellow>${HandlerClass.name}</yellow>" but you forgot to specify the property "<cyan>extensions</cyan>" with something like "<green>['json','js']</green>"...`);
        }
        // register the engine under each names
        HandlerClass.extensions.forEach((extension) => {
            // register the engine in the stack
            STemplate.dataHandlers[extension] = HandlerClass;
        });
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
     * @name      templateSettings
     * @type      ISTemplateSettings
     * @get
     *
     * Access the template settings
     *
     * @since     2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get templateSettings() {
        return this._settings.template;
    }
    /**
     * @name          _getEngineByName
     * @type          Function
     * @private
     *
     * This method take an engine name and tries to returns you the engine instance
     * registered in the stack
     *
     * @param     {String}    name    The engine name wanted
     * @return    {STemplateEngine|undefined}     The engine class or undefined
     *
     * @since     2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _getEngineByName(name) {
        if (STemplate.engines[name] !== undefined)
            return STemplate.engines[name];
        else if (name.includes('.')) {
            const engineName = name.split('.')[0];
            if (STemplate.engines[engineName])
                return STemplate.engines[engineName];
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
     * @param       {Object}        [data={}]       An object of data to use to render the view.
     * @param       {Object}        [settings={}]     An object of settings that will be passed to the render engine method to use to override the default onces passed in the constructor. Check the used engine render documentation
     * @return      {SPromise}                    An SPromise instance that will be resolved once the rendering process has correctly finished
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    render(data = {}, settings) {
        return new SPromise_1.default(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            const renderSettings = (deepMerge_1.default(this.templateSettings, settings || {}));
            data = deepMerge_1.default(renderSettings.defaultData, data);
            if (this._templateString) {
                if (!renderSettings.engine) {
                    // loop on the engines to get the better one
                    for (let i = 0; i < Object.keys(STemplate.engines).length; i++) {
                        const enginePath = STemplate.engines[Object.keys(STemplate.engines)[i]];
                        const EngineClass = require(enginePath);
                        if (EngineClass.input === 'string' &&
                            EngineClass.canRender(this._templateString)) {
                            renderSettings.engine = Object.keys(STemplate.engines)[i];
                            break;
                        }
                    }
                }
                else if (renderSettings.engine instanceof STemplateEngine_1.default) {
                    if (!renderSettings.engine.constructor.canRender(this._templateString)) {
                        return reject(`It seems that you've passed directly an __STemplateEngine engine as the settings.engine option but this engine cannot render your passed template string...`);
                    }
                }
                if (!renderSettings.engine) {
                    return reject(`Sorry but it seems that the passed template string cannot be rendered using any of the available engines:\n- ${Object.keys(STemplate.engines)
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
            if (!this._engineInstance &&
                typeof renderSettings.engine === 'string') {
                // get the engine class
                const EngineClass = this._getEngineByName(renderSettings.engine);
                if (EngineClass) {
                    this._engineInstance = new EngineClass(renderSettings.engineSettings || {});
                }
            }
            if (this._engineInstance) {
                const renderPromise = this._engineInstance.render(this._viewPath || this._templateString || '', data, renderSettings);
                const result = yield renderPromise;
                if (renderPromise.isRejected()) {
                    return reject({
                        view: this._viewPath,
                        engine: renderSettings.engine,
                        content: '0cc'
                    });
                }
                // resolve the render process
                resolve({
                    view: this._viewPath,
                    engine: renderSettings.engine,
                    content: result
                });
            }
        }), {
            id: this.id + '.render'
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
Object.keys(defaultEngines).forEach((name) => {
    STemplate.registerEngine(defaultEngines[name]);
});
const defaultDataHandlers = sugar_1.default('views.dataHandlers') || {};
Object.keys(defaultDataHandlers).forEach((name) => {
    STemplate.registerDataHandler(defaultDataHandlers[name]);
});
const cls = STemplate;
exports.default = STemplate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RlbXBsYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1RlbXBsYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkRBQXVDO0FBQ3ZDLG9FQUE4QztBQUM5Qyw0REFBNEM7QUFDNUMsZ0RBQTBCO0FBQzFCLDRDQUFzQjtBQUN0Qiw2REFBdUM7QUFDdkMsZ0RBQTBCO0FBQzFCLGdGQUEwRDtBQUMxRCw2REFBdUM7QUFFdkMsbUVBQTREO0FBNkU1RCxhQUFhO0FBQ2IsTUFBTSxTQUFVLFNBQVEsZ0JBQVE7SUF3UDlCOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksd0JBQXdCLEVBQUUsUUFBaUM7UUFDckUsb0JBQW9CO1FBQ3BCLEtBQUssQ0FDSCxtQkFBVyxDQUNUO1lBQ0UsRUFBRSxFQUFFLFdBQVc7WUFDZixRQUFRLEVBQUU7Z0JBQ1IsUUFBUSxFQUFFLEVBQUU7Z0JBQ1osTUFBTSxFQUFFLElBQUk7Z0JBQ1osY0FBYyxFQUFFLEVBQUU7Z0JBQ2xCLFdBQVcsRUFBRSxFQUFFO2FBQ2hCO1NBQ0YsRUFDRCxRQUFRLElBQUksRUFBRSxDQUNmLENBQ0YsQ0FBQztRQUNGLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEdBQVMsSUFBSSxDQUFDLFdBQVksQ0FBQyxXQUFXLENBQ2xFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUNyQyxDQUFDO1FBRUYsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDN0Msd0JBQXdCLEdBQUcsd0JBQXdCLENBQUMsT0FBTyxDQUN6RCxJQUFJLEdBQUcsRUFBRSxFQUNULEVBQUUsQ0FDSCxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7UUFFSCxvRUFBb0U7UUFDcEUsSUFDRSxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEtBQUssUUFBUTtZQUNoRCxJ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