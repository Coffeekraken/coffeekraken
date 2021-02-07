"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.SJsFileCtorSettingsInterface = exports.SJsFileSettingsInterface = void 0;
const SFile_1 = __importDefault(require("../fs/SFile"));
const SDuration_1 = __importDefault(require("../time/SDuration"));
const path_1 = __importDefault(require("path"));
const SPromise_1 = __importDefault(require("../promise/SPromise"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const sugar_1 = __importDefault(require("../config/sugar"));
const wait_1 = __importDefault(require("../time/wait"));
const filename_1 = __importDefault(require("../fs/filename"));
const __esbuild = __importStar(require("esbuild"));
const filter_1 = __importDefault(require("../object/filter"));
const SInterface_1 = __importDefault(require("../interface/SInterface"));
const SJsCompiler_1 = __importDefault(require("./compile/SJsCompiler"));
const SJsCompilerParamsInterface_1 = __importDefault(require("./compile/interface/SJsCompilerParamsInterface"));
/**
 * @name          SJsFileSettingsInterface
 * @type            Class
 * @extends         SInterface
 * @status              beta
 *
 * The interface describing the jsFile settings
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SJsFileSettingsInterface extends SInterface_1.default {
}
exports.SJsFileSettingsInterface = SJsFileSettingsInterface;
/**
 * @name          SJsFileCtorSettingsInterface
 * @type            Class
 * @extends         SInterface
 * @status              beta
 *
 * The interface describing the jsFile settings
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SJsFileCtorSettingsInterface extends SInterface_1.default {
}
exports.SJsFileCtorSettingsInterface = SJsFileCtorSettingsInterface;
/**
 * @name            SJsFile
 * @namespace       sugar.node.js
 * @type            Class
 * @extends         SFile
 * @status              beta
 *
 * This represent a javascript file
 *
 * @param       {String}            path            The path to the scss file
 * @param       {ISJsFileSettings}     [settings={}]       Some settings to configure your file
 *
 * @example         js
 * import SJsFile from '@coffeekraken/sugar/node/js/SJsFile';
 * const file = new SJsFile('/my/cool/file.js');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
// @ts-ignore
class SJsFile extends SFile_1.default {
    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(path, settings = {}) {
        super(path, deepMerge_1.default({
            id: filename_1.default(path),
            jsFile: {
                plugins: []
            }
        }, settings));
        /**
         * @name              compile
         * @type              Function
         *
         * Simply compile the file using the settings that you can pass as argument
         *
         * @param         {ISJsFileCompileSettings}         [settings={}]           Some settings to configure your compilation process
         *
         * @setting       {Boolean}           [minify=false]          Specify if you want to minify the output
         * @setting       {Boolean}           [stripComments=false]       Specify if you want to remove all the comments from the output
         * @setting       {Boolean}              [cache=true]             Specify if you want to make use of the cache or not
         * @setting       {Boolean}           [clearCache=false]          Specify if you want to clear the cache before compilation
         * @setting       {String}            [sharedResources=null]      Specify some scss code that you want to be present in every compiled files
         * @setting       {Object}            [sass={}]               Specify some settings that will be passed to the ```sass``` compiler
         *
         * @since         2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._isCompiling = false;
        this._currentCompilationSettings = {};
        this._currentCompilationParams = {};
        this.jsFileSettings.plugins.unshift(this.constructor._resolverPlugin);
        // this.jsFileSettings.plugins.unshift(__esbuildScssLoaderPlugin);
    }
    /**
     * @name      jsFileSettings
     * @type      ISJsFileSettings
     * @get
     *
     * Access the jsFile settings
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get jsFileSettings() {
        return this._settings.jsFile;
    }
    /**
     * @name        _startWatch
     * @type        Function
     * @private
     *
     * Start to watch the file. Does this only once
     * to avoid multiple compilation and logs
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _startWatch() {
        // listen for change event
        this.on('update', (file, metas) => {
            if (this._currentCompilationParams.watch) {
                const promise = this.compile(this._currentCompilationParams);
                this.emit('log', {
                    clear: true,
                    type: 'file',
                    action: 'update',
                    file
                });
            }
        });
    }
    compile(params, settings) {
        // init the promise
        return new SPromise_1.default(({ resolve, reject, emit, pipeTo, on }) => __awaiter(this, void 0, void 0, function* () {
            settings = deepMerge_1.default(this.jsFileSettings, settings);
            this._currentCompilationParams = Object.assign({}, params);
            this._currentCompilationSettings = Object.assign({}, settings);
            params = this.applyInterface('compilerParams', params);
            if (params.watch) {
                this.startWatch();
            }
            // listen for the end
            on('finally', () => {
                this._isCompiling = false;
            });
            pipeTo(this);
            if (this._isCompiling) {
                emit('warn', {
                    value: `This file is compiling at this time. Please wait the end of the compilation before running another one...`
                });
                return;
            }
            this._isCompiling = true;
            emit('log', {
                clear: true,
                type: 'time'
            });
            // notify start
            emit('log', {
                value: `<yellow>[start]</yellow> Starting "<cyan>${this.relPath}</cyan>" compilation`
            });
            const duration = new SDuration_1.default();
            yield wait_1.default(0);
            emit('log', {
                value: `<yellow>[compiling]</yellow> file "<cyan>${this.relPath}</cyan>"`
            });
            // prod
            if (params.prod || params.bundle) {
                params.minify = true;
                params.stripComments = true;
                params.map = false;
            }
            let esbuildParams = Object.assign(Object.assign(Object.assign({ charset: 'utf8', logLevel: 'silent' }, filter_1.default(params, (key, value) => {
                if (Array.isArray(value) && !value.length)
                    return false;
                return SJsCompiler_1.default._esbuildAcceptedSettings.indexOf(key) !== -1;
            })), { entryPoints: [this.path], bundle: params.bundle, write: false, minify: params.minify, sourcemap: params.map }), params.esbuild);
            const buildPromise = new Promise((buildResolve, buildReject) => __awaiter(this, void 0, void 0, function* () {
                const buildService = yield __esbuild.startService();
                buildService
                    .build(esbuildParams)
                    .then((resultObj) => {
                    buildResolve(resultObj);
                })
                    .catch((e) => buildReject(e));
            }));
            const resultObj = yield buildPromise;
            const resultJs = [
                params.banner || '',
                'let process = {};' + resultObj.outputFiles[0].text
            ].join('\n');
            // check if need to save
            if (params.save) {
                // build the save path
                let savePath;
                if (params.outputDir === undefined) {
                    savePath = this.path.replace(/\.js$/, '.builded.js');
                }
                else {
                    savePath = path_1.default.resolve(params.outputDir, this.path.replace(`${params.rootDir}/`, ''));
                }
                emit('log', {
                    type: 'file',
                    file: this,
                    to: savePath.replace(`${sugar_1.default('storage.rootDir')}/`, ''),
                    action: 'save'
                });
                this.writeSync(resultJs, {
                    path: savePath
                });
                if (params.map) {
                    // this.writeSync(result.js.map.toString(), {
                    //   path: savePath.replace(/\.js$/, '.js.map')
                    // });
                    // emit('log', {
                    //   type: 'file',
                    //   action: 'saved',
                    //   to: savePath
                    //     .replace(/\.js$/, '.js.map')
                    //     .replace(`${__sugarConfig('storage.rootDir')}/`, ''),
                    //   file: this
                    // });
                }
                emit('log', {
                    type: 'file',
                    action: 'saved',
                    to: savePath.replace(`${sugar_1.default('storage.rootDir')}/`, ''),
                    file: this
                });
            }
            emit('log', {
                type: 'separator'
            });
            if (params.watch) {
                emit('log', {
                    value: `<blue>[watch] </blue>Watching for changes...`
                });
            }
            return resolve(Object.assign({ js: resultJs, map: undefined, esbuild: resultObj }, duration.end()));
        }));
    }
}
SJsFile.interfaces = {
    compilerParams: {
        apply: false,
        class: SJsCompilerParamsInterface_1.default
    },
    settings: {
        apply: true,
        on: '_settings',
        class: SJsFileCtorSettingsInterface
    }
};
exports.default = SJsFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0pzRmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNKc0ZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdEQUFrQztBQUVsQyxrRUFBNEM7QUFDNUMsZ0RBQTBCO0FBQzFCLG1FQUE2QztBQUM3QyxvRUFBOEM7QUFDOUMsNERBQTRDO0FBRzVDLHdEQUFrQztBQUNsQyw4REFBMkM7QUFDM0MsbURBQXFDO0FBRXJDLDhEQUF3QztBQUl4Qyx5RUFBbUQ7QUFDbkQsd0VBRytCO0FBQy9CLGdIQUEwRjtBQUUxRjs7Ozs7Ozs7OztHQVVHO0FBQ0gsTUFBYSx3QkFBeUIsU0FBUSxvQkFBWTtDQUV6RDtBQUZELDREQUVDO0FBRUQ7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQWEsNEJBQTZCLFNBQVEsb0JBQVk7Q0FRN0Q7QUFSRCxvRUFRQztBQXFCRDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsYUFBYTtBQUNiLE1BQU0sT0FBUSxTQUFRLGVBQU87SUEyQjNCOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksSUFBWSxFQUFFLFdBQWlDLEVBQUU7UUFDM0QsS0FBSyxDQUNILElBQUksRUFDSixtQkFBVyxDQUNUO1lBQ0UsRUFBRSxFQUFFLGtCQUFhLENBQUMsSUFBSSxDQUFDO1lBQ3ZCLE1BQU0sRUFBRTtnQkFDTixPQUFPLEVBQUUsRUFBRTthQUNaO1NBQ0YsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO1FBb0NKOzs7Ozs7Ozs7Ozs7Ozs7OztXQWlCRztRQUNILGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLGdDQUEyQixHQUE2QixFQUFFLENBQUM7UUFDM0QsOEJBQXlCLEdBQStCLEVBQUUsQ0FBQztRQXREekQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUMzQixJQUFJLENBQUMsV0FBWSxDQUFDLGVBQWUsQ0FDeEMsQ0FBQztRQUNGLGtFQUFrRTtJQUNw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